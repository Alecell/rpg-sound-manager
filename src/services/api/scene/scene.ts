import { firestore } from 'config/firebase';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { CookieService } from 'services/cookie/cookie';
import { Campaign } from 'store/ducks/campaigns/types';
import { ListScenesState, Scene } from 'store/ducks/scenes/types';
import { Session } from 'store/ducks/sessions/types';

export class SceneService {
  static create(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
    sceneName: Scene['name'],
  ): void {
    firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc(sessionId)
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
    campaignId: Campaign['id'],
    sessionId: Session['id'],
  ): Promise<ListScenesState['data'] | void> {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc(sessionId)
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
          id: sceneId,
          name: data.name,
        };
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
