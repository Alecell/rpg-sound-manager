import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UrlParams } from 'interfaces/urlParams';
import { Campaign } from 'store/ducks/campaigns/types';
import { CampaignActions } from 'store/ducks/campaigns/actions/actions';
import { routes } from 'constants/routes';

import { useCampaignList } from 'hooks/queries/campaign/useCampaignList';
import DialogCreate from '../../components/dialogs/Create/Create';

const RootPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const campaignList = useCampaignList();

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
          .keys(campaignList.data)
          .map((key) => {
            const id = campaignList.data[key].id;

            return (
              <button
                key={id}
                type="button"
                onClick={goToCampaignPage(id)}
              >
                { campaignList.data[key].name }
              </button>
            );
          })
      }
    </div>
  );

  return (
    <>
      <h1>CAMPANHAS</h1>
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
