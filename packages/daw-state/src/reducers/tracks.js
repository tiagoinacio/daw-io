import { handleActions } from 'redux-actions';

export default {
  tracks: handleActions(
    {
      NEW_TRACK: (state, action) => [...state, action.payload],
      DELETE_TRACK: (state, action) =>
        state.filter(track => track !== action.payload)
    },
    []
  )
};
