import { Sound, SoundConfig } from 'store/ducks/sounds/types';
import { isString } from 'utils/isString';
import { ValueUpdate } from './types';

const AUDIO_START = 0;

const MAX_VOLUME = 100;

const MIN_NATIVE_AUDIO_VOLUME = 0;
const MAX_NATIVE_AUDIO_VOLUME = 1;

export class SoundService extends Audio {
  config: SoundConfig;

  constructor(soundUrl: Sound['url'], config: SoundConfig) {
    super(soundUrl);

    this.config = { ...config };

    this.addEventListener('timeupdate', this.handleAudioEnd);
    this.addEventListener('loadeddata', () => {
      this.setTimeToStart();
      this.volume = config.volume;
      this.loop = config.loop;
    });
  }

  static async getAudioFileDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const audio = new Audio(objectUrl);

      audio.onloadeddata = (e: any) => {
        resolve(audio.duration);
      };
    });
  }

  private handleAudioEnd(e: any) {
    if (e.currentTarget.currentTime > this.config.end && this.loop) {
      this.setTimeToStart();
    } else if (e.currentTarget.currentTime > this.config.end && !this.loop) {
      this.stop();
      if (this.onended) this.onended(e);
    }
  }

  private setTimeToStart() {
    this.currentTime = this.config.start || AUDIO_START;
  }

  mute() {
    this.muted = true;
    this.config.mute = true;
  }

  unmute() {
    this.muted = false;
    this.config.mute = false;
  }

  stop() {
    this.pause();
    this.setTimeToStart();
  }

  onVolumeChange(changeFn: ValueUpdate): void {
    this.addEventListener('volumechange', (e: any) => {
      const volume = Math.round(e.currentTarget.volume);
      changeFn(volume, e);
    });
  }

  set onTimeUpdate(onUpdate: ValueUpdate) {
    this.addEventListener('timeupdate', (e: any) => {
      onUpdate(e.currentTarget.currentTime, e);
    });
  }

  set start(value: number | string) {
    let time = value;

    if (isString(time)) time = parseInt(time, 10);

    this.currentTime = time;
    this.config.start = time;
  }

  set end(value: number | string) {
    let time = value;

    if (isString(time)) time = parseInt(time, 10);

    this.config.end = time;
  }

  set volume(value: number) {
    let vol = value;

    vol /= MAX_VOLUME;

    if (vol > MAX_NATIVE_AUDIO_VOLUME) {
      vol = MAX_NATIVE_AUDIO_VOLUME;
    } else if (vol < MIN_NATIVE_AUDIO_VOLUME) {
      vol = MIN_NATIVE_AUDIO_VOLUME;
    }

    this.config.volume = vol;
    super.volume = vol;
  }

  get volume(): number {
    return super.volume * MAX_VOLUME;
  }
}
