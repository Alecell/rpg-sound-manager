export interface ITrackProps {
  start: number;
  end: number;
  duration: number;
  playing: boolean;
  currentTime: number;
  onChange: (start: number, end: number, commit: boolean) => void;
}

export type UpdateDurationEvent = React.ChangeEvent<any>;
