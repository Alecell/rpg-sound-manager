import { ListSessionsState, Session } from 'store/ducks/sessions/types';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { UrlParams } from 'interfaces/urlParams';
import { TEmptyObject } from 'types/emptyObject';
import { campaignRequest, sessionRequest } from '../defaultQueries';

export class SessionService {
  static create(
    urlParams: UrlParams,
    sessionName: Session['name'],
  ): void {
    campaignRequest(urlParams)
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
    params: UrlParams,
  ) {
    return campaignRequest(params)
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
        return {} as ListSessionsState['data'];
      });
  }

  static getById(urlParams: UrlParams) {
    return sessionRequest(urlParams)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: urlParams.sessionId,
          name: data.name,
        } as Session;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {} as TEmptyObject;
      });
  }
}
