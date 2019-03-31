import React from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.css';

export default () => (
  <div className="timer-locator">
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            90
          </Grid>
          <Grid item className="key">
            BPM
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            4/4
          </Grid>
          <Grid item className="key">
            sig
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            4
          </Grid>
          <Grid item className="key">
            bar
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            12
          </Grid>
          <Grid item className="key">
            beat
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            12
          </Grid>
          <Grid item className="key">
            div
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            12
          </Grid>
          <Grid item className="key">
            tick
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);
