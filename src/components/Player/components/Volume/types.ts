export interface IVolumeProps {
  volume: number;
  onChange: (vol: number, commit: boolean) => void;
}

export type UpdateVolumeEvent = React.ChangeEvent<any>;
