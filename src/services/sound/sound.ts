import { Sound, SoundOptions } from 'store/ducks/sounds/types';
import { isString } from 'utils/isString';
import { ValueUpdate } from './types';

const AUDIO_START = 0;

const MIN_VOLUME = 0;
const MAX_VOLUME = 100;

const MIN_NATIVE_AUDIO_VOLUME = 0;
const MAX_NATIVE_AUDIO_VOLUME = 1;

export class SoundService extends Audio {
  opts: SoundOptions;

  constructor(soundUrl: Sound['file'], opts: SoundOptions) {
    super(soundUrl);

    this.opts = opts;

    this.addEventListener('timeupdate', this.handleAudioEnd);
  }

  private handleAudioEnd(e: any) {
    if (e.currentTarget.currentTime > this.opts.end && this.loop) {
      this.currentTime = this.setTimeToStart();
    } else if (e.currentTarget.currentTime > this.opts.end && !this.loop) {
      this.stop();
    }
  }

  private setTimeToStart() {
    return this.opts.start || AUDIO_START;
  }

  mute() {
    this.opts.volume = MIN_VOLUME;
    this.volume = MIN_VOLUME;
  }

  stop() {
    this.pause();
    this.currentTime = this.setTimeToStart();
  }

  onVolumeChange(changeFn: ValueUpdate): void {
    this.addEventListener('volumechange', (e: any) => {
      const volume = Math.round(e.currentTarget.volume * MAX_VOLUME);
      changeFn(volume, e);
    });
  }

  onTimeUpdate(onUpdate: ValueUpdate): void {
    this.addEventListener('timeupdate', (e: any) => {
      onUpdate(e.currentTarget.currentTime, e);
    });
  }

  set start(value: number | string) {
    let time = value;

    if (isString(time)) time = parseInt(time, 10);

    this.currentTime = time;
    this.opts.start = time;
  }

  set end(value: number | string) {
    let time = value;

    if (isString(time)) time = parseInt(time, 10);

    this.opts.end = time;
  }

  setVolume(value: number | string) {
    let vol: number = value as number;

    if (isString(value)) {
      vol = parseInt(value, 10);
    }

    vol /= MAX_VOLUME;

    if (vol > MAX_NATIVE_AUDIO_VOLUME) {
      vol = MAX_NATIVE_AUDIO_VOLUME;
    } else if (vol < MIN_NATIVE_AUDIO_VOLUME) {
      vol = MIN_NATIVE_AUDIO_VOLUME;
    }

    this.opts.volume = vol;
    this.volume = vol;
  }

  getVolume(): number {
    return this.volume * MAX_VOLUME;
  }
}
