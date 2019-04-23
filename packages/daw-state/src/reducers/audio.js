import { handleActions } from 'redux-actions';

export default {
  audio: handleActions(
    {
      SET_AUDIO_CONTEXT: (state, action) => ({
        ...state,
        context: action.payload,
        source: action.payload.createBufferSource()
      }),
      SET_AUDIO_BUFFER: (state, action) => ({
        ...state,
        buffer: [...state.buffer, action.payload]
      })
    },
    {
      buffer: [],
      context: null,
      source: null
    }
  )
};
