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
    mixes: state.mixes,
  }), shallowEqual,
);

const ScenePage = () => {
  const store = useRootStore();
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();

  const [showCreateMixDialog, setShowCreateMixDialog] = useState(false);
  const [showCreateSoundDialog, setShowCreateSoundDialog] = useState(false);

  const toggleCreateDialog = (status: boolean, kind: 'mix' | 'sound') => () => {
    if (kind === 'mix') setShowCreateMixDialog(status);
    else setShowCreateSoundDialog(status);
  };

  const goToMixPage = (mixId: UrlParams['mixId']) => () => {
    history.push(
      routes.campaign(urlParams.campaignId)
        .session(urlParams.sessionId)
        .scene(urlParams.sceneId)
        .mix(mixId)
        .path,
    );
  };

  const createSound = (name: string, soundFile: File | undefined) => {
    dispatch(SoundActions.create.request({
      url: urlParams,
      soundName: name,
      soundFile: soundFile as File,
    }));
  };

  const createMix = (name: string) => {
    dispatch(MixActions.create.request({
      campaignId: urlParams.campaignId,
      sessionId: urlParams.sessionId,
      sceneId: urlParams.sceneId,
      mixName: name,
    }));
  };

  const renderButtonsSound = () => (
    <div>
      {Object
        .keys(store.sounds.list.data)
        .map((key) => {
          const id = store.sounds.list.data[key].id;

          return (
            <button
              key={id}
              type="button"
            >
              { store.sounds.list.data[key].name }
            </button>
          );
        })}
    </div>
  );

  const renderButtonsMix = () => (
    <div>
      {Object
        .keys(store.mixes.list.data)
        .map((key) => {
          const id = store.mixes.list.data[key].id;

          return (
            <button
              key={id}
              type="button"
              onClick={goToMixPage(id)}
            >
              { store.mixes.list.data[key].name }
            </button>
          );
        })}
    </div>
  );

  useEffect(() => {
    dispatch(MixActions.list.request({
      campaignId: urlParams.campaignId,
      sessionId: urlParams.sessionId,
      sceneId: urlParams.sceneId,
    }));
    dispatch(SoundActions.list.request({ urlParams }));
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
  }, [
    dispatch,
    urlParams,
    urlParams.campaignId,
    urlParams.mixId,
    urlParams.sceneId,
    urlParams.sessionId,
  ]);

  return (
    <>
      <button
        type="button"
        onClick={toggleCreateDialog(true, 'sound')}
      >
        NOVO SOM
      </button>
      <button
        type="button"
        onClick={toggleCreateDialog(true, 'mix')}
      >
        NOVO MIX
      </button>

      { renderButtonsMix() }
      { renderButtonsSound() }

      <DialogCreate
        withInput
        open={showCreateSoundDialog}
        label="Nome do som"
        onClose={toggleCreateDialog(false, 'sound')}
        onSubmit={createSound}
      />
      <DialogCreate
        open={showCreateMixDialog}
        label="Nome do mix"
        onClose={toggleCreateDialog(false, 'mix')}
        onSubmit={createMix}
      />
    </>
  );
};

export default ScenePage;
