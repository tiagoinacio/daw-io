import { connect } from 'react-redux';
import { setAudioContext } from '../actions/audio';
import { getAudioContext } from '../selectors/audio';

const mapDispatchToProps = dispatch => ({
  setAudioContext: context => dispatch(setAudioContext(context))
});

const mapStateToProps = state => ({
  audioContext: getAudioContext(state)
});

export const withAudio = connect(
  mapStateToProps,
  mapDispatchToProps
);
