import { firestore } from 'config/firebase';
import { Campaign } from 'store/ducks/campaigns/types';
import { ListSessionsState, Session } from 'store/ducks/sessions/types';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { CookieService } from '../../cookie';

export class SessionService {
  static create(
    campaignId: Campaign['id'],
    sessionName: Session['name'],
  ): void {
    firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc()
      .set({
        name: sessionName,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  static list(
    campaignId: Campaign['id'],
  ): Promise<ListSessionsState['data'] | void> {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .get()
      .then((res) => res.docs.reduce((session, obj) => {
        const temp = session;

        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
        };

        return temp;
      }, {} as ListSessionsState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {};
      });
  }

  static getById(
    campaignId: Campaign['id'],
    sessionId: Session['id'],
  ) {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .collection(EFirestoreCollections.SESSIONS)
      .doc(sessionId)
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
