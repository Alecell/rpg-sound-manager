import { firestore } from 'config/firebase';
import { EFirestoreCollections } from 'enums/firestoreCollections';
import { Campaign, ListCampaignsState } from 'store/ducks/campaigns/types';
import { CookieService } from '../../cookie';

export class CampaignService {
  static create = (campaignName: Campaign['name']): void => {
    firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc()
      .set({
        name: campaignName,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  static list(): Promise<ListCampaignsState['data'] | void> {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS).get()
      .then((res) => res.docs.reduce((campaigns, obj) => {
        const temp = campaigns;
        temp[obj.id] = {
          id: obj.id,
          name: obj.data().name,
        };

        return temp;
      }, {} as ListCampaignsState['data']))
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {};
      });
  }

  static getById(campaignId: Campaign['id']): Promise<Campaign | void> {
    return firestore
      .collection(EFirestoreCollections.USERS)
      .doc(CookieService.getUserToken())
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc(campaignId)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: campaignId,
          name: data.name,
        } as Campaign;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
