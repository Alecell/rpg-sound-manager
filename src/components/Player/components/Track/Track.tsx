import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@material-ui/core';

import { ITrackProps, UpdateDurationEvent } from './types';

import { addRawTrack, updateRawTrack } from './components/rawTrack';

const MIN = 0;
const MAX = 1000;

function Track(props: ITrackProps) {
  const sliderRef = useRef(null);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const parseTimeToTrack = (currentTime: number) => (currentTime * MAX) / props.duration;
  const parseTrackToTime = (currentPosition: number) => (currentPosition * props.duration) / MAX;

  const updateDuration = (commit: boolean) => (
    e: UpdateDurationEvent,
    limits: number | number[],
  ) => {
    const [st, en] = limits as number[];

    setStart(parseTrackToTime(st));
    setEnd(parseTrackToTime(en));
    props.onChange(
      parseTrackToTime(st),
      parseTrackToTime(en),
      commit,
    );
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
      min={MIN}
      max={MAX}
      value={[
        parseTimeToTrack(start),
        parseTimeToTrack(end),
      ]}
      onChange={updateDuration(false)}
      onChangeCommitted={updateDuration(true)}
    />
  );
}

export default Track;
