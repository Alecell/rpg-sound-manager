import { CookieStorage } from 'cookie-storage';

import { firestore } from 'config/firebase';
import { ListSessionsState, ISession } from 'store/ducks/sessions/types';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { IUrlParams } from 'interfaces/urlParams';

const cookieStorage = new CookieStorage();

const getToken = (): string => cookieStorage.getItem('userId') ?? '';

export class SessionService {
  static create(
    campaignId: IUrlParams['campaignId'],
    sessionName: ISession['name'],
  ) {
    firestore
      .collection(EFirestoreCollections.USERS)
      .doc(getToken())
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

  static list(campaignId: string) {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(getToken())
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
      });
  }

  // static getById(campaignId: string, sessionId: string) {
  //   return firestore
  //     .collection(EFirestoreCollections.USERS)
  //     .doc(cookieStorage.getItem('userId'))
  //     .collection(EFirestoreCollections.CAMPAIGNS)
  //     .doc(campaignId)
  //     .collection(EFirestoreCollections.SESSIONS)
  //     .doc(sessionId)
  //     .get()
  //     .then((res) => {
  //       const data = res.data();

  //       return {
  //         id: sessionId,
  //         name: data.name,
  //       };
  //     })
  //     .catch((error) => {
  //       console.error('Error writing document: ', error);
  //     });
  // }
}
