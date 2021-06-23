import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { UrlParams } from 'interfaces/urlParams';
import { SceneActions } from 'store/ducks/scenes/actions/actions';
import { useSessionGetById } from 'hooks/queries/session/useSessionGetById';
import { useSceneList } from 'hooks/queries/scenes/useSceneList';
import DialogCreate from '../../components/dialogs/Create';

const SessionPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();
  const sceneList = useSceneList(urlParams);
  const currentSession = useSessionGetById(urlParams);

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
        .keys(sceneList.data)
        .map((key) => {
          const id = sceneList.data[key].id;

          return (
            <button
              key={id}
              type="button"
              onClick={goToScenePage(id)}
            >
              { sceneList.data[key].name }
            </button>
          );
        })}
    </div>
  );

  return (
    <>
      <h1>
        Sessão
        {' '}
        {currentSession.data.name}
      </h1>
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
