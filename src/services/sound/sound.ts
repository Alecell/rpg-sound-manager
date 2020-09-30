import { Sound, SoundOptions } from 'store/ducks/sounds/types';
import { isString } from 'utils/isString';

export class SoundService {
  sound: HTMLAudioElement;

  opts: SoundOptions;

  duration = 0;

  constructor(soundUrl: Sound['file'], opts: SoundOptions) {
    const onAudioLoaded = (e: any) => {
      this.duration = e.currentTarget.duration;
    };

    this.opts = opts;
    this.sound = new Audio(soundUrl);
    this.sound.addEventListener('loadedmetadata', onAudioLoaded.bind(this));
  }

  play() {
    console.log(this.duration);
    this.sound.play();
  }

  pause() {
    this.sound.pause();
  }

  mute() {
    this.opts.volume = 0;
    this.sound.volume = 0;
  }

  set onVolumeChange(changeFn: (volume: any, event: any) => void) {
    this.sound.addEventListener('volumechange', (e: any) => {
      const volume = Math.round(e?.currentTarget?.volume * 100);
      changeFn(volume, e);
    });
  }

  set onTimeUpdate(onUpdate: (time: any, event: any) => void) {
    this.sound.addEventListener('timeupdate', (e: any) => {
      onUpdate(e?.currentTarget?.currentTime, e);
    });
  }

  set volume(value: number | string) {
    let vol: number = value as number;

    if (isString(value)) {
      vol = parseInt(value, 10);
    }

    vol /= 100;

    if (vol > 1) vol = 1;
    else if (vol < 0) vol = 0;

    this.opts.volume = vol;
    this.sound.volume = vol;
  }
}
