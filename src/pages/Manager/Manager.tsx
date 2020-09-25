import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from 'constants/routes';

import Header from 'components/Header';
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
    </main>
  </div>
);

export default ManagerSwitcher;
