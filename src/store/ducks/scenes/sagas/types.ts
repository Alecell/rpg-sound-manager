import { SceneActions } from '../actions';

export type ListSceneRequestAction = ReturnType<typeof SceneActions.list.request>;
export type CreateSceneRequestAction = ReturnType<typeof SceneActions.create.request>;
export type GetByIdSceneRequestAction = ReturnType<typeof SceneActions.getById.request>;
