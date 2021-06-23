import { useQuery } from 'react-query';

import { PageTransformer } from 'transformers/page/page';
import { UrlParams } from 'interfaces/urlParams';
import { SoundService } from 'services/api/sound/sound';
import { ListSoundsState } from 'store/ducks/sounds/types';
import { EReactQueryKeys } from 'enums/reactQueryKeys';

export const useSoundList = (urlParams: UrlParams) => {
  const query = useQuery(
    [EReactQueryKeys.LIST_SOUND, urlParams.sceneId, urlParams.mixId],
    () => SoundService.list(urlParams),
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  return {
    ...query,
    data: PageTransformer.queryListToApp(query.data) as ListSoundsState['data'],
  };
};
