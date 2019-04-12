import { connect } from 'react-redux';
import trackActions from '../actions/tracks';
import { getTracks } from '../selectors/tracks';

const mapStateToProps = state => ({
  tracks: getTracks(state)
});

export const withTracks = connect(
  mapStateToProps,
  trackActions
);
