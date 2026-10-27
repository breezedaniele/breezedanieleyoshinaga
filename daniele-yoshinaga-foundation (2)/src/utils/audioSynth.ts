/**
 * Gentle Web Audio Synthesizer for Breeze Daniele's songs preview
 * Plays relaxing harmonic acoustic bell/piano chimes corresponding to each song's key.
 */
class BreezeAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;
  private volumeNode: GainNode | null = null;
  private masterGainValue: number = 0.4;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.masterGainValue, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.masterGainValue = Math.max(0, Math.min(1, vol));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.masterGainValue, this.ctx.currentTime);
    }
  }

  public start(notes: number[], bpm: number = 76, onNotePlay?: (noteFreq: number, index: number) => void) {
    this.initContext();
    if (!this.ctx || !this.volumeNode) return;
    this.stop();

    this.isPlaying = true;
    this.currentNoteIndex = 0;
    const intervalMs = (60 / bpm) * 1000 * 0.75; // Arpeggio pace

    const playNext = () => {
      if (!this.isPlaying || !this.ctx || !this.volumeNode) return;

      const freq = notes[this.currentNoteIndex % notes.length];
      this.playPluckNote(freq);
      if (onNotePlay) {
        onNotePlay(freq, this.currentNoteIndex % notes.length);
      }
      this.currentNoteIndex++;

      this.timerId = window.setTimeout(playNext, intervalMs);
    };

    playNext();
  }

  private playPluckNote(freq: number) {
    if (!this.ctx || !this.volumeNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Gentle warm sine + lowpass triangle combo
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm envelope
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const breezeAudioSynth = new BreezeAudioSynth();
