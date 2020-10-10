import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@material-ui/core';

import { ITrackProps, UpdateDurationEvent } from './types';

import { addRawTrack, updateRawTrack } from './components/rawTrack';

const MIN_TIME = 0;

function Track(props: ITrackProps) {
  const sliderRef = useRef(null);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const updateDuration = (commit: boolean) => (
    e: UpdateDurationEvent,
    limits: number | number[],
  ) => {
    const [st, en] = limits as number[];

    setStart(st);
    setEnd(en);
    props.onChange(st, en, commit);
  };

  useEffect(() => {
    addRawTrack(sliderRef);
  }, [sliderRef]);

  useEffect(() => {
    setStart(props.start);
    setEnd(props.end);
  }, [props.duration, props.end, props.start]);

  useEffect(() => {
    if (props.playing) {
      updateRawTrack(sliderRef, start, end, props.currentTime);
    }
  }, [start, end, props.currentTime, props.playing]);

  return (
    <Slider
      ref={sliderRef}
      min={MIN_TIME}
      max={props.duration}
      value={[start, end]}
      onChange={updateDuration(false)}
      onChangeCommitted={updateDuration(true)}
    />
  );
}

export default Track;
