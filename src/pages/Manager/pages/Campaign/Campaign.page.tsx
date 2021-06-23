import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { UrlParams } from 'interfaces/urlParams';
import { SessionActions } from 'store/ducks/sessions/actions/actions';

import { useSessionList } from 'hooks/queries/session/useSessionList';
import { useCampaignGetById } from 'hooks/queries/campaign/useCampaignGetById';
import DialogCreate from '../../components/dialogs/Create';

const CampaignPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();
  const sessionList = useSessionList(urlParams);
  const currentCampaign = useCampaignGetById(urlParams);

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleCreateDialog = (status: boolean) => () => {
    setShowCreateDialog(status);
  };

  const goToSessionPage = (sessionId: UrlParams['sessionId']) => () => {
    history.push(routes.campaign(urlParams.campaignId).session(sessionId).path);
  };

  const createSession = (name: string) => {
    dispatch(SessionActions.create.request({
      urlParams,
      sessionName: name,
    }));
  };

  const renderButtons = () => (
    <div>
      {
        Object
          .keys(sessionList.data)
          .map((key) => {
            const id = sessionList.data[key].id;

            return (
              <button
                key={id}
                type="button"
                onClick={goToSessionPage(id)}
              >
                { sessionList.data[key].name }
              </button>
            );
          })
      }
    </div>
  );

  return (
    <>
      <h1>
        Campanha
        {' '}
        {currentCampaign.data.name}
      </h1>
      <button
        type="button"
        onClick={toggleCreateDialog(true)}
      >
        NOVA SESSÃO
      </button>

      { renderButtons() }

      <DialogCreate
        open={showCreateDialog}
        label="Nome da sessão"
        onClose={toggleCreateDialog(false)}
        onSubmit={createSession}
      />
    </>
  );
};

export default CampaignPage;
