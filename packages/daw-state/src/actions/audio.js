import { createAction } from 'redux-actions';

export default {
  setAudioContext: createAction('SET_AUDIO_CONTEXT'),
  setAudioRegions: createAction('SET_AUDIO_BUFFER')
};
