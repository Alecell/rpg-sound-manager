import { useQuery } from 'react-query';

import { UrlParams } from 'interfaces/urlParams';
import { PageTransformer } from 'transformers/page/page';
import { SceneService } from 'services/api/scene/scene';
import { Scene } from 'store/ducks/scenes/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useSceneGetById = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.GET_SCENE, urlParams.sceneId],
    () => SceneService.getById(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryGetToApp(query.data) as Scene,
  };
};
