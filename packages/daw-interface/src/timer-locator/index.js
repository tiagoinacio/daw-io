import React from 'react';
import { TextField, Grid, MenuItem } from '@material-ui/core';
import { withTime } from '@daw/state';
import './styles.css';

const signatures = ['4/4', '2/2', '2/4', '3/4', '3/8', '6/8', '9/8', '12/8'];

export default withTime(props => (
  <div className="timer-locator">
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            <TextField
              className="input"
              value={props.bpm}
              onChange={event => props.setBPM(event.target.value)}
              type="number"
            />
          </Grid>
          <Grid item className="key">
            BPM
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            <TextField
              select
              className="signature"
              value={props.signature}
              onChange={event => props.setSignature(event.target.value)}
            >
              {signatures.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item className="key">
            sig
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            <TextField
              className="input"
              value={props.bar}
              onChange={event => props.setBar(event.target.value)}
              type="number"
            />
          </Grid>
          <Grid item className="key">
            bar
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            <TextField
              className="input"
              value={props.beat}
              onChange={event => props.setBeat(event.target.value)}
              type="number"
            />
          </Grid>
          <Grid item className="key">
            beat
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            <TextField
              className="input"
              value={props.div}
              onChange={event => props.setDiv(event.target.value)}
              type="number"
            />
          </Grid>
          <Grid item className="key">
            div
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column">
          <Grid item className="value">
            <TextField
              className="input"
              value={props.tick}
              onChange={event => props.setTick(event.target.value)}
              type="number"
            />
          </Grid>
          <Grid item className="key">
            tick
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
));
