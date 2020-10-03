import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';

import {
  ManagerSwitcher,
} from 'pages';
import { routes } from 'constants/routes';

const rootRoutes: RouteProps[] = [
  {
    path: routes.root().path,
    exact: false,
    component: ManagerSwitcher,
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
