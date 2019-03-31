import React, { Fragment } from 'react';
import Track from '../track';
import './styles.css';

export default props => (
  <div className={props.className}>
    <Track backgroundColor="#2C3224" index="1" className="track" />
    <Track backgroundColor="#2A5060" index="2" className="track" />
    <Track isActive backgroundColor="#2A5060" index="3" className="track" />
    <Track backgroundColor="#2A5060" index="4" className="track" />
  </div>
);
