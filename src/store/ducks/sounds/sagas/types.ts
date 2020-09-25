import { SoundActions } from '../actions';

export type ListSoundRequestAction = ReturnType<typeof SoundActions.list.request>;
export type CreateSoundRequestAction = ReturnType<typeof SoundActions.create.request>;
