import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { SessionActions } from 'store/ducks/sessions/actions';
import { CampaignActions } from 'store/ducks/campaigns/actions';

import DialogCreate from '../../components/dialogs/Create';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    sessions: state.sessions,
  }), shallowEqual,
);

const CampaignPage = () => {
  const store = useRootStore();
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();

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
          .keys(store.sessions.list.data)
          .map((key) => {
            const id = store.sessions.list.data[key].id;

            return (
              <button
                key={id}
                type="button"
                onClick={goToSessionPage(id)}
              >
                { store.sessions.list.data[key].name }
              </button>
            );
          })
      }
    </div>
  );

  useEffect(() => {
    dispatch(SessionActions.list.request({ urlParams }));
    dispatch(CampaignActions.getById.request({ urlParams }));
  }, [dispatch, urlParams, urlParams.campaignId]);

  return (
    <>
      <h1>SESSOES</h1>
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
