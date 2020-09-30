import { ChangeEvent } from 'react';
import { Campaign } from 'store/ducks/campaigns/types';

export interface CreateProps {
  open: boolean;
  withInput?: boolean;

  label: string;

  onClose: () => void;
  onSubmit: (name: string, soundFile?: File) => void;
}

export type SubmitEvent = React.FormEvent<HTMLFormElement>;
export type UploadEvent = ChangeEvent<HTMLInputElement>;
export type ChangeNameEvent = React.ChangeEvent<HTMLInputElement>;
