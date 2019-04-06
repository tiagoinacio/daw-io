import { createAction } from 'redux-actions';

export default {
  play: createAction('PLAY'),
  pause: createAction('PAUSE'),
  stop: createAction('STOP')
};
