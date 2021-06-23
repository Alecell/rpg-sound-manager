import { useQuery } from 'react-query';

import { PageTransformer } from 'transformers/page/page';
import { CampaignService } from 'services/api/campaign/campaign';
import { UserService } from 'services/user/user';
import { ListCampaignsState } from 'store/ducks/campaigns/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useCampaignList = () => {
  const query = useQuery(
    [EReactQueryKeys.LIST_CAMPAIGN, UserService.getToken()],
    () => CampaignService.list(),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryListToApp(query.data) as ListCampaignsState['data'],
  };
};
