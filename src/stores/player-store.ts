import { create } from 'zustand';

interface PlayableAsset {
  id: string;
  title: string;
  artist: string;
  previewUrl: string;
  coverImage: string;
  type: string;
}

interface PlayerState {
  currentTrack: PlayableAsset | null;
  queue: PlayableAsset[];
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

interface PlayerActions {
  play: (track: PlayableAsset) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  addToQueue: (track: PlayableAsset) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  playCollection: (tracks: PlayableAsset[]) => void;
}

type PlayerStore = PlayerState & PlayerActions;

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 0,

  play: (track) => {
    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
    });
  },

  pause: () => {
    set({ isPlaying: false });
  },

  resume: () => {
    set({ isPlaying: true });
  },

  stop: () => {
    set({
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    });
  },

  next: () => {
    const { queue, currentTrack } = get();
    if (queue.length === 0) return;

    const currentIndex = currentTrack
      ? queue.findIndex((t) => t.id === currentTrack.id)
      : -1;
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      set({
        currentTrack: queue[nextIndex],
        isPlaying: true,
        currentTime: 0,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  previous: () => {
    const { queue, currentTrack, currentTime } = get();
    if (!currentTrack) return;

    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }

    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({
        currentTrack: queue[prevIndex],
        isPlaying: true,
        currentTime: 0,
      });
    } else {
      set({ currentTime: 0 });
    }
  },

  setVolume: (volume) => {
    set({ volume: Math.max(0, Math.min(1, volume)) });
  },

  setCurrentTime: (time) => {
    set({ currentTime: time });
  },

  setDuration: (duration) => {
    set({ duration });
  },

  addToQueue: (track) => {
    set((state) => ({
      queue: [...state.queue, track],
    }));
  },

  removeFromQueue: (trackId) => {
    set((state) => ({
      queue: state.queue.filter((t) => t.id !== trackId),
    }));
  },

  clearQueue: () => {
    set({ queue: [] });
  },

  playCollection: (tracks) => {
    if (tracks.length === 0) return;
    set({
      queue: tracks,
      currentTrack: tracks[0],
      isPlaying: true,
      currentTime: 0,
    });
  },
}));
