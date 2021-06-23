import { EFirestoreCollections } from 'enums/firestoreCollections';
import { UrlParams } from 'interfaces/urlParams';
import { Campaign, ListCampaignsState } from 'store/ducks/campaigns/types';
import { TEmptyObject } from 'types/emptyObject';
import { campaignRequest, userRequest } from '../defaultQueries';

export class CampaignService {
  static create = (campaignName: Campaign['name']): void => {
    userRequest()
      .collection(EFirestoreCollections.CAMPAIGNS)
      .doc()
      .set({
        name: campaignName,
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  static async list() {
    const data = await userRequest()
      .collection(EFirestoreCollections.CAMPAIGNS)
      .get()
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
        return {} as ListCampaignsState['data'];
      });

    return data;
  }

  static getById(urlParams: UrlParams) {
    return campaignRequest(urlParams)
      .get()
      .then((res) => {
        const data = res.data() || {};

        return {
          id: urlParams.campaignId,
          name: data.name,
        } as Campaign;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        return {} as TEmptyObject;
      });
  }
}
