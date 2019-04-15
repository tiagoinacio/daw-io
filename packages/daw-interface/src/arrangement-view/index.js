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
  // 90 bpms
  // 1 bar (1 bar = 4 beats)
  // 4 beats (1 beat = 4 divisions)
  // 16 division (1 division = 240 ticks)
  // 3840 ticks
  const bpmFactor = (90 * 294) / props.bpm;
  const ticks = bpmFactor;
  const divisions = ticks;
  const beats = divisions;
  const bar = 4 * beats;
  const resolution = bar * beats * divisions;
  const base = bpmFactor * zoomFactor;
  const scaleX = (
    props.zoom.horizontal.current / props.zoom.horizontal.default
  ).toFixed(2);
  const width = 10000 / scaleX;
  const style = {
    transform: `scaleX(
      ${scaleX}
    )`,
    width: `${width}px`,
    /* bar 3836 / 4 = 480 */
    /* beat 960 / 4 = 240 */
    /* division 480 / 4 = 120 */
    /* tick 240 / 4 = 60 */
    background: `
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent ${bar * scaleX - 1 / scaleX}px,
      var(--color-primary-main) ${bar * scaleX}px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent ${beats * scaleX - 1 / scaleX}px,
      var(--color-primary-dark) ${beats * scaleX}px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent ${divisions * scaleX - 1 / scaleX}px,
      var(--color-primary-dark-grey) ${divisions * scaleX}px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent ${ticks * scaleX - 1 / scaleX}px,
      var(--color-primary-grey) ${ticks * scaleX}px
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
    <div>
      <span className="marker" style={{ paddingLeft: currentTime }} />
      <div className={props.className} style={style}>
        {props.tracks.map((track, index) => (
          <Resizable
            key={index}
            enable={{
              bottom: true
            }}
            className="resizable"
            minHeight="50"
            defaultSize={{
              width: width * 7,
              height: 100
            }}
          >
            <Track
              backgroundColor="#2C3224"
              index={index}
              className="track"
              isPaused={props.isPaused}
              isPlaying={props.isPlaying}
              isStopped={props.isStopped}
              zoom={props.zoom}
              audioContext={props.audioContext}
            />
          </Resizable>
        ))}
      </div>
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
