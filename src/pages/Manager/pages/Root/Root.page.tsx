import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { Campaign } from 'store/ducks/campaigns/types';
import { CampaignActions } from 'store/ducks/campaigns/actions';
import { routes } from 'constants/routes';

import DialogCreate from '../../components/dialogs/Create/Create';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    campaigns: state.campaigns,
  }), shallowEqual,
);

const RootPage = () => {
  const store = useRootStore();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleCreateDialog = (status: boolean) => () => {
    setShowCreateDialog(status);
  };

  const goToCampaignPage = (campaignId: UrlParams['campaignId']) => () => {
    history.push(routes.campaign(campaignId).path);
  };

  const createCampaign = (campaignName: Campaign['name']) => {
    dispatch(CampaignActions.create.request({ campaignName }));
  };

  const renderButtons = () => (
    <div>
      {
        Object
          .keys(store.campaigns.list.data)
          .map((key) => {
            const id = store.campaigns.list.data[key].id;

            return (
              <button
                key={id}
                type="button"
                onClick={goToCampaignPage(id)}
              >
                { store.campaigns.list.data[key].name }
              </button>
            );
          })
      }
    </div>
  );

  useEffect(() => {
    dispatch(CampaignActions.list.request());
  }, [dispatch]);

  return (
    <>
      <h1>PÀGINA INICIAL</h1>
      <button
        type="button"
        onClick={toggleCreateDialog(true)}
      >
        NOVA CAMPANHA
      </button>

      { renderButtons() }

      <DialogCreate
        label="Noma da campanha"
        open={showCreateDialog}
        onSubmit={createCampaign}
        onClose={toggleCreateDialog(false)}
      />
    </>
  );
};

export default RootPage;
