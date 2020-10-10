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

  const createSound = (name: string, file: File | undefined) => {
    dispatch(SoundActions.create.request({
      urlParams,
      soundName: name,
      soundFile: file as File,
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
    dispatch(SoundActions.list.request({ urlParams }));
    dispatch(MixActions.getById.request({ urlParams }));
    dispatch(SceneActions.getById.request({ urlParams }));
    dispatch(SessionActions.getById.request({ urlParams }));
    dispatch(CampaignActions.getById.request({ urlParams }));
  }, [dispatch, urlParams]);

  return (
    <>
      <h1>SOUND</h1>
      <button
        type="button"
        onClick={toggleCreateDialog(true)}
      >
        NOVO SOM
      </button>

      { renderButtons() }

      <DialogCreate
        withInput
        open={showCreateDialog}
        label="Nome do som"
        onClose={toggleCreateDialog(false)}
        onSubmit={createSound}
      />
    </>
  );
};

export default MixPage;
