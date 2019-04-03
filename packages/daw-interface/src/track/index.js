import React from 'react';
import { ListItem, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Waveform from '../waveform';
import useAudioRegionsLoader from './useAudioRegionsLoader';
import classnames from 'classnames';
import './styles.css';

export default props => {
  const {
    audioRegions,
    onDragOver,
    onDragEnter,
    onFileDrop,
    isLoading,
    onDone
  } = useAudioRegionsLoader(props.audioContext, props.isPlaying);

  return (
    <ListItem className={props.className}>
      <div className={classnames('select', { active: props.isActive })} />
      <div
        className="drag"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onFileDrop}
      >
        {audioRegions && (
          <Waveform
            buffer={audioRegions}
            key={0}
            color="cadetblue"
            onDone={onDone}
          />
        )}
        {isLoading && <CircularProgress />}

        <Typography className="name">Track {props.index}</Typography>
      </div>
    </ListItem>
  );
};
