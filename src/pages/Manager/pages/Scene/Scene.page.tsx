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

import Player from 'components/Player';
import DialogCreate from '../../components/dialogs/Create/Create';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    scenes: state.scenes.list.data,
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
      urlParams,
      soundName: name,
      soundFile: soundFile as File,
    }));
  };

  const createMix = (name: string) => {
    dispatch(MixActions.create.request({
      urlParams,
      mixName: name,
    }));
  };

  const renderButtonsSound = () => (
    <div>
      {Object
        .keys(store.sounds.list.data)
        .map((key) => {
          const {
            id,
            url,
            name,
            config,
          } = store.sounds.list.data[key];

          return (
            <Player
              key={id}
              id={id}
              url={url}
              name={name}
              config={config}
            />
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
    dispatch(MixActions.list.request({ urlParams }));
    dispatch(SoundActions.list.request({ urlParams }));
    dispatch(SceneActions.getById.request({ urlParams }));
    dispatch(SessionActions.getById.request({ urlParams }));
    dispatch(CampaignActions.getById.request({ urlParams }));
  }, [dispatch, urlParams]);

  return (
    <>
      <h1>
        Cena
        {' '}
        {store.scenes[urlParams.sceneId]?.name}
      </h1>
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
      <div>
        MIXES
        { renderButtonsMix() }
      </div>
      <div>
        SONS
        { renderButtonsSound() }
      </div>

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
