import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { SceneActions } from 'store/ducks/scenes/actions';
import { SessionActions } from 'store/ducks/sessions/actions';
import { CampaignActions } from 'store/ducks/campaigns/actions';

import DialogCreate from '../../components/dialogs/Create';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    scenes: state.scenes,
  }), shallowEqual,
);

const SessionPage = () => {
  const store = useRootStore();
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleCreateDialog = (status: boolean) => () => {
    setShowCreateDialog(status);
  };

  const goToScenePage = (sceneId: UrlParams['sceneId']) => () => {
    history.push(
      routes.campaign(urlParams.campaignId)
        .session(urlParams.sessionId)
        .scene(sceneId)
        .path,
    );
  };

  const createScene = (name: string) => {
    dispatch(SceneActions.create.request({
      urlParams,
      sceneName: name,
    }));
  };

  const renderButtons = () => (
    <div>
      {Object
        .keys(store.scenes.list.data)
        .map((key) => {
          const id = store.scenes.list.data[key].id;

          return (
            <button
              key={id}
              type="button"
              onClick={goToScenePage(id)}
            >
              { store.scenes.list.data[key].name }
            </button>
          );
        })}
    </div>
  );

  useEffect(() => {
    dispatch(SceneActions.list.request({ urlParams }));
    dispatch(SessionActions.getById.request({ urlParams }));
    dispatch(CampaignActions.getById.request({ urlParams }));
  }, [dispatch, urlParams, urlParams.campaignId, urlParams.sessionId]);

  return (
    <>
      <button
        type="button"
        onClick={toggleCreateDialog(true)}
      >
        NOVA CENA
      </button>

      { renderButtons() }

      <DialogCreate
        open={showCreateDialog}
        label="Nome da cena"
        onClose={toggleCreateDialog(false)}
        onSubmit={createScene}
      />
    </>
  );
};

export default SessionPage;
