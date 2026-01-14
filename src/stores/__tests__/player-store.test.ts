import { describe, it, expect, beforeEach } from 'vitest';
import { usePlayerStore } from '../player-store';

describe('Player Store', () => {
  beforeEach(() => {
    // Reset store state
    usePlayerStore.setState({
      currentTrack: null,
      queue: [],
      isPlaying: false,
      volume: 0.8,
      currentTime: 0,
      duration: 0,
    });
  });

  const mockTrack = {
    id: '1',
    title: 'Test Track',
    artist: 'Test Artist',
    previewUrl: '/test.mp3',
    coverImage: '/test.jpg',
    type: 'music',
  };

  describe('play', () => {
    it('should set current track and start playing', () => {
      const { play } = usePlayerStore.getState();

      play(mockTrack);

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toEqual(mockTrack);
      expect(state.isPlaying).toBe(true);
      expect(state.currentTime).toBe(0);
    });
  });

  describe('pause and resume', () => {
    it('should pause playback', () => {
      const { play, pause } = usePlayerStore.getState();

      play(mockTrack);
      pause();

      expect(usePlayerStore.getState().isPlaying).toBe(false);
    });

    it('should resume playback', () => {
      const { play, pause, resume } = usePlayerStore.getState();

      play(mockTrack);
      pause();
      resume();

      expect(usePlayerStore.getState().isPlaying).toBe(true);
    });
  });

  describe('stop', () => {
    it('should stop and clear current track', () => {
      const { play, stop } = usePlayerStore.getState();

      play(mockTrack);
      stop();

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toBeNull();
      expect(state.isPlaying).toBe(false);
      expect(state.currentTime).toBe(0);
      expect(state.duration).toBe(0);
    });
  });

  describe('volume', () => {
    it('should set volume within bounds', () => {
      const { setVolume } = usePlayerStore.getState();

      setVolume(0.5);
      expect(usePlayerStore.getState().volume).toBe(0.5);

      setVolume(1.5);
      expect(usePlayerStore.getState().volume).toBe(1);

      setVolume(-0.5);
      expect(usePlayerStore.getState().volume).toBe(0);
    });
  });

  describe('queue', () => {
    it('should add track to queue', () => {
      const { addToQueue } = usePlayerStore.getState();

      addToQueue(mockTrack);

      expect(usePlayerStore.getState().queue).toHaveLength(1);
      expect(usePlayerStore.getState().queue[0]).toEqual(mockTrack);
    });

    it('should remove track from queue', () => {
      const { addToQueue, removeFromQueue } = usePlayerStore.getState();

      addToQueue(mockTrack);
      removeFromQueue(mockTrack.id);

      expect(usePlayerStore.getState().queue).toHaveLength(0);
    });

    it('should clear queue', () => {
      const { addToQueue, clearQueue } = usePlayerStore.getState();

      addToQueue(mockTrack);
      addToQueue({ ...mockTrack, id: '2' });
      clearQueue();

      expect(usePlayerStore.getState().queue).toHaveLength(0);
    });
  });

  describe('playCollection', () => {
    it('should play first track and set queue', () => {
      const { playCollection } = usePlayerStore.getState();
      const tracks = [mockTrack, { ...mockTrack, id: '2', title: 'Track 2' }];

      playCollection(tracks);

      const state = usePlayerStore.getState();
      expect(state.queue).toEqual(tracks);
      expect(state.currentTrack).toEqual(tracks[0]);
      expect(state.isPlaying).toBe(true);
    });

    it('should not play if collection is empty', () => {
      const { playCollection } = usePlayerStore.getState();

      playCollection([]);

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toBeNull();
      expect(state.isPlaying).toBe(false);
    });
  });

  describe('next and previous', () => {
    it('should play next track in queue', () => {
      const { playCollection, next } = usePlayerStore.getState();
      const tracks = [mockTrack, { ...mockTrack, id: '2', title: 'Track 2' }];

      playCollection(tracks);
      next();

      expect(usePlayerStore.getState().currentTrack?.id).toBe('2');
    });

    it('should stop at end of queue', () => {
      const { playCollection, next } = usePlayerStore.getState();

      playCollection([mockTrack]);
      next();

      expect(usePlayerStore.getState().isPlaying).toBe(false);
    });

    it('should play previous track', () => {
      const { playCollection, next, previous } = usePlayerStore.getState();
      const tracks = [mockTrack, { ...mockTrack, id: '2', title: 'Track 2' }];

      playCollection(tracks);
      next();
      previous();

      expect(usePlayerStore.getState().currentTrack?.id).toBe('1');
    });
  });
});
