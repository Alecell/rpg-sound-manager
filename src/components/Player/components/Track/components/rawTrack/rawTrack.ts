import scss from './rawTrack.module.scss';

export function addRawTrack(ref: React.RefObject<HTMLSpanElement>) {
  const rawTrack = document.createElement('DIV');
  const progress = document.createElement('DIV');
  const el = ref.current;

  rawTrack.className = scss.track;
  progress.className = scss.progress;

  rawTrack.appendChild(progress);

  if (el) {
    const track = el.querySelector('.MuiSlider-track');

    if (track) {
      track.appendChild(rawTrack);
    }
  }
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

  if (progressEl) {
    progressEl.style.width = `${progress}%`;
  }
}
