import { SoundActions } from '../actions/actions';

export type CreateSoundRequestAction = ReturnType<typeof SoundActions.create.request>;
export type SetConfigSoundRequestAction = ReturnType<typeof SoundActions.setConfig.request>;
export type DeleteSoundRequestAction = ReturnType<typeof SoundActions.delete.request>;
