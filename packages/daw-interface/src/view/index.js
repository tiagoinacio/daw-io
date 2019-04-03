import React from 'react';
import ArrangementView from '../arrangement-view';
import Sidebar from '../sidebar';
import { Grid } from '@material-ui/core';
import './styles.css';

export default props => (
  <Grid className={props.className} container spacing={16}>
    <Grid item sm={12} className="markers">
      Markers
    </Grid>
    <Grid item sm={2} className="grid">
      <Sidebar className="sidebar" />
    </Grid>
    <Grid item sm={10} className="grid">
      <ArrangementView
        className="arrangementView"
        isPlaying={props.isPlaying}
      />
    </Grid>
  </Grid>
);
