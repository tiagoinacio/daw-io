import React, { useEffect, memo } from 'react';
import Resizable from 're-resizable';
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
    onDone,
    onResizeStop
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
          <Resizable
            key={0}
            enable={{
              left: true,
              right: true
            }}
            onResizeStop={onResizeStop}
            style={{
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
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
          </Resizable>
        )}
        {isLoading && <CircularProgress />}

        <Typography className="name">Track {props.index}</Typography>
      </div>
    </ListItem>
  );
};

export default memo(Track);
