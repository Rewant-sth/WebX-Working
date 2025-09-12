import React from 'react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { Play, Pause, Volume2 } from 'lucide-react';

/**
 * Music Control Component - can be used anywhere in the app
 * This demonstrates how to control music from any component
 */
export const MusicControls: React.FC = () => {
    const {
        isPlaying,
        currentTrack,
        volume,
        loading,
        play,
        pause,
        toggle,
        setVolume,
        progress,
        formattedCurrentTime,
        formattedDuration,
    } = useMusicPlayer();

    return (
        <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            {/* Play/Pause Button */}
            <button
                onClick={toggle}
                disabled={loading}
                className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                    <Pause size={20} />
                ) : (
                    <Play size={20} />
                )}
            </button>

            {/* Current Track Info */}
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                    {currentTrack ? currentTrack.split('/').pop() : 'No track'}
                </div>
                <div className="text-xs text-gray-500">
                    {formattedCurrentTime} / {formattedDuration}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-300 rounded-full mt-1">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
                <Volume2 size={16} className="text-gray-600" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    );
};

export default MusicControls;