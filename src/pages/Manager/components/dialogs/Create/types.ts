import { Campaign } from 'store/ducks/campaigns/types';

export interface CreateProps {
  open: boolean;

  label: string;

  onClose: () => void;
  onSubmit: (name: string) => void;
}

export type SubmitEvent = React.FormEvent<HTMLFormElement>;
export type ChangeNameEvent = React.ChangeEvent<HTMLInputElement>;
