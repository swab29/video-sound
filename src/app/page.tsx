'use client';

import { useEffect, useState } from 'react';
import { useVideoStore } from '@/lib/store/video-store';
import { useAudioStore } from '@/lib/store/audio-store';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  
  const {
    initPlayer,
    loadVideo,
    isPlaying,
    play,
    pause,
    setVolume
  } = useVideoStore();
  
  const {
    initAudio,
    loadAudioFile,
    setFilterFreq,
    setReverbDecay,
    setDelayTime,
    setDelayFeedback,
    filterFreq,
    reverbDecay,
    delayTime,
    delayFeedback
  } = useAudioStore();
  
  useEffect(() => {
    initPlayer('youtube-player');
    initAudio();
  }, [initPlayer, initAudio]);
  
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractYouTubeId(videoUrl);
    if (videoId) {
      loadVideo(videoId);
    }
  };
  
  const handleAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadAudioFile(audioUrl);
  };
  
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Video Sound Effects
        </h1>
        
        {/* Video Section */}
        <section className="space-y-4">
          <form onSubmit={handleVideoSubmit} className="flex gap-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Load Video
            </button>
          </form>
          
          <div className="aspect-video bg-gray-900">
            <div id="youtube-player" />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={isPlaying ? pause : play}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </section>
        
        {/* Audio Effects Section */}
        <section className="space-y-4">
          <form onSubmit={handleAudioSubmit} className="flex gap-4">
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="Enter Audio URL"
              className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Load Audio
            </button>
          </form>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block">
                Filter Frequency
                <input
                  type="range"
                  min="20"
                  max="20000"
                  value={filterFreq}
                  onChange={(e) => setFilterFreq(Number(e.target.value))}
                  className="w-full"
                />
              </label>
              
              <label className="block">
                Reverb Decay
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={reverbDecay}
                  onChange={(e) => setReverbDecay(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            </div>
            
            <div className="space-y-2">
              <label className="block">
                Delay Time
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={delayTime}
                  onChange={(e) => setDelayTime(Number(e.target.value))}
                  className="w-full"
                />
              </label>
              
              <label className="block">
                Delay Feedback
                <input
                  type="range"
                  min="0"
                  max="0.9"
                  step="0.01"
                  value={delayFeedback}
                  onChange={(e) => setDelayFeedback(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
