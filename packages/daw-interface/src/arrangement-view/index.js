import React from 'react';
import Track from '../track';
import Resizable from 're-resizable';
import './styles.css';

export default props => (
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
      <Track backgroundColor="#2C3224" index="1" className="track" />
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
      <Track backgroundColor="#2A5060" index="2" className="track" />
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
      <Track isActive backgroundColor="#2A5060" index="3" className="track" />
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
      <Track backgroundColor="#2A5060" index="4" className="track" />
    </Resizable>
  </div>
);
