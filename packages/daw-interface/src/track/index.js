import React from 'react';
import { ListItem, Typography } from '@material-ui/core';
import classnames from 'classnames';
import './styles.css';

export default props => (
  <ListItem className={props.className}>
    <div className={classnames('select', { active: props.isActive })} />
    <Typography className="name">Track {props.index}</Typography>
  </ListItem>
);
