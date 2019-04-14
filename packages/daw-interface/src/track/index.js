import React, { useEffect, memo, useState } from 'react';
import Resizable from 're-resizable';
import Draggable from 'react-draggable';
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
  const [dragPosition, setDragPosition] = useState(0);

  const onDragStop = event => {
    console.log(event);
    setDragPosition(event.offsetX);
  };

  let width = (audioRegions && audioRegions.length / 100) || 0;

  if (width > 32767) {
    width = 32767;
  }

  useEffect(onPlayPause, [props.isPlaying]);

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
          <Draggable
            axis="x"
            handle=".resize"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            scale={1}
            onStop={onDragStop}
          >
            <div className="waveform">
              <Resizable
                key={0}
                enable={{
                  right: true
                }}
                minWidth={1}
                className="resizable-div-left"
              >
                <div />
              </Resizable>
              <Resizable
                key={1}
                enable={{
                  left: false
                }}
                className="resize"
                maxWidth={width}
                minWidth={1}
                style={{
                  left:
                    dragPosition *
                      (props.zoom.horizontal.current /
                        props.zoom.horizontal.default) -
                    dragPosition,
                  transform: `scaleX(${props.zoom.horizontal.current /
                    props.zoom.horizontal.default})`
                }}
              >
                <Waveform
                  width={width}
                  buffer={audioRegions}
                  color="cadetblue"
                  onDone={onDone}
                />
              </Resizable>
              <Resizable
                key={2}
                style={{
                  transform: `translateX(${(props.zoom.horizontal.current /
                    props.zoom.horizontal.default) *
                    width -
                    width}px`
                }}
                enable={{
                  left: true
                }}
                minWidth={1}
                className="resizable-div-right"
              >
                <div />
              </Resizable>
            </div>
          </Draggable>
        )}
        {isLoading && <CircularProgress />}

        <Typography className="name">Track {props.index}</Typography>
      </div>
    </ListItem>
  );
};

export default memo(Track);
