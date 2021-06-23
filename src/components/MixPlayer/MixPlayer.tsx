import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UrlParams } from 'interfaces/urlParams';
import { useSoundList } from 'hooks/queries/sound/useSoundList';
import isEmpty from 'lodash.isempty';
import { Sounds } from './sounds';
import { IMixPlayer } from './types';

function MixPlayer(props: IMixPlayer) {
  const urlParams = useParams<UrlParams>();
  const soundList = useSoundList({
    ...urlParams,
    mixId: props.mixId,
  });

  const [sounds, setSounds] = useState<Sounds>();
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isEmpty(sounds) && !isEmpty(soundList.data)) {
      setSounds(new Sounds(soundList.data));
    }
  }, [soundList.data, sounds]);

  useEffect(() => {
    if (isPlaying) sounds!.play();
  }, [isPlaying, sounds]);

  return (
    <button
      type="button"
      onClick={play}
    >
      ---- PLAY
    </button>
  );
}

export default MixPlayer;
