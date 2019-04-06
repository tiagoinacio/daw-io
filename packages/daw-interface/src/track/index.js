import React, { useEffect } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Waveform from '../waveform';
import useAudioRegionsLoader from './useAudioRegionsLoader';
import classnames from 'classnames';
import './styles.css';

const Track = props => {
  const {
    audioRegions,
    onDragOver,
    onDragEnter,
    onFileDrop,
    isLoading,
    onPlayPause,
    onDone
  } = useAudioRegionsLoader({
    audioContext: props.audioContext,
    isPlaying: props.isPlaying,
    isStopped: props.isStopped
  });

  useEffect(onPlayPause, [props.isPlaying]);

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
            horizontalZoom={props.horizontalZoom}
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

export default Track;
