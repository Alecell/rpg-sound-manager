import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { routes } from 'constants/routes';
import { RootState } from 'interfaces/rootState';
import { IUrlParams } from 'interfaces/urlParams';
import { SessionActions } from 'store/ducks/sessions/actions';

import Header from 'components/Header';
import DialogCreateCampaign from './components/dialogs/createSession/createSession';

import scss from './Campaign.module.scss';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    sessions: state.sessions,
  }), shallowEqual,
);

const CampaignPage = () => {
  const store = useRootStore();
  const history = useHistory();
  const urlParams = useParams<IUrlParams>();
  const dispatch = useDispatch();

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleCreateDialog = (status: boolean) => () => {
    setShowCreateDialog(status);
  };

  const goToSessionPage = (sessionId: IUrlParams['sessionId']) => () => {
    history.push(routes.campaign(urlParams.campaignId).session(sessionId).exec());
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
    dispatch(SessionActions.list.request(urlParams.campaignId));
  }, [dispatch, urlParams.campaignId]);

  return (
    <div className={scss.mainWrap}>
      <Header />
      <main className={scss.containerMain}>
        <button
          type="button"
          onClick={toggleCreateDialog(true)}
        >
          NOVA SESSÃO
        </button>
        { renderButtons() }
      </main>
      <DialogCreateCampaign
        open={showCreateDialog}
        onClose={toggleCreateDialog(false)}
      />
    </div>
  );
};

export default CampaignPage;
