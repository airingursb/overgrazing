// Audio module — procedural BGM + click SFX using Web Audio API

let audioCtx = null;
let bgmGain = null;
let bgmNodes = [];
let bgmPlaying = false;
let muted = localStorage.getItem('audio-muted') === 'true';

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

// === BGM: ambient ocean pad ===

function createPad(ctx, freq, detune, gainVal) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.detune.value = detune;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 400;
  filter.Q.value = 1;

  const gain = ctx.createGain();
  gain.gain.value = gainVal;

  osc.connect(filter);
  filter.connect(gain);

  return { osc, filter, gain };
}

function startBGM() {
  if (bgmPlaying) return;
  const ctx = getCtx();

  bgmGain = ctx.createGain();
  bgmGain.gain.value = muted ? 0 : 0.12;
  bgmGain.connect(ctx.destination);

  // Layered ambient pads — warm, ocean-like drone
  const pads = [
    createPad(ctx, 65, 0, 0.3),      // C2 base
    createPad(ctx, 98, 5, 0.25),     // G2
    createPad(ctx, 130, -3, 0.2),    // C3
    createPad(ctx, 196, 7, 0.12),    // G3 shimmer
    createPad(ctx, 261, -5, 0.06),   // C4 high shimmer
  ];

  pads.forEach(p => {
    p.gain.connect(bgmGain);
    p.osc.start();
    bgmNodes.push(p);
  });

  // Slow LFO modulation for "breathing" effect
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.08; // Very slow breathing
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.03;
  lfo.connect(lfoGain);
  lfoGain.connect(bgmGain.gain);
  lfo.start();
  bgmNodes.push({ osc: lfo, gain: lfoGain });

  // Second LFO for filter sweep
  const lfo2 = ctx.createOscillator();
  lfo2.type = 'sine';
  lfo2.frequency.value = 0.05;
  const lfo2Gain = ctx.createGain();
  lfo2Gain.gain.value = 150;
  lfo2.connect(lfo2Gain);
  pads.forEach(p => lfo2Gain.connect(p.filter.frequency));
  lfo2.start();
  bgmNodes.push({ osc: lfo2, gain: lfo2Gain });

  // Noise layer for ocean texture
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  // Brown noise (smoother, ocean-like)
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 300;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.15;

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(bgmGain);
  noiseSource.start();
  bgmNodes.push({ osc: noiseSource, gain: noiseGain });

  bgmPlaying = true;
}

function stopBGM() {
  bgmNodes.forEach(n => {
    try { n.osc.stop(); } catch (e) { /* ignore */ }
  });
  bgmNodes = [];
  bgmPlaying = false;
}

// === Click SFX ===

function playClick() {
  if (muted) return;
  const ctx = getCtx();

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 660;

  const gain = ctx.createGain();
  gain.gain.value = 0.08;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

// === Public API ===

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  localStorage.setItem('audio-muted', muted);

  if (bgmGain) {
    const ctx = getCtx();
    bgmGain.gain.cancelScheduledValues(ctx.currentTime);
    bgmGain.gain.setValueAtTime(bgmGain.gain.value, ctx.currentTime);
    bgmGain.gain.linearRampToValueAtTime(muted ? 0 : 0.12, ctx.currentTime + 0.3);
  }

  return muted;
}

export function initAudio() {
  // Start BGM on first user interaction (required by browsers)
  const start = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    startBGM();
    document.removeEventListener('click', start);
    document.removeEventListener('touchstart', start);
  };
  document.addEventListener('click', start);
  document.addEventListener('touchstart', start);
}

export function clickSound() {
  playClick();
}
