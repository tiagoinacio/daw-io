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
        zoom: {
          ...state.zoom,
          horizontal: {
            ...state.zoom.horizontal,
            current: action.payload
          }
        }
      })
    },
    {
      bpm: '90',
      signature: '4/4',
      bar: 1,
      beat: 1,
      div: 1,
      tick: 1,
      zoom: {
        horizontal: {
          default: 200,
          max: 1000,
          current: 200,
          min: 5,
          step: 1
        },
        vertical: {
          default: 50,
          max: 1000,
          current: 50,
          min: 5,
          step: 5
        }
      }
    }
  )
};
