import { create } from 'zustand';

interface MusicPlayerState {
    // Audio state
    isPlaying: boolean;
    currentTrack: string | null;
    volume: number;
    duration: number;
    currentTime: number;
    loading: boolean;

    // Audio element reference (internal)
    audioElement: HTMLAudioElement | null;

    // Actions
    play: (trackUrl?: string) => Promise<void>;
    pause: () => void;
    toggle: () => Promise<void>;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    setLoading: (loading: boolean) => void;

    // Internal methods
    initializeAudioElement: () => void;
    cleanupAudioElement: () => void;
}

const DEFAULT_TRACKS = ['/Audio/cumb3.mp3'];

let currentTrackIndex = 0;

export const useMusicPlayerStore = create<MusicPlayerState>((set, get) => ({
    // Initial state
    isPlaying: false,
    currentTrack: DEFAULT_TRACKS[0],
    volume: 0.7,
    duration: 0,
    currentTime: 0,
    loading: false,
    audioElement: null,

    // Initialize audio element with event listeners
    initializeAudioElement: () => {
        if (typeof window === 'undefined') return;

        const state = get();
        if (state.audioElement) return; // Already initialized

        const audio = new Audio();
        audio.volume = state.volume;
        audio.preload = 'metadata';

        // Event listeners
        const handleLoadStart = () => set({ loading: true });
        const handleCanPlay = () => set({ loading: false });
        const handleLoadedMetadata = () => {
            set({ duration: audio.duration || 0, loading: false });
        };
        const handleTimeUpdate = () => set({ currentTime: audio.currentTime || 0 });
        const handleEnded = () => {
            set({ isPlaying: false });
            // Auto-play next track
            const playNextTrack = () => {
                currentTrackIndex = (currentTrackIndex + 1) % DEFAULT_TRACKS.length;
                const nextTrack = DEFAULT_TRACKS[currentTrackIndex];
                set({ currentTrack: nextTrack });
                audio.src = nextTrack;
                audio.play().catch(console.error);
                set({ isPlaying: true });
            };
            playNextTrack();
        };
        const handleError = () => {
            set({ loading: false });
            console.error('Audio loading error');
        };

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        // Load initial track
        if (state.currentTrack) {
            audio.src = state.currentTrack;
        }

        set({ audioElement: audio });
    },

    // Cleanup audio element
    cleanupAudioElement: () => {
        const { audioElement } = get();
        if (audioElement) {
            audioElement.pause();
            audioElement.removeEventListener('loadstart', () => { });
            audioElement.removeEventListener('canplay', () => { });
            audioElement.removeEventListener('loadedmetadata', () => { });
            audioElement.removeEventListener('timeupdate', () => { });
            audioElement.removeEventListener('ended', () => { });
            audioElement.removeEventListener('error', () => { });
            set({ audioElement: null });
        }
    },

    // Play audio
    play: async (trackUrl?: string) => {
        const { audioElement, currentTrack } = get();
        if (!audioElement) return;

        try {
            set({ loading: true });

            if (trackUrl && trackUrl !== currentTrack) {
                set({ currentTrack: trackUrl });
                audioElement.src = trackUrl;
                // Find the index of the new track
                const trackIndex = DEFAULT_TRACKS.findIndex(track => track === trackUrl);
                if (trackIndex !== -1) {
                    currentTrackIndex = trackIndex;
                }
            }

            await audioElement.play();
            set({ isPlaying: true });
        } catch (error) {
            console.error('Error playing audio:', error);
            set({ isPlaying: false });
        } finally {
            set({ loading: false });
        }
    },

    // Pause audio
    pause: () => {
        const { audioElement } = get();
        if (audioElement) {
            audioElement.pause();
            set({ isPlaying: false });
        }
    },

    // Toggle play/pause
    toggle: async () => {
        const { isPlaying, play, pause } = get();
        if (isPlaying) {
            pause();
        } else {
            await play();
        }
    },

    // Set volume
    setVolume: (newVolume: number) => {
        const { audioElement } = get();
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        set({ volume: clampedVolume });
        if (audioElement) {
            audioElement.volume = clampedVolume;
        }
    },

    // Seek to specific time
    seek: (time: number) => {
        const { audioElement } = get();
        if (audioElement) {
            audioElement.currentTime = time;
            set({ currentTime: time });
        }
    },

    // Setters for internal state management
    setCurrentTime: (time: number) => set({ currentTime: time }),
    setDuration: (duration: number) => set({ duration }),
    setLoading: (loading: boolean) => set({ loading }),
}));

// Utility functions for direct access without hooks
export const getMusicPlayerState = () => useMusicPlayerStore.getState();

export const playMusic = (trackUrl?: string) => {
    const { play } = getMusicPlayerState();
    return play(trackUrl);
};

export const pauseMusic = () => {
    const { pause } = getMusicPlayerState();
    pause();
};

export const toggleMusic = () => {
    const { toggle } = getMusicPlayerState();
    return toggle();
};

export const setMusicVolume = (volume: number) => {
    const { setVolume } = getMusicPlayerState();
    setVolume(volume);
};

// Initialize and cleanup functions to be called from components/app
export const initializeMusicPlayer = () => {
    const { initializeAudioElement } = getMusicPlayerState();
    initializeAudioElement();
};

export const cleanupMusicPlayer = () => {
    const { cleanupAudioElement } = getMusicPlayerState();
    cleanupAudioElement();
};