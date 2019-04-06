import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withTransport } from '@daw/state';
import classnames from 'classnames';
import './styles.css';

export default withTransport(props => (
  <div className={classnames(props.className, 'group')}>
    <Button className="record icon" color="secondary">
      <Icon>fiber_manual_record</Icon>
    </Button>
    <Button className="icon" onClick={props.stop}>
      <Icon>stop</Icon>
    </Button>
    {props.isPlaying ? (
      <Button className="icon" onClick={props.pause}>
        <Icon>pause</Icon>
      </Button>
    ) : (
      <Button className="icon" onClick={props.play}>
        <Icon>play_arrow</Icon>
      </Button>
    )}
  </div>
));
