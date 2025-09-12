import { useMusicPlayerStore } from '@/store/music-player-store';

/**
 * Custom hook for easy access to music player functionality
 * This can be used in any component to control music playback
 */
export const useMusicPlayer = () => {
    const {
        isPlaying,
        currentTrack,
        volume,
        duration,
        currentTime,
        loading,
        play,
        pause,
        toggle,
        setVolume,
        seek,
    } = useMusicPlayerStore();

    return {
        // State
        isPlaying,
        currentTrack,
        volume,
        duration,
        currentTime,
        loading,

        // Actions
        play,
        pause,
        toggle,
        setVolume,
        seek,

        // Computed values
        progress: duration > 0 ? (currentTime / duration) * 100 : 0,
        formattedCurrentTime: formatTime(currentTime),
        formattedDuration: formatTime(duration),
    };
};

/**
 * Format time in mm:ss format
 */
const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};