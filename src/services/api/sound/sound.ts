import { firestore } from 'config/firebase';
import { CookieService } from 'services/cookie/cookie';
import { Session } from 'store/ducks/sessions/types';
import { Campaign } from 'store/ducks/campaigns/types';
import { ListSoundsState } from 'store/ducks/sounds/types';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';
import { EFirestoreCollections } from 'enums/firestoreCollections';

export class SoundService {
  static create(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
    sceneId: Session['id'],
    soundName: Scene['name'],
  ): void {
    firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc(sessionId)
      .collection(EFirestoreCollections.SCENES)
      .doc(sceneId)
      .collection(EFirestoreCollections.SOUNDS)
      .doc()
      .set({
        name: soundName,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static list(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
    sceneId: Scene['id'],
  ): Promise<ListScenesState['data'] | void> {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc(sessionId)
      .collection(EFirestoreCollections.SCENES)
      .doc(sceneId)
      .collection(EFirestoreCollections.SOUNDS)
      .get()
      .then((res) => res.docs.reduce((sound, obj) => {
        const temp = sound;

        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
        };

        return temp;
      }, {} as ListSoundsState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static getById(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
    sceneId: Scene['id'],
  ) {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc(sessionId)
      .collection(EFirestoreCollections.SCENES)
      .doc(sceneId)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: sessionId,
          name: data.name,
        };
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
