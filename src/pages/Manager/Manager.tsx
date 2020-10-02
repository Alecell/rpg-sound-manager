import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from 'constants/routes';

import Header from 'components/Header';
import { SoundService } from 'services/sound';
import RootPage from './pages/Root';
import ScenePage from './pages/Scene';
import SessionPage from './pages/Session';
import CampaignPage from './pages/Campaign';
import MixPage from './pages/Mix';

import scss from './Manager.module.scss';

const managerRoutes = [
  {
    path: routes.campaign().session().scene().mix().path,
    exact: true,
    component: MixPage,
  },
  {
    path: routes.campaign().session().scene().path,
    exact: true,
    component: ScenePage,
  },
  {
    path: routes.campaign().session().path,
    exact: true,
    component: SessionPage,
  },
  {
    path: routes.campaign().path,
    exact: true,
    component: CampaignPage,
  },
  {
    path: routes.root().path,
    exact: true,
    component: RootPage,
  },
];

const audio = new SoundService('https://firebasestorage.googleapis.com/v0/b/dungeon-chest-eca8d.appspot.com/o/6lsQAYz8YQd9HHRLfHMP%2FWaterfall%20Sound%20Effect%20(online-audio-converter.com).mp3?alt=media&token=f0b94f61-f3bb-446d-ae8a-73a28a60d5ae', { end: 0, start: 0, volume: 0.5 });
const Test = () => {
  const [volume, setVolume] = useState(0);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState('');
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    audio.volume = 0;
    audio.onVolumeChange((volumein: number) => {
      setVolume(volumein);
    });
    audio.onTimeUpdate((timein: number) => {
      setTime(timein);
    });
    audio.addEventListener('loadedmetadata', () => {
      setLength(audio.duration.toFixed(0));
    });
  }, []);

  return (
    <div>
      <button type="button" onClick={() => audio.play()}>play</button>
      <button type="button" onClick={() => audio.pause()}>pause</button>
      <button type="button" onClick={() => audio.stop()}>stop</button>
      <button type="button" onClick={() => audio.mute()}>mute</button>
      <button
        type="button"
        onClick={() => {
          audio.loop = !audio.loop;
          setLooping(audio.loop);
        }}
      >
        loop
      </button>

      LOOP:
      {looping.toString()}
      <input
        type="number"
        onChange={(e) => { audio.start = e.currentTarget.value; }}
      />
      <input
        type="number"
        onChange={(e) => { audio.end = e.currentTarget.value; }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => {
          audio.volume = parseInt(e.currentTarget.value, 10) / 100;
        }}
      />
      <input
        readOnly
        type="range"
        min="0"
        max={length}
        value={time}
        style={{
          width: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};

const ManagerSwitcher = () => (
  <div className={scss.mainWrap}>
    <Header />
    <main className={scss.containerMain}>
      <Switch>
        {managerRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
      <Test />
    </main>
  </div>
);

export default ManagerSwitcher;
