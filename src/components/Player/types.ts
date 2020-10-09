import { SoundConfig } from 'store/ducks/sounds/types';

export interface IPlayerProps {
  id: string;
  url: string;
  name: string;
  config: SoundConfig;
}
