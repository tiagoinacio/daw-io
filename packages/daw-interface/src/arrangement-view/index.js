import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import Track from '../track';
import Resizable from 're-resizable';
import { withAudio, withTime, withTransport, withTracks } from '@daw/state';
import Slider from '@material-ui/lab/Slider';
import './styles.css';

const ArrangementView = props => {
  const [currentTime, setCurrentTime] = useState(0);
  const zoomFactor =
    props.zoom.horizontal.current / props.zoom.horizontal.default;
  const bpmFactor = (30 * 327) / props.bpm;
  const base = bpmFactor * zoomFactor;
  const style = {
    background: `
      repeating-linear-gradient(
        90deg,
        var(--color-primary-light-grey) 0px,
        var(--color-primary-light-grey) ${base - 1}px,
        var(--color-primary-dark-grey) ${base}px
      )`
  };

  useEffect(() => {
    if (props.isPlaying) {
      setCurrentTime(currentTime + 0.009 * 4);
    } else if (props.isStopped) {
      setCurrentTime(0);
    }
  }, [props.isPlaying, props.isStopped, currentTime]);

  return (
    <div className={props.className} style={style}>
      <span className="marker" style={{ paddingLeft: currentTime }} />

      {props.tracks.map((track, index) => (
        <Resizable
          key={index}
          enable={{
            bottom: true
          }}
          className="resizable"
          minHeight="50"
          defaultSize={{
            height: 100
          }}
        >
          <Track
            backgroundColor="#2C3224"
            index={index}
            className="track"
            isPaused={props.isPaused}
            isPlaying={props.isStopped}
            zoom={props.zoom}
            audioContext={props.audioContext}
          />
        </Resizable>
      ))}

      <div className="horizontal-zoom">
        <Slider
          value={props.zoom.horizontal.current}
          min={props.zoom.horizontal.min}
          max={props.zoom.horizontal.max}
          step={props.zoom.horizontal.step}
          aria-labelledby="label"
          onChange={(_, value) => props.setHorizontalZoom(value)}
        />
      </div>
    </div>
  );
};

export default compose(
  withTime,
  withTransport,
  withAudio,
  withTracks
)(ArrangementView);
