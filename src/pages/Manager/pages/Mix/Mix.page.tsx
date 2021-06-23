import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UrlParams } from 'interfaces/urlParams';
import { SoundActions } from 'store/ducks/sounds/actions/actions';

import Player from 'components/Player';
import { useMixGetById } from 'hooks/queries/mix/useMixGetById';
import { useSoundList } from 'hooks/queries/sound/useSoundList';
import DialogCreate from '../../components/dialogs/Create/Create';

const MixPage = () => {
  const dispatch = useDispatch();
  const urlParams = useParams<UrlParams>();
  const currentMix = useMixGetById(urlParams);
  const soundList = useSoundList(urlParams);

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleCreateDialog = (status: boolean) => () => {
    setShowCreateDialog(status);
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

  return (
    <>
      <h1>
        Mix
        {' '}
        {currentMix.data.name}
      </h1>
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
