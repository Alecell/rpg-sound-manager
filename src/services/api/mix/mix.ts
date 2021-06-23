import { EFirestoreCollections } from 'enums/firestoreCollections';
import { Mix } from 'store/ducks/mixes/types';
import { ListScenesState } from 'store/ducks/scenes/types';
import { UrlParams } from 'interfaces/urlParams';
import { ListSoundsState } from 'store/ducks/sounds/types';
import { mixRequest, sceneRequest } from '../defaultQueries';

export class MixService {
  static create(
    urlParams: UrlParams,
    mixName: Mix['name'],
  ): void {
    sceneRequest(urlParams)
      .collection(EFirestoreCollections.MIXES)
      .doc()
      .set({
        name: mixName,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static list(urlParams: UrlParams) {
    return sceneRequest(urlParams)
      .collection(EFirestoreCollections.MIXES)
      .get()
      .then((res) => res.docs.reduce((mix, obj) => {
        const temp = mix;

        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
        };

        return temp;
      }, {} as ListScenesState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {} as ListSoundsState['data'];
      });
  }

  static getById(urlParams: UrlParams) {
    return mixRequest(urlParams)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: urlParams.mixId,
          name: data.name,
        } as Mix;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {} as Mix;
      });
  }
}
