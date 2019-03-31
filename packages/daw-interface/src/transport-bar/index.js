import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import './styles.css';

export default props => (
  <div className={classnames(props.className, 'group')}>
    <Button className="record icon" color="secondary">
      <Icon>fiber_manual_record</Icon>
    </Button>
    <Button className="icon">
      <Icon>stop</Icon>
    </Button>
    <Button className="icon">
      <Icon>{props.isPlaying ? 'pause' : 'play_arrow'}</Icon>
    </Button>
  </div>
);
