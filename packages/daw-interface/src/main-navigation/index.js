import React from 'react';
import { Button } from '@daw/ui';
import './styles.css';

export default props => (
  <nav className={props.className}>
    <ul className="list">
      <li>
        <Button className="button">Arrangement</Button>
      </li>
      <li>
        <Button className="button">Session</Button>
      </li>
      <li>
        <Button className="button">Sampler</Button>
      </li>
      <li>
        <Button className="button">Step Sequencer</Button>
      </li>
      <li>
        <Button className="button">Grid Editor</Button>
      </li>
      <li>
        <Button className="button">Audio Region</Button>
      </li>
      <li>
        <Button className="button">Mixer</Button>
      </li>
    </ul>
  </nav>
);
