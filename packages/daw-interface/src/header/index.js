import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MainNavigation from '../main-navigation';
import TransportBar from '../transport-bar';
import TimerLocator from '../timer-locator';
import ProjectName from '../project-name';
import { AudioContextConsumer } from '../context/AudioContext';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import './styles.css';

export default props => (
  <AppBar
    position="fixed"
    className={classnames(props.className, 'header')}
    color="secondary"
  >
    <ProjectName />
    <AudioContextConsumer>
      {({ audioContext }) => (
        <Grid container spacing={24} className="align-center">
          <Grid item sm>
            <Grid container spacing={8}>
              <Grid item sm={9}>
                <MainNavigation />
              </Grid>
              <Grid item sm={2} className="align-center">
                <TransportBar className="transportBar" onPlay={props.onPlay} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3}>
            <TimerLocator audioContext={audioContext} />
          </Grid>
          <Grid item sm />
        </Grid>
      )}
    </AudioContextConsumer>
  </AppBar>
);
