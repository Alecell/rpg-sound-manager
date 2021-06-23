import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { SceneService } from 'services/api/scene/scene';
import { ListScenesState } from 'store/ducks/scenes/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useSceneList = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.LIST_SCENE, urlParams.sessionId],
    () => SceneService.list(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryListToApp(query.data) as ListScenesState['data'],
  };
};
