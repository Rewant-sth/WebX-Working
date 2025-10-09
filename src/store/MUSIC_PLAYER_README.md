# Music Player Zustand Store

This implementation provides a centralized music player state management using Zustand, allowing you to control music playback from anywhere in your application.

## Features

- ✅ Global music state management
- ✅ Play, pause, toggle functionality
- ✅ Volume control
- ✅ Track seeking
- ✅ Auto-play next track
- ✅ Loading states
- ✅ Can be controlled from any component
- ✅ Utility functions for non-React contexts

## Files Created/Modified

### Store
- `src/store/music-player-store.ts` - Main Zustand store for music player state

### Hooks
- `src/hooks/useMusicPlayer.ts` - Custom hook for easy music player access

### Components
- `src/components/MusicControls.tsx` - Example music control component
- `src/components/MusicControlExample.tsx` - Usage examples
- `src/components/LayoutWrapper.tsx` - Updated to use Zustand store

## Usage

### Method 1: Using the Custom Hook (Reactive)

```tsx
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

function MyComponent() {
  const { isPlaying, play, pause, toggle, currentTrack, volume } = useMusicPlayer();

  return (
    <div>
      <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
      <button onClick={toggle}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => play('/Audio/audio1.mp3')}>
        Play Audio 1
      </button>
      <button onClick={pause}>
        Pause
      </button>
    </div>
  );
}
```

### Method 2: Using Utility Functions (Non-reactive)

```tsx
import { pauseMusic, playMusic, toggleMusic, getMusicPlayerState } from '@/store/music-player-store';

function MyComponent() {
  const handlePause = () => {
    pauseMusic(); // Pause music from anywhere
  };

  const handlePlay = () => {
    playMusic('/Audio/cumb2.mp3'); // Play specific track
  };

  const handleToggle = () => {
    toggleMusic(); // Toggle play/pause
  };

  const handleGetState = () => {
    const state = getMusicPlayerState();
  };

  return (
    <div>
      <button onClick={handlePause}>Pause Music</button>
      <button onClick={handlePlay}>Play Music</button>
      <button onClick={handleToggle}>Toggle Music</button>
    </div>
  );
}
```

### Method 3: Direct Store Access

```tsx
import { useMusicPlayerStore } from '@/store/music-player-store';

function MyComponent() {
  const { isPlaying, pause, play } = useMusicPlayerStore();

  return (
    <div>
      <p>Playing: {isPlaying}</p>
      <button onClick={() => pause()}>Pause</button>
      <button onClick={() => play()}>Play</button>
    </div>
  );
}
```

## Available Functions

### Store Functions
- `play(trackUrl?: string)` - Play music (optionally specify track)
- `pause()` - Pause music
- `toggle()` - Toggle play/pause
- `setVolume(volume: number)` - Set volume (0-1)
- `seek(time: number)` - Seek to specific time

### Utility Functions
- `playMusic(trackUrl?: string)` - Global play function
- `pauseMusic()` - Global pause function
- `toggleMusic()` - Global toggle function
- `setMusicVolume(volume: number)` - Global volume control
- `getMusicPlayerState()` - Get current state without hooks

### State Properties
- `isPlaying: boolean` - Whether music is playing
- `currentTrack: string | null` - Current track URL
- `volume: number` - Current volume (0-1)
- `duration: number` - Track duration in seconds
- `currentTime: number` - Current playback time in seconds
- `loading: boolean` - Whether audio is loading

## Integration with Existing Code

The implementation replaces the previous AudioContext with a Zustand store while maintaining the same functionality. The LayoutWrapper component has been updated to use the new store, and the audio confirmation flow remains the same.

## Example Components

Check out these example components:
- `MusicControls.tsx` - Full-featured music control widget
- `MusicControlExample.tsx` - Simple usage examples

## Benefits

1. **Global State**: Music state is accessible from any component
2. **Performance**: Zustand provides optimal re-renders
3. **Flexibility**: Multiple ways to interact with the music player
4. **Type Safety**: Full TypeScript support
5. **Easy Integration**: Drop-in replacement for existing audio context
6. **Non-React Support**: Utility functions work outside React components