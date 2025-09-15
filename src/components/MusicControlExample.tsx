import React from 'react';
import { pauseMusic, playMusic, toggleMusic, getMusicPlayerState } from '@/store/music-player-store';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

/**
 * Example component showing how to control music from any component
 * This can be used as a reference for implementing music controls in other parts of the app
 */
export const MusicControlExample: React.FC = () => {
    const { isPlaying } = useMusicPlayer();

    // Method 1: Using the utility functions (no hooks needed)
    const handlePlayPause = () => {
        toggleMusic();
    };

    const handlePause = () => {
        pauseMusic();
    };

    const handlePlay = () => {
        playMusic('/Audio/cumb4.mp3');
    };

    // Method 2: Getting state without hooks (useful for non-React contexts)
    const handleGetCurrentState = () => {
        const state = getMusicPlayerState();
        console.log('Current music state:', {
            isPlaying: state.isPlaying,
            currentTrack: state.currentTrack,
            volume: state.volume,
        });
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Music Control Example</h3>

            <div className="space-y-2">
                <p className="text-sm text-gray-600">
                    Status: {isPlaying ? 'Playing' : 'Paused'}
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={handlePlayPause}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>

                    <button
                        onClick={handlePause}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Force Pause
                    </button>

                    <button
                        onClick={handlePlay}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Play Audio 1
                    </button>

                    <button
                        onClick={handleGetCurrentState}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Log State
                    </button>
                </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="font-medium text-yellow-800">Usage Examples:</h4>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• Use <code>pauseMusic()</code> to pause from anywhere</li>
                    <li>• Use <code>playMusic(trackUrl)</code> to play a specific track</li>
                    <li>• Use <code>toggleMusic()</code> to toggle play/pause</li>
                    <li>• Use <code>useMusicPlayer()</code> hook for reactive state</li>
                    <li>• Use <code>getMusicPlayerState()</code> for one-time state access</li>
                </ul>
            </div>
        </div>
    );
};

export default MusicControlExample;