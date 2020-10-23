import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UrlParams } from 'interfaces/urlParams';
import { RootState } from 'interfaces/rootState';
import { SoundActions } from 'store/ducks/sounds/actions/actions';
import { Sounds } from './sounds';
import { IMixPlayer } from './types';

const useMixPlayerStore = () => useSelector(
  (state: RootState) => ({
    sounds: state.sounds.list,
  }), shallowEqual,
);

function MixPlayer(props: IMixPlayer) {
  const store = useMixPlayerStore();
  const urlParams = useParams<UrlParams>();
  const dispatch = useDispatch();

  const [sounds, setSounds] = useState<Sounds>();
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    setSounds(new Sounds(store.sounds.data));
  }, [store.sounds.data]);

  useEffect(() => {
    if (isPlaying) sounds!.play();
  }, [isPlaying, sounds]);

  useEffect(() => {
    dispatch(SoundActions.list.request({
      urlParams: {
        ...urlParams,
        mixId: props.mixId,
      },
    }));
  }, [dispatch, props.mixId, urlParams]);

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
