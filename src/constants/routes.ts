import { Route } from 'smart-routes';

const routes = {
  root: new Route('/'),
  campaign: new Route('/campaign', ':campaignId', {
    session: new Route('/session', ':sessionId', {
      scene: new Route('/scene', ':sceneId', {
        mix: new Route('/mix', ':mixId'),
      }),
    }),
  }),
};

export {
  routes,
};
