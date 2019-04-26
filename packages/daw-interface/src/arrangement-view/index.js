import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withAudio, withTime, withTransport, withTracks } from '@daw/state';
import Scene from '../scene';
import './styles.css';

const ArrangementView = props => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (props.isPlaying) {
      setCurrentTime(currentTime + 0.009 * 4);
    } else if (props.isStopped) {
      setCurrentTime(0);
    }
  }, [props.isPlaying, props.isStopped, currentTime]);

  return (
    <div style={{ height: '100%' }}>
      {/* <span className="marker" style={{ paddingLeft: currentTime }} /> */}
      <Scene
        tracks={props.tracks}
        audioContext={props.audioContext}
        audioBuffer={props.audioBuffer}
      />
    </div>
  );
};

export default compose(
  withTime,
  withTransport,
  withAudio,
  withTracks
)(ArrangementView);
