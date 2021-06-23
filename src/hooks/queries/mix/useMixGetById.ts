import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { MixService } from 'services/api/mix/mix';
import { Mix } from 'store/ducks/mixes/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useMixGetById = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.GET_MIX, urlParams.mixId],
    () => MixService.getById(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryGetToApp(query.data) as Mix,
  };
};
