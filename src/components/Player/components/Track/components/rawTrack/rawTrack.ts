import scss from './rawTrack.module.scss';

export function addRawTrack(ref: React.RefObject<HTMLSpanElement>) {
  const rawTrack = document.createElement('DIV');
  const progress = document.createElement('DIV');
  const el = ref.current;

  rawTrack.className = scss.track;
  progress.className = scss.progress;

  rawTrack.appendChild(progress);

  const track = el!.querySelector('.MuiSlider-track');

  track!.appendChild(rawTrack);
}

export function updateRawTrack(
  ref: React.RefObject<HTMLSpanElement>,
  initialTime: number,
  finalTime: number,
  currentProgress: number,
) {
  const el = ref.current;
  const progressEl = el?.querySelector<HTMLDivElement>(`.${scss.progress}`);
  const baseEndTime = finalTime - initialTime;
  const baseCurrentTime = currentProgress - initialTime;
  const progress = (baseCurrentTime * 100) / baseEndTime;

  progressEl!.style.width = `${progress}%`;
}
