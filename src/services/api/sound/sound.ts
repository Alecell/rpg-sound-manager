import { storage } from 'config/firebase';
import { CookieService } from 'services/cookie';
import { ListSoundsState, Sound, SoundConfig } from 'store/ducks/sounds/types';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { UrlParams } from 'interfaces/urlParams';
import { sceneRequest, mixRequest } from '../defaultQueries';

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
    duration: SoundConfig['end'],
  ): void {
    let request = sceneRequest(urlParams);

    if (urlParams.mixId) request = mixRequest(urlParams);

    request
      .collection(EFirestoreCollections.SOUNDS)
      .doc()
      .set({
        name: soundName,
        url: fileUrl,
        start: 0,
        end: duration,
        volume: 1,
        mute: false,
        loop: false,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static updateConfig = (
    urlParams: UrlParams,
    soundId: Sound['id'],
    config: SoundConfig,
  ): void => {
    let request = sceneRequest;

    if (urlParams.mixId) request = mixRequest;

    console.log(config);

    request(urlParams)
      .collection(EFirestoreCollections.SOUNDS)
      .doc(soundId)
      .set({
        start: config.start,
        end: config.end,
        volume: config.volume,
        mute: config.mute,
        loop: config.loop,
      }, { merge: true });
  };

  static list(urlParams: UrlParams): Promise<ListScenesState['data'] | void> {
    let request = sceneRequest;

    if (urlParams.mixId) request = mixRequest;

    return request(urlParams)
      .collection(EFirestoreCollections.SOUNDS)
      .get()
      .then((res) => res.docs.reduce((sound, obj) => {
        const {
          name, url, start, end, mute, volume, loop,
        } = obj.data();
        const temp = sound;

        temp[obj.id] = {
          id: obj.id,
          name,
          url,
          config: {
            start,
            end,
            mute,
            volume,
            loop,
          },
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
