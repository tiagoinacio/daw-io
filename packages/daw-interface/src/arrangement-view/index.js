import React from 'react';
import Track from '../track';
import Resizable from 're-resizable';
import { AudioContextConsumer } from '../context/AudioContext';
import './styles.css';

export default props => (
  <AudioContextConsumer>
    {({ audioContext }) => (
      <div className={props.className}>
        <Resizable
          enable={{
            bottom: true
          }}
          minHeight="50"
          defaultSize={{
            height: 100
          }}
        >
          <Track
            backgroundColor="#2C3224"
            index="1"
            className="track"
            audioContext={audioContext}
            isPlaying={props.isPlaying}
          />
        </Resizable>
        <Resizable
          enable={{
            bottom: true
          }}
          minHeight="50"
          defaultSize={{
            height: 100
          }}
        >
          <Track
            backgroundColor="#2A5060"
            index="2"
            className="track"
            audioContext={audioContext}
            isPlaying={props.isPlaying}
          />
        </Resizable>
        <Resizable
          enable={{
            bottom: true
          }}
          minHeight="50"
          defaultSize={{
            height: 100
          }}
        >
          <Track
            isActive
            backgroundColor="#2A5060"
            index="3"
            className="track"
            audioContext={audioContext}
            isPlaying={props.isPlaying}
          />
        </Resizable>
        <Resizable
          enable={{
            bottom: true
          }}
          minHeight="50"
          defaultSize={{
            height: 100
          }}
        >
          <Track
            backgroundColor="#2A5060"
            index="4"
            className="track"
            audioContext={audioContext}
            isPlaying={props.isPlaying}
          />
        </Resizable>
      </div>
    )}
  </AudioContextConsumer>
);
