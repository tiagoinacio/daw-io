import { handleActions } from 'redux-actions';

export default {
  time: handleActions(
    {
      SET_BPM: (state, action) => ({
        ...state,
        bpm: action.payload
      }),
      SET_SIGNATURE: (state, action) => ({
        ...state,
        signature: action.payload
      }),
      SET_BAR: (state, action) => ({
        ...state,
        bar: action.payload
      }),
      SET_BEAT: (state, action) => ({
        ...state,
        beat: action.payload
      }),
      SET_DIV: (state, action) => ({
        ...state,
        div: action.payload
      }),
      SET_TICK: (state, action) => ({
        ...state,
        tick: action.payload
      }),
      SET_HORIZONTAL_ZOOM: (state, action) => ({
        ...state,
        horizontalZoom: action.payload
      })
    },
    {
      bpm: '90',
      signature: '4/4',
      bar: 1,
      beat: 1,
      div: 1,
      tick: 1,
      horizontalZoom: 200
    }
  )
};
