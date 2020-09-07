export interface ICreateCampaignProps {
  onClose: () => void;
  open: boolean;
}

export type submitEvent = React.FormEvent<HTMLFormElement>;
export type changeNameEvent = React.ChangeEvent<HTMLInputElement>;
