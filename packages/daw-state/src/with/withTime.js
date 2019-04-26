import { connect } from 'react-redux';
import timeActions from '../actions/time';
import {
  getBPM,
  getBars,
  getArrangement,
  getBeats,
  getDivs,
  getTicks,
  getSignature
} from '../selectors/time';

const mapStateToProps = state => ({
  bpm: getBPM(state),
  bars: getBars(state),
  beats: getBeats(state),
  divs: getDivs(state),
  ticks: getTicks(state),
  signature: getSignature(state),
  arrangement: getArrangement(state)
});

export const withTime = connect(
  mapStateToProps,
  timeActions
);
