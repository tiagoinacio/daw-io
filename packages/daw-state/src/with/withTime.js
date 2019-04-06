import { connect } from 'react-redux';
import timeActions from '../actions/time';
import {
  getBPM,
  getBar,
  getBeat,
  getDiv,
  getTick,
  getHorizontalZoom,
  getSignature
} from '../selectors/time';

const mapStateToProps = state => ({
  bpm: getBPM(state),
  bar: getBar(state),
  beat: getBeat(state),
  div: getDiv(state),
  tick: getTick(state),
  horizontalZoom: getHorizontalZoom(state),
  signature: getSignature(state)
});

export const withTime = connect(
  mapStateToProps,
  timeActions
);
