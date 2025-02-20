import { create } from 'zustand';
import * as Tone from 'tone';

interface AudioState {
  // Audio Context State
  isInitialized: boolean;
  player: Tone.Player | null;
  filter: Tone.Filter | null;
  reverb: Tone.Reverb | null;
  delay: Tone.FeedbackDelay | null;
  
  // Effect Parameters
  filterFreq: number;
  reverbDecay: number;
  delayTime: number;
  delayFeedback: number;
  
  // Actions
  initAudio: () => Promise<void>;
  setFilterFreq: (freq: number) => void;
  setReverbDecay: (decay: number) => void;
  setDelayTime: (time: number) => void;
  setDelayFeedback: (feedback: number) => void;
  loadAudioFile: (url: string) => Promise<void>;
  play: () => void;
  stop: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isInitialized: false,
  player: null,
  filter: null,
  reverb: null,
  delay: null,
  
  filterFreq: 1000,
  reverbDecay: 1.5,
  delayTime: 0.25,
  delayFeedback: 0.5,
  
  initAudio: async () => {
    await Tone.start();
    
    const player = new Tone.Player().toDestination();
    const filter = new Tone.Filter(get().filterFreq, "lowpass").toDestination();
    const reverb = new Tone.Reverb({
      decay: get().reverbDecay,
      wet: 0.5
    }).toDestination();
    const delay = new Tone.FeedbackDelay({
      delayTime: get().delayTime,
      feedback: get().delayFeedback
    }).toDestination();
    
    // Connect the audio chain
    player.connect(filter);
    filter.connect(reverb);
    reverb.connect(delay);
    
    set({
      isInitialized: true,
      player,
      filter,
      reverb,
      delay
    });
  },
  
  setFilterFreq: (freq) => {
    const { filter } = get();
    if (filter) {
      filter.frequency.value = freq;
      set({ filterFreq: freq });
    }
  },
  
  setReverbDecay: (decay) => {
    const { reverb } = get();
    if (reverb) {
      reverb.decay = decay;
      set({ reverbDecay: decay });
    }
  },
  
  setDelayTime: (time) => {
    const { delay } = get();
    if (delay) {
      delay.delayTime.value = time;
      set({ delayTime: time });
    }
  },
  
  setDelayFeedback: (feedback) => {
    const { delay } = get();
    if (delay) {
      delay.feedback.value = feedback;
      set({ delayFeedback: feedback });
    }
  },
  
  loadAudioFile: async (url) => {
    const { player } = get();
    if (player) {
      await player.load(url);
    }
  },
  
  play: () => {
    const { player } = get();
    if (player) {
      player.start();
    }
  },
  
  stop: () => {
    const { player } = get();
    if (player) {
      player.stop();
    }
  }
})); 