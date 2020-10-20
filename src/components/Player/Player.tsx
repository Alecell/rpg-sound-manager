import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UrlParams } from 'interfaces/urlParams';
import { SoundService } from 'services/sound';
import { TEmptyObject } from 'types/emptyObject';
import { SoundActions } from 'store/ducks/sounds/actions';

import Loop from './components/Loop';
import Play from './components/Play';
import Track from './components/Track';
import Delete from './components/Delete';
import Volume from './components/Volume';

import { IPlayerProps } from './types';

function Player(props: IPlayerProps) {
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();

  const [sound, setSound] = useState<SoundService | TEmptyObject>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatchConfig = () => {
    dispatch(SoundActions.setConfig.request({
      urlParams,
      soundId: props.id,
      config: {
        start: sound.config.start,
        end: sound.config.end,
        loop: sound.loop,
        mute: sound.muted,
        volume: sound.volume,
      },
    }));
  };

  const deleteSound = () => {
    dispatch(SoundActions.delete.request({
      soundId: props.id,
      soundUrl: props.url,
      urlParams,
    }));
  };

  const togglePlay = () => {
    if (!playing) {
      sound.play();
    } else {
      sound.pause();
    }

    setPlaying(!playing);
  };

  const toggleLoop = () => {
    if (!sound.loop) {
      sound.loop = true;
    } else {
      sound.loop = false;
    }

    setLooping(!looping);
    dispatchConfig();
  };

  const updateVolume = (vol: number, commit: boolean) => {
    sound.volume = vol;

    if (commit) dispatchConfig();
  };

  const updateDuration = (start: number, end: number, commit: boolean) => {
    sound.start = start;
    sound.end = end;

    if (commit) dispatchConfig();
  };

  const renderPlayer = () => (
    <div>
      carregando
      {' '}
      {loading.toString()}
      <Play
        playing={playing}
        onClick={togglePlay}
      />
      <Loop
        looping={sound.loop}
        onClick={toggleLoop}
      />
      <Volume
        volume={sound.volume}
        onChange={updateVolume}
      />
      <Delete
        onDelete={deleteSound}
      />
      <Track
        playing={playing}
        currentTime={currentTime}
        end={sound.config.end}
        start={sound.config.start}
        duration={sound.duration}
        onChange={updateDuration}
      />
    </div>
  );

  useEffect(() => {
    setSound(new SoundService(props.url, props.config));
  }, [props.config, props.url]);

  useEffect(() => {
    sound.onended = () => {
      setPlaying(false);
    };

    sound.onloadeddata = () => {
      setLoading(false);
    };

    sound.onTimeUpdate = (newTime: number) => {
      setCurrentTime(newTime);
    };
  }, [sound]);

  return loading ? <div /> : renderPlayer();
}

export default memo(Player);
