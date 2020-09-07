import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';

import { routes } from 'constants/routes';
import {
  RootPage,
  CampaignPage,
} from 'pages';

const rootRoutes: RouteProps[] = [
  {
    path: routes.campaign().exec(),
    exact: true,
    component: CampaignPage,
  },
  {
    path: routes.root().exec(),
    exact: true,
    component: RootPage,
  },
];

export const getRoutes = () => (
  <Switch>
    {rootRoutes.map((route) => (
      <Route
        key={route.path as string}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    ))}
  </Switch>
);
