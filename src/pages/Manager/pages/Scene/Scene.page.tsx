import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { UrlParams } from 'interfaces/urlParams';
import { SoundActions } from 'store/ducks/sounds/actions/actions';
import { MixActions } from 'store/ducks/mixes/actions/actions';

import Player from 'components/Player';
import MixPlayer from 'components/MixPlayer/MixPlayer';
import { useSceneGetById } from 'hooks/queries/scenes/useSceneGetById';
import { useSoundList } from 'hooks/queries/sound/useSoundList';
import { useMixList } from 'hooks/queries/mix/useMixList';
import DialogCreate from '../../components/dialogs/Create/Create';

const ScenePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();
  const currentScene = useSceneGetById(urlParams);
  const mixList = useMixList(urlParams);
  const soundList = useSoundList(urlParams);

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
        .keys(soundList.data)
        .map((key) => {
          const {
            id,
            url,
            name,
            config,
          } = soundList.data[key];

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
        .keys(mixList.data)
        .map((key) => {
          const id = mixList.data[key].id;

          return (
            <div key={id}>
              <button
                type="button"
                onClick={goToMixPage(id)}
              >
                { mixList.data[key].name }
              </button>
              <MixPlayer mixId={id} />
            </div>
          );
        })}
    </div>
  );

  return (
    <>
      <h1>
        Cena
        {' '}
        {currentScene.data.name}
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
