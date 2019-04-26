import { handleActions } from 'redux-actions';

const defaultBpm = 90;

export default {
  time: handleActions(
    {
      SET_BPM: (state, action) => ({
        ...state,
        current: {
          ...state.current,
          bpm: action.payload
        },
        arrangement: {
          ...state.arrangement,
          ticks:
            (state.arrangement.secondsPerMinutes / action.payload) *
            state.arrangement.sampleRate,
          width:
            (state.arrangement.secondsPerMinutes / action.payload) *
            state.arrangement.sampleRate *
            state.arrangement.beats *
            state.arrangement.bars // bars * ticks * division
        }
      }),
      SET_SIGNATURE: (state, action) => ({
        ...state,
        current: {
          ...state.current,
          signature: action.payload
        }
      }),
      SET_BAR: (state, action) => ({
        ...state,
        current: {
          ...state.current,
          bar: action.payload
        }
      }),
      SET_BEAT: (state, action) => ({
        ...state,
        current: {
          ...state.current,
          beat: action.payload
        }
      }),
      SET_DIV: (state, action) => ({
        ...state,
        current: {
          ...state.current,
          div: action.payload
        }
      }),
      SET_TICK: (state, action) => ({
        ...state,
        current: {
          ...state.current,
          tick: action.payload
        }
      })
    },
    {
      current: {
        bpm: defaultBpm,
        signature: '4/4',
        bars: 1,
        beats: 1,
        divs: 1,
        ticks: 1
      },
      arrangement: {
        ticks: (60 / defaultBpm) * 44100, //960 * 8, // in 1 division
        width: (60 / defaultBpm) * 44100 * 4 * 100, // bars * ticks * division
        divs: 4, // 4 divisions per beat = 240 ticks * 4 = 960 ticks
        beats: 4, // in 1 bar
        bars: 100,
        sampleRate: 44100,
        secondsPerMinutes: 60
      }
    }
  )
};
