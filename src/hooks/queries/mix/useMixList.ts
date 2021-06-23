import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { MixService } from 'services/api/mix/mix';
import { ListMixesState } from 'store/ducks/mixes/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useMixList = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.LIST_MIX, urlParams.sceneId],
    () => MixService.list(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryListToApp(query.data) as ListMixesState['data'],
  };
};
