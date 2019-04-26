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
    onPlayPause
  } = useAudioRegionsLoader({
    audioContext: props.audioContext,
    isPlaying: props.isPlaying,
    isStopped: props.isStopped
  });
  const [dragPosition, setDragPosition] = useState(0);
  const onDragStop = event => {
    setDragPosition(event.offsetX);
  };

  useEffect(onPlayPause, [props.isPlaying]);
  useEffect(() => {
    if (audioRegions) {
      props.setAudioRegions(audioRegions.buffer, {
        start: 0,
        end: audioRegions.length - 1
      });
    }
  }, [audioRegions]);

  // const pointsPerBar = 29529.3;

  const onResizeStop = (e, direction, ref, d) => {
    props.setAudioRegions(audioRegions.buffer, {
      start: audioRegions.start + d.width * 100
    });
  };

  let width = audioRegions && audioRegions.length / 100;

  if (width > 32767) {
    throw new Error(`Audio buffer size exceeded the 32767 limit`);
  }

  return (
    <ListItem className={props.className}>
      {/* <div className={classnames('select', { active: props.isActive })} /> */}
      <div
        className="drag"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onFileDrop}
        style={{
          transformOrigin: 'left',
          transform: `scaleX(${props.zoom.horizontal.derived})`
        }}
      >
        {audioRegions && (
          <Draggable
            bounds={{
              left: 0
            }}
            axis="x"
            handle=".resize"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            scale={Number(props.zoom.horizontal.derived)}
            defaultClassName="draggable"
            onStop={onDragStop}
          >
            <div>
              <div className="waveform">
                <Resizable
                  onResizeStop={onResizeStop}
                  key={0}
                  enable={{
                    right: true
                  }}
                  resizeRatio={1 / props.zoom.horizontal.derived}
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
                >
                  <Waveform
                    height={100}
                    end={100}
                    width={width}
                    channelData={audioRegions.getChannelData(0)}
                    color="cadetblue"
                  />
                </Resizable>
                <Resizable
                  key={2}
                  enable={{
                    left: true
                  }}
                  minWidth={1}
                  className="resizable-div-right"
                >
                  <div />
                </Resizable>
              </div>
            </div>
          </Draggable>
        )}
        {/* {isLoading && <CircularProgress />} */}
      </div>
    </ListItem>
  );
};

export default memo(Track);
