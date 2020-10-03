import { EFirestoreCollections } from 'enums/firestoreCollections';
import { UrlParams } from 'interfaces/urlParams';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';
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

  static list(
    urlParams: UrlParams,
  ): Promise<ListScenesState['data'] | void> {
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
      });
  }

  static getById(
    urlParams: UrlParams,
  ): Promise<Scene | void> {
    return sceneRequest(urlParams)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: urlParams.sceneId,
          name: data.name,
        };
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
