import { SoundService } from 'services/sound/sound';
import { ListSoundsState } from 'store/ducks/sounds/types';

export class Sounds {
  private sounds: SoundService[];

  constructor(sounds: ListSoundsState['data']) {
    this.sounds = Object.keys(sounds).map((soundId: string) => {
      const { url, config } = sounds[soundId];
      const sound = new SoundService(url, config);
      return sound;
    });
  }

  play() {
    this.sounds.forEach((sound) => sound.play());
  }
}
