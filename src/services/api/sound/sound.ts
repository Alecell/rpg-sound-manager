import { storage } from 'config/firebase';
import { CookieService } from 'services/cookie';
import { ListSoundsState } from 'store/ducks/sounds/types';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { UrlParams } from 'interfaces/urlParams';
import { sceneRequest, mixRequest, soundRequest } from '../defaultQueries';

export class SoundService {
  static upload(hash: string, file: File): Promise<URL | void> {
    const userId = CookieService.getUserToken();
    const fileExtension = file.name.split('.').pop();
    const savePath = `${userId}/${hash}.${fileExtension}`;

    return storage
      .ref(savePath).put(file)
      .then(async (res) => {
        const url = await res.ref.getDownloadURL();
        return new URL(url);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  static create(
    urlParams: UrlParams,
    soundName: Scene['name'],
    fileUrl: string,
  ): void {
    let request = sceneRequest(urlParams);

    if (urlParams.mixId) request = mixRequest(urlParams);

    request
      .collection(EFirestoreCollections.SOUNDS)
      .doc()
      .set({
        name: soundName,
        url: fileUrl,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static updateConfig = (
    urlParams: UrlParams,
    config: any,
  ): void => {
    soundRequest(urlParams)
      .set({
        loop: config.loop,
        startAt: config.limits.start,
        endAt: config.limits.end,
      }, { merge: true });
  };

  static list(urlParams: UrlParams): Promise<ListScenesState['data'] | void> {
    let request = sceneRequest(urlParams);

    if (urlParams.mixId) request = mixRequest(urlParams);

    return request
      .collection(EFirestoreCollections.SOUNDS)
      .get()
      .then((res) => res.docs.reduce((sound, obj) => {
        const temp = sound;

        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
          file: obj.data().url,
        };

        return temp;
      }, {} as ListSoundsState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static getById(urlParams: UrlParams) {
    return sceneRequest(urlParams)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: urlParams.sessionId,
          name: data.name,
        };
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
