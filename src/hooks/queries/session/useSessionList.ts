import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { SessionService } from 'services/api/session/session';
import { ListSessionsState } from 'store/ducks/sessions/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useSessionList = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.LIST_SESSION, urlParams.campaignId],
    () => SessionService.list(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryListToApp(query.data) as ListSessionsState['data'],
  };
};
