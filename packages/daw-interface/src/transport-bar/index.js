import React from 'react';
import { Icon } from '@daw/ui';
import './styles.css';

export default props => (
  <div className={props.className}>
    <ul className="group">
      <li className="item">
        <Icon id="fast-backwards" className="svg" />
      </li>
      <li className="item">
        <Icon id="backwards" className="svg" />
      </li>
      <li className="item">
        <Icon id="forward" className="svg" />
      </li>
      <li className="item">
        <Icon id="fast-forward" className="svg" />
      </li>
      <li className="item">
        <Icon id="record" className="svg" />
      </li>
      <li className="item">
        <Icon id="stop" className="svg" />
      </li>
      <li className="item">
        <Icon id={props.isPlaying ? 'pause' : 'play'} className="svg" />
      </li>
    </ul>
  </div>
);
