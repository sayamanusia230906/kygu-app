/**
 * KyGU (Know Your GU) - Audio Engine
 * Pure Web Audio API Synthesizer for high-fidelity SFX & Procedural Ambient Music
 * Works 100% offline without external audio files!
 */

class KyGUAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.isSfxEnabled = true;
    this.isMusicEnabled = false;
    this.currentTrack = 'water'; // 'water', 'lofi', 'piano', 'none'
    this.volume = 0.6; // 0.0 to 1.0
    this.musicInterval = null;
    this.activeNodes = [];
    this.isUnlocked = false;

    // Load persisted settings
    this.loadSettings();
  }

  loadSettings() {
    try {
      const s = localStorage.getItem('kygu_audio_settings');
      if (s) {
        const parsed = JSON.parse(s);
        if (typeof parsed.isSfxEnabled === 'boolean') this.isSfxEnabled = parsed.isSfxEnabled;
        if (typeof parsed.isMusicEnabled === 'boolean') this.isMusicEnabled = parsed.isMusicEnabled;
        if (parsed.currentTrack) this.currentTrack = parsed.currentTrack;
        if (typeof parsed.volume === 'number') this.volume = parsed.volume;
      }
    } catch (e) {
      console.warn('Audio settings load fallback:', e);
    }
  }

  saveSettings() {
    try {
      const s = {
        isSfxEnabled: this.isSfxEnabled,
        isMusicEnabled: this.isMusicEnabled,
        currentTrack: this.currentTrack,
        volume: this.volume
      };
      localStorage.setItem('kygu_audio_settings', JSON.stringify(s));
    } catch (e) {
      console.warn('Audio settings save fallback:', e);
    }
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(this.isSfxEnabled ? 1 : 0, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(this.isMusicEnabled ? 0.45 : 0, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    this.isUnlocked = true;
  }

  unlock() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isUnlocked = true;
    if (this.isMusicEnabled && !this.musicInterval) {
      this.startMusic();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.saveSettings();
  }

  toggleSfx(enabled) {
    this.isSfxEnabled = enabled;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(this.isSfxEnabled ? 1 : 0, this.ctx.currentTime, 0.05);
    }
    this.saveSettings();
  }

  toggleMusic(enabled) {
    this.isMusicEnabled = enabled;
    if (this.isMusicEnabled) {
      this.unlock();
      this.startMusic();
    } else {
      this.stopMusic();
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(this.isMusicEnabled ? 0.45 : 0, this.ctx.currentTime, 0.08);
    }
    this.saveSettings();
  }

  setTrack(trackKey) {
    this.currentTrack = trackKey;
    this.saveSettings();
    if (this.isMusicEnabled) {
      this.stopMusic();
      if (trackKey !== 'none') {
        this.startMusic();
      }
    }
  }

  // --- SOUND EFFECTS ---
  playTap() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  playWaterDrop() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Classic bubble/water drop sound: sweep up quickly then drop slightly
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(1100, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.18);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  playWaterPour() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const duration = 0.65;

    // Synthesize bubbling water pour using filtered noise + ascending resonance
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.exponentialRampToValueAtTime(1400, t + duration);
    filter.Q.setValueAtTime(4.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.1);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    // Complementary droplet bell
    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(880, t + 0.1);
    chime.frequency.exponentialRampToValueAtTime(1320, t + 0.35);
    chimeGain.gain.setValueAtTime(0, t);
    chimeGain.gain.setValueAtTime(0.15, t + 0.1);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    chime.connect(chimeGain);
    chimeGain.connect(this.sfxGain);

    noise.start(t);
    chime.start(t + 0.1);
    chime.stop(t + 0.5);
  }

  playUrination() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const duration = 0.8;

    // Filtered fluid stream sound
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(1100, t + 0.3);
    filter.frequency.exponentialRampToValueAtTime(400, t + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.15);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(t);
  }

  playCorrect() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.32);
    });
  }

  playWrong() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [220, 207.65]; // A3, G#3 (dissonant semitone)

    notes.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * 0.85, t + 0.35);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  playFanfare() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Victory arpeggio (C4, G4, C5, E5, G5, C6)
    const melody = [
      { f: 261.63, d: 0.12, w: 0 },
      { f: 392.00, d: 0.12, w: 0.12 },
      { f: 523.25, d: 0.14, w: 0.24 },
      { f: 659.25, d: 0.14, w: 0.38 },
      { f: 783.99, d: 0.18, w: 0.52 },
      { f: 1046.50, d: 0.55, w: 0.70 }
    ];

    melody.forEach(n => {
      const noteTime = t + n.w;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, noteTime);

      gain.gain.setValueAtTime(0.28, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + n.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + n.d + 0.05);
    });
  }

  playNotification() {
    if (!this.isSfxEnabled) return;
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, t); // D5
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, t + 0.1); // A5

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(t);
    osc1.stop(t + 0.12);
    osc2.start(t + 0.1);
    osc2.stop(t + 0.38);
  }

  // --- PROCEDURAL AMBIENT MUSIC ENGINE ---
  startMusic() {
    if (!this.ctx || !this.isMusicEnabled || this.currentTrack === 'none') return;
    this.stopMusic();

    if (this.currentTrack === 'water') {
      this.startWaterTrack();
    } else if (this.currentTrack === 'lofi') {
      this.startLofiTrack();
    } else if (this.currentTrack === 'piano') {
      this.startPianoTrack();
    }
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.activeNodes.forEach(n => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  // Track 1: Calm Water Flow (Soothing flowing stream with gentle water bells)
  startWaterTrack() {
    const t = this.ctx.currentTime;

    // Filtered pink noise loop for flowing river sound
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.12;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, t);

    // LFO for gentle current swelling
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, t); // gentle swell every 5.5s
    lfoGain.gain.setValueAtTime(140, t);
    lfo.connect(filter.frequency);

    const flowGain = this.ctx.createGain();
    flowGain.gain.setValueAtTime(0.4, t);

    noise.connect(filter);
    filter.connect(flowGain);
    flowGain.connect(this.musicGain);

    noise.start(t);
    lfo.start(t);
    this.activeNodes.push(noise, lfo, flowGain, filter);

    // Periodic gentle water droplet notes in pentatonic scale
    const pentatonic = [392, 440, 523.25, 587.33, 659.25, 783.99, 880];
    this.musicInterval = setInterval(() => {
      if (!this.ctx || !this.isMusicEnabled || this.currentTrack !== 'water') return;
      if (Math.random() > 0.3) {
        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        const curT = this.ctx.currentTime;
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();

        bell.type = 'sine';
        bell.frequency.setValueAtTime(freq, curT);

        bellGain.gain.setValueAtTime(0.001, curT);
        bellGain.gain.linearRampToValueAtTime(0.07, curT + 0.08);
        bellGain.gain.exponentialRampToValueAtTime(0.001, curT + 1.2);

        bell.connect(bellGain);
        bellGain.connect(this.musicGain);

        bell.start(curT);
        bell.stop(curT + 1.3);
      }
    }, 1200);
  }

  // Track 2: Medical Study Lo-Fi (Gentle chords & relaxing rhythmic pulse)
  startLofiTrack() {
    // 4-chord progression: Dm7 -> G7 -> Cmaj7 -> Am7
    const chords = [
      [293.66, 349.23, 440.00, 523.25], // Dm7 (D4, F4, A4, C5)
      [246.94, 293.66, 392.00, 493.88], // G7 (B3, D4, G4, B4)
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00]  // Am7 (A3, C4, E4, G4)
    ];
    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.ctx || !this.isMusicEnabled || this.currentTrack !== 'lofi') return;
      const curChord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;
      const t = this.ctx.currentTime;

      // Play soft warm electric piano chord
      curChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const delay = idx * 0.035; // gentle humanized strum

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + delay);

        gain.gain.setValueAtTime(0.001, t + delay);
        gain.gain.linearRampToValueAtTime(0.08, t + delay + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 2.8);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t + delay);
        osc.stop(t + delay + 2.9);
      });

      // Soft sub bass root note
      const bass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(curChord[0] / 2, t);
      bassGain.gain.setValueAtTime(0.12, t);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);

      bass.connect(bassGain);
      bassGain.connect(this.musicGain);
      bass.start(t);
      bass.stop(t + 2.5);
    };

    playChordStep();
    this.musicInterval = setInterval(playChordStep, 3200);
  }

  // Track 3: Soft Ambient Piano (Ethereal meditative notes)
  startPianoTrack() {
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    const playNote = () => {
      if (!this.ctx || !this.isMusicEnabled || this.currentTrack !== 'piano') return;
      const t = this.ctx.currentTime;
      const freq = scale[Math.floor(Math.random() * scale.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Warm piano-like decay envelope
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.015, t + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.0);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(t);
      osc.stop(t + 3.1);
    };

    playNote();
    this.musicInterval = setInterval(() => {
      playNote();
      if (Math.random() > 0.5) {
        setTimeout(playNote, 600);
      }
    }, 2400);
  }
}

// Global instance
window.kyguAudio = new KyGUAudioEngine();

// Auto unlock on first user click anywhere
window.addEventListener('click', () => {
  if (window.kyguAudio && !window.kyguAudio.isUnlocked) {
    window.kyguAudio.unlock();
  }
}, { once: true });
