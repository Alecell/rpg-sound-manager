import React, { useEffect, useState } from 'react';

import { SoundService } from 'services/sound';
import { TEmptyObject } from 'types/emptyObject';

import Loop from './components/Loop';
import Play from './components/Play';

import { IPlayerProps } from './types';

function Player(props: IPlayerProps) {
  const [sound, setSound] = useState<SoundService | TEmptyObject>({});
  const [playing, setPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [loading, setLoading] = useState(true);

  const togglePlay = () => {
    if (!playing) {
      sound.play();
    } else {
      sound.pause();
    }

    setPlaying(!playing);
  };

  const toggleLoop = () => {
    if (!looping) {
      sound.loop = true;
    } else {
      sound.loop = false;
    }
    setLooping(!looping);
  };

  useEffect(() => {
    setSound(new SoundService(props.file, {
      end: 30,
      start: 0,
      volume: 0.5,
      muted: false,
    }));
  }, [props.file]);

  useEffect(() => {
    sound.onended = () => {
      setPlaying(false);
    };

    sound.oncanplay = () => {
      setLoading(false);
    };
  }, [sound]);

  return (
    <div>
      carregando
      {' '}
      {loading.toString()}
      <Play
        playing={playing}
        onClick={togglePlay}
      />
      <Loop
        looping={looping}
        onClick={toggleLoop}
      />
    </div>
  );
}

export default Player;
