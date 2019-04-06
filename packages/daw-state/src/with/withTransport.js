import { connect } from 'react-redux';
import transportActions from '../actions/transport';
import { isPlaying, isStopped, isPaused } from '../selectors/transport';

const mapStateToProps = state => ({
  isPlaying: isPlaying(state),
  isPaused: isPaused(state),
  isStopped: isStopped(state)
});

export const withTransport = connect(
  mapStateToProps,
  transportActions
);
