import { firestore } from 'config/firebase';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { Mix } from 'store/ducks/mixes/types';
import { CookieService } from 'services/cookie/cookie';
import { Campaign } from 'store/ducks/campaigns/types';
import { Session } from 'store/ducks/sessions/types';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';

export class MixService {
  static create(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
    sceneId: Scene['id'],
    mixName: Mix['name'],
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
      .collection(EFirestoreCollections.MIXES)
      .doc()
      .set({
        name: mixName,
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
      });
  }

  static getById(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
    sceneId: Scene['id'],
    mixId: Mix['id'],
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
      .collection(EFirestoreCollections.MIXES)
      .doc(mixId)
      .get()
      .then((res) => {
        const data = res.data() || {};

        console.log(res);

        return {
          id: mixId,
          name: data.name,
        };
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
