import { createAction } from 'redux-actions';

export default {
  newTrack: createAction('NEW_TRACK'),
  deleteTrack: createAction('DELETE_TRACK')
};
