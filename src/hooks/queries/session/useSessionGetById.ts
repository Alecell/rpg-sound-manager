import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { SessionService } from 'services/api/session/session';
import { Session } from 'store/ducks/sessions/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useSessionGetById = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.GET_SESSION, urlParams.sessionId],
    () => SessionService.getById(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryGetToApp(query.data) as Session,
  };
};
