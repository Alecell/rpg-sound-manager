import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';

import { RootPage } from 'pages';

const rootRoutes: RouteProps[] = [
  {
    path: '/',
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
