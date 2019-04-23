import { connect } from 'react-redux';
import audioActions from '../actions/audio';
import { getAudioContext, getAudioBuffer } from '../selectors/audio';

const mapStateToProps = state => ({
  audioContext: getAudioContext(state),
  audioBuffer: getAudioBuffer(state)
});

export const withAudio = connect(
  mapStateToProps,
  audioActions
);
