import { create } from 'zustand';
import YouTubePlayer from 'youtube-player';

interface VideoState {
  player: ReturnType<typeof YouTubePlayer> | null;
  videoId: string | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isReady: boolean;
  
  // Actions
  initPlayer: (elementId: string) => void;
  loadVideo: (videoId: string) => Promise<void>;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  player: null,
  videoId: null,
  isPlaying: false,
  volume: 100,
  currentTime: 0,
  duration: 0,
  isReady: false,

  initPlayer: (elementId) => {
    const player = YouTubePlayer(elementId);
    
    player.on('ready', () => {
      set({ isReady: true });
      player.setVolume(get().volume);
    });

    player.on('stateChange', (event) => {
      set({ isPlaying: event.data === 1 });
    });

    set({ player });
  },

  loadVideo: async (videoId) => {
    const { player } = get();
    if (!player) return;

    await player.loadVideoById(videoId);
    set({ videoId });
  },

  play: () => {
    const { player } = get();
    if (!player) return;
    player.playVideo();
  },

  pause: () => {
    const { player } = get();
    if (!player) return;
    player.pauseVideo();
  },

  setVolume: (volume) => {
    const { player } = get();
    if (!player) return;
    player.setVolume(volume);
    set({ volume });
  },

  seek: (time) => {
    const { player } = get();
    if (!player) return;
    player.seekTo(time, true);
  }
})); 