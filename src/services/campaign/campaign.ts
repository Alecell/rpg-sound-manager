import { CookieStorage } from 'cookie-storage';

import { firestore } from 'config/firebase';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { CampaignsState } from 'store/ducks/campaigns/types';

const cookieStorage = new CookieStorage();

const getToken = (): string => cookieStorage.getItem('userId') ?? '';

export class CampaignService {
  // static create = (campaignName) => {
  //   firestore
  //     .collection(EFirestoreCollections.USERS)
  //     .doc(getToken())
  //     .collection(EFirestoreCollections.CAMPAIGNS)
  //     .doc()
  //     .set({
  //       name: campaignName,
  //     })
  //     .catch((error) => {
  //       console.error('Error writing document: ', error);
  //     });
  // }

  static list(): Promise<CampaignsState['data'] | void> {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(getToken())
      .collection(EFirestoreCollections.CAMPAIGNS).get()
      .then((res) => res.docs.reduce((campaigns, obj) => {
        const temp = campaigns;

        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
        };

        return temp;
      }, {} as CampaignsState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  // static getById = (campaignId) => firestore
  //   .collection(EFirestoreCollections.USERS)
  //   .doc(getToken())
  //   .collection(EFirestoreCollections.CAMPAIGNS)
  //   .doc(campaignId)
  //   .get()
  //   .then((res) => {
  //     const data = res.data() || {};

  //     return {
  //       id: campaignId,
  //       name: data.name,
  //       urlName: data.urlName,
  //     };
  //   })
  //   .catch((error) => {
  //     console.error('Error writing document: ', error);
  //   })
}
