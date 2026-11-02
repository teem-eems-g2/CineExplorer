/**
 * Cinema Soundscape Synthesizer
 * Uses the Web Audio API to create authentic analog cinema room tone,
 * projector hum, and film reel tick sounds with ZERO external assets.
 */

class CinemaAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private volume = 0.25;

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play deep cinematic theater room tone
   * (42Hz deep drone + 84Hz overtone + subtle warm pink noise filter)
   */
  public startAmbiance() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isPlaying) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Sub-bass cinema drone (43 Hz)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(43, now);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.5, now + 2); // Soft 2s fade-in
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    this.oscillators.push(subOsc);

    // Warm second harmonic (86 Hz) with slow binaural drift
    const harmOsc = this.ctx.createOscillator();
    harmOsc.type = 'sine';
    harmOsc.frequency.setValueAtTime(86, now);

    const harmGain = this.ctx.createGain();
    harmGain.gain.setValueAtTime(0, now);
    harmGain.gain.linearRampToValueAtTime(0.2, now + 3);
    harmOsc.connect(harmGain);
    harmGain.connect(this.masterGain);
    harmOsc.start(now);
    this.oscillators.push(harmOsc);

    // Warm analog room air (filtered noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.04;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter to simulate muffled auditorium air
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.35, now + 2.5);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noiseSource.start(now);
    this.noiseNode = noiseSource;
  }

  public stopAmbiance() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.linearRampToValueAtTime(0.001, now + 1.2);

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.oscillators = [];

      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch {}
        this.noiseNode = null;
      }
      this.isPlaying = false;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }
    }, 1300);
  }

  public toggleAmbiance(): boolean {
    if (this.isPlaying) {
      this.stopAmbiance();
      return false;
    } else {
      this.startAmbiance();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  /**
   * Sound effect for reel tick in Cinema Roulette
   */
  public playTick() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Celebration chime when roulette picks a movie
   */
  public playFanfare() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880]; // A chord
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    });
  }
}

export const cinemaAudio = new CinemaAudioEngine();
