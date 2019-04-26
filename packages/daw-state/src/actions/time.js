import { createAction } from 'redux-actions';

export default {
  setSignature: createAction('SET_SIGNATURE'),
  setBPM: createAction('SET_BPM'),
  setBar: createAction('SET_BAR'),
  setTick: createAction('SET_TICK'),
  setBeat: createAction('SET_BEAT'),
  setDiv: createAction('SET_DIV')
};
