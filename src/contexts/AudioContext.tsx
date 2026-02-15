/* eslint-disable react-refresh/only-export-components */
"use client";
import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface AudioContextType {
    isPlaying: boolean;
    currentTrack: string | null;
    volume: number;
    duration: number;
    currentTime: number;
    play: (trackUrl?: string) => Promise<void>;
    pause: () => void;
    toggle: () => Promise<void>;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    loading: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
    children: ReactNode;
}

const DEFAULT_TRACKS = [
    '/Audio/audio4.mp3',
    '/Audio/cumb4.mp3'
];

export function AudioProvider({ children }: AudioProviderProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<string | null>(DEFAULT_TRACKS[0]);
    const [volume, setVolumeState] = useState(0.7);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [loading, setLoading] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentTrackIndex = useRef(0);

    useEffect(() => {
        // Initialize audio element
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio();
            audioRef.current.volume = volume;
            audioRef.current.preload = 'metadata';

            const audio = audioRef.current;

            // Event listeners
            const handleLoadStart = () => setLoading(true);
            const handleCanPlay = () => setLoading(false);
            const handleLoadedMetadata = () => {
                setDuration(audio.duration || 0);
                setLoading(false);
            };
            const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
            const handleEnded = () => {
                setIsPlaying(false);
                // Auto-play next track
                playNextTrack();
            };
            const handleError = () => {
                setLoading(false);
                console.error('Audio loading error');
            };

            audio.addEventListener('loadstart', handleLoadStart);
            audio.addEventListener('canplay', handleCanPlay);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('error', handleError);

            // Load initial track
            if (currentTrack) {
                audio.src = currentTrack;
            }

            return () => {
                audio.removeEventListener('loadstart', handleLoadStart);
                audio.removeEventListener('canplay', handleCanPlay);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('error', handleError);
                audio.pause();
            };
        }
    }, [currentTrack, volume]);

    const playNextTrack = () => {
        currentTrackIndex.current = (currentTrackIndex.current + 1) % DEFAULT_TRACKS.length;
        const nextTrack = DEFAULT_TRACKS[currentTrackIndex.current];
        setCurrentTrack(nextTrack);
        if (audioRef.current) {
            audioRef.current.src = nextTrack;
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
    };

    const play = async (trackUrl?: string) => {
        if (!audioRef.current) return;

        try {
            setLoading(true);

            if (trackUrl && trackUrl !== currentTrack) {
                setCurrentTrack(trackUrl);
                audioRef.current.src = trackUrl;
                // Find the index of the new track
                const trackIndex = DEFAULT_TRACKS.findIndex(track => track === trackUrl);
                if (trackIndex !== -1) {
                    currentTrackIndex.current = trackIndex;
                }
            }

            await audioRef.current.play();
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
        } finally {
            setLoading(false);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggle = async () => {
        if (isPlaying) {
            pause();
        } else {
            await play();
        }
    };

    const setVolume = (newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        if (audioRef.current) {
            audioRef.current.volume = clampedVolume;
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const value: AudioContextType = {
        isPlaying,
        currentTrack,
        volume,
        duration,
        currentTime,
        play,
        pause,
        toggle,
        setVolume,
        seek,
        loading
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}