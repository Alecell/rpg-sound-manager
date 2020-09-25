import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { SceneActions } from 'store/ducks/scenes/actions';
import { SoundActions } from 'store/ducks/sounds/actions';
import { SessionActions } from 'store/ducks/sessions/actions';
import { MixActions } from 'store/ducks/mixes/actions/actions';
import { CampaignActions } from 'store/ducks/campaigns/actions';

import DialogCreate from '../../components/dialogs/Create/Create';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    sounds: state.sounds,
  }), shallowEqual,
);

const MixPage = () => {
  const store = useRootStore();
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleCreateDialog = (status: boolean) => () => {
    setShowCreateDialog(status);
  };

  const goToMixPage = (sceneId: UrlParams['sceneId']) => () => {
    history.push(
      routes.campaign(urlParams.campaignId)
        .session(urlParams.sessionId)
        .scene(sceneId)
        .path,
    );
  };

  const createSound = (name: string) => {
    dispatch(SoundActions.create.request({
      campaignId: urlParams.campaignId,
      sessionId: urlParams.sessionId,
      sceneId: urlParams.sceneId,
      soundName: name,
    }));
  };

  const renderButtons = () => (
    <div>
      {Object
        .keys(store.sounds.list.data)
        .map((key) => {
          const id = store.sounds.list.data[key].id;

          return (
            <button
              key={id}
              type="button"
              onClick={goToMixPage(id)}
            >
              { store.sounds.list.data[key].name }
            </button>
          );
        })}
    </div>
  );

  useEffect(() => {
    dispatch(MixActions.getById.request({
      campaignId: urlParams.campaignId,
      sessionId: urlParams.sessionId,
      sceneId: urlParams.sceneId,
      mixId: urlParams.mixId,
    }));
    dispatch(SceneActions.getById.request({
      campaignId: urlParams.campaignId,
      sessionId: urlParams.sessionId,
      sceneId: urlParams.sceneId,
    }));
    dispatch(SessionActions.getById.request({
      campaignId: urlParams.campaignId,
      sessionId: urlParams.sessionId,
    }));
    dispatch(CampaignActions.getById.request({ campaignId: urlParams.campaignId }));
  }, [dispatch, urlParams.campaignId, urlParams.mixId, urlParams.sceneId, urlParams.sessionId]);

  return (
    <>
      <button
        type="button"
        onClick={toggleCreateDialog(true)}
      >
        NOVO SOM
      </button>

      { renderButtons() }

      <DialogCreate
        open={showCreateDialog}
        label="Nome do som"
        onClose={toggleCreateDialog(false)}
        onSubmit={createSound}
      />
    </>
  );
};

export default MixPage;
