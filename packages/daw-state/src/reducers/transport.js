import { handleActions } from 'redux-actions';

export default {
  transport: handleActions(
    {
      PLAY: () => ({
        isPaused: false,
        isPlaying: true,
        isStopped: false
      }),
      PAUSE: () => ({
        isPaused: true,
        isPlaying: false,
        isStopped: false
      }),
      STOP: () => ({
        isPaused: false,
        isPlaying: false,
        isStopped: true
      })
    },
    {
      isPlaying: false,
      isPaused: false,
      isStopped: true
    }
  )
};
