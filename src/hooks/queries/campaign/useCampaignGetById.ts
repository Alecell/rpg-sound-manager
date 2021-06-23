import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { CampaignService } from 'services/api/campaign/campaign';
import { Campaign } from 'store/ducks/campaigns/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useCampaignGetById = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.GET_CAMPAIGN, urlParams.campaignId],
    () => CampaignService.getById(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryGetToApp(query.data) as Campaign,
  };
};
