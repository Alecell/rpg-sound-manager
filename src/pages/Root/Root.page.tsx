import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { RootState } from 'interfaces/rootState';
import { CampaignActions } from 'store/ducks/campaigns/actions';

import Header from 'components/Header';

import scss from './Root.module.scss';

const useRootStore = () => useSelector(
  (state: RootState) => ({
    campaigns: state.campaigns,
  }), shallowEqual,
);

const RootPage = () => {
  const dispatch = useDispatch();
  const store = useRootStore();

  useEffect(() => {
    dispatch(CampaignActions.loadList.request());
  }, [dispatch]);

  return (
    <div className={scss.mainWrap}>
      <Header />
      <main className={scss.containerMain}>
        {Object.keys(store.campaigns.data).map((key) => (
          <button
            type="button"
            key={store.campaigns.data[key].id}
            onClick={({ target, currentTarget }) => {
              console.log('clicou na: ', store.campaigns.data[key]);
            }}
          >
            { store.campaigns.data[key].name }
          </button>
        ))}
      </main>
    </div>
  );
};

export default RootPage;
