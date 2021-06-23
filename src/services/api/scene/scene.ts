import { EFirestoreCollections } from 'enums/firestoreCollections';
import { UrlParams } from 'interfaces/urlParams';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';
import { TEmptyObject } from 'types/emptyObject';
import { sceneRequest, sessionRequest } from '../defaultQueries';

export class SceneService {
  static create(
    urlParams: UrlParams,
    sceneName: Scene['name'],
  ): void {
    sessionRequest(urlParams)
      .collection(EFirestoreCollections.SCENES)
      .doc()
      .set({
        name: sceneName,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static list(urlParams: UrlParams) {
    return sessionRequest(urlParams)
      .collection(EFirestoreCollections.SCENES)
      .get()
      .then((res) => res.docs.reduce((scene, obj) => {
        const temp = scene;

        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
        };

        return temp;
      }, {} as ListScenesState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {} as TEmptyObject;
      });
  }

  static getById(urlParams: UrlParams) {
    return sceneRequest(urlParams)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: urlParams.sceneId,
          name: data.name,
        } as Scene;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {} as TEmptyObject;
      });
  }
}
