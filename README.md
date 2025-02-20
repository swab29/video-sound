# Video Sound Generator

A Next.js application that allows you to apply real-time audio effects to YouTube videos and generate synthesized music based on video content analysis.

## Project Overview

The Video Sound Generator creates unique soundtracks for videos by analyzing their visual content and applying real-time audio effects. It converts pixel data into synthesized music, allowing users to experience videos in a new auditory dimension.

## Current Features

- YouTube video playback with custom controls
- Real-time audio effects:
  - Low-pass filter with adjustable frequency (20Hz - 20kHz)
  - Reverb with adjustable decay time (0.1s - 10s)
  - Delay with adjustable time (0s - 1s) and feedback (0 - 0.9)
- Modern UI with responsive design
- Built with TypeScript and TailwindCSS

## Planned Features

### 1. Video Integration (3 points) ✅
- [x] YouTube video embedding
- [x] Video playback controls (play/pause/mute)
- [ ] Time segment selection (5-10s) for parameter testing

### 2. Pixel Analysis Engine (5 points)
- [ ] Frame-by-frame light intensity analysis
- [ ] Region-based analysis (dividing frame into sections)
- [ ] Gradual transition detection
- [ ] Scene change detection

### 3. Sound Generation (8 points)
- [x] Synthesizer integration
- [ ] Basic musical constraints (chord progression framework)
- [x] Parameter-based sound mapping
- [ ] Real-time vs. Pre-processed mode

### 4. Parameter Controls (5 points)
- [x] Interactive parameter adjustment panel
- [ ] Parameter preset saving
- [ ] Parameter sharing system
- [ ] Live preview on sample segment

### 5. Social Features (3 points)
- [ ] Parameter preset sharing
- [ ] Voting/ranking system
- [ ] Popular combinations showcase
- [ ] Video-preset combination browsing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a YouTube URL in the video input field and click "Load Video"
2. Use the play/pause button and volume slider to control video playback
3. Adjust the audio effect parameters using the sliders:
   - Filter Frequency: Controls the cutoff frequency of the low-pass filter
   - Reverb Decay: Controls the length of the reverb tail
   - Delay Time: Controls the time between delay repeats
   - Delay Feedback: Controls how much of the delayed signal is fed back

## Technical Details

### Technologies Used
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Tone.js](https://tonejs.github.io/) - Web Audio framework
- [youtube-player](https://www.npmjs.com/package/youtube-player) - YouTube Player API wrapper
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

### Project Structure
- `/src/lib/store` - Zustand stores for video and audio state management
- `/src/app` - Next.js app router pages and components

### Sound Generation Parameters (Planned)

#### 1. Intensity to Pitch Mapping Options
- Simple Scale Mapping: Maps brightness to notes in a scale
- Chord-Based Mapping: Maps intensity ranges to chord notes
- Emotional Mapping: Dark areas trigger minor keys, bright areas trigger major keys

#### 2. Rhythm Density Options
- Basic Beat Matching: One note per significant brightness change
- Intensity-Driven Rhythm: Brightness changes control rhythm speed
- Pattern-Based Rhythm: Creates rhythmic patterns from visual patterns

#### 3. Instrument Selection Presets
- Solo Synthesis: Single synthesizer voice
- Ambient Ensemble: Main synth + pad + bass
- Full Band: Lead synth + bass + drums + accompaniment

## Contributing

We welcome contributions! Please check our issues page for current tasks or suggest new features.

## License

MIT
