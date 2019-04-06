import { handleActions } from 'redux-actions';

export default {
  audio: handleActions(
    {
      SET_AUDIO_CONTEXT: (state, action) => ({
        ...state,
        context: action.payload,
        source: action.payload.createBufferSource()
      })
    },
    {
      context: null,
      source: null
    }
  )
};
