import React, { useEffect, memo } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Waveform from '../waveform';
import useAudioRegionsLoader from './useAudioRegionsLoader';
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

  let width = audioRegions && audioRegions.length / 100;

  if (width > 32767) {
    width = 32767;
  }
  console.log(audioRegions);
  return (
    <ListItem className={props.className}>
      {/* <div className={classnames('select', { active: props.isActive })} /> */}
      <div
        className="drag"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onFileDrop}
      >
        {audioRegions && (
          <div
            style={{
              height: '100%',
              display: 'flex',
              transform: 'scaleY(3)',
              transform: `scaleX(${props.zoom.horizontal.current /
                props.zoom.horizontal.default})`,
              transformOrigin: 'bottom left'
            }}
          >
            <Waveform
              width={width}
              buffer={audioRegions}
              color="cadetblue"
              onDone={onDone}
            />
          </div>
        )}
        {isLoading && <CircularProgress />}

        <Typography className="name">Track {props.index}</Typography>
      </div>
    </ListItem>
  );
};

export default memo(Track);
