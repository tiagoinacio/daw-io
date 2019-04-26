import { createAction } from 'redux-actions';
import { getAudioContext } from '../selectors/audio';
import { getTracks } from '../selectors/tracks';

const getFiles = event => {
  const items = event.dataTransfer.items;

  if (items) {
    return Object.keys(items)
      .filter((_, index) => items[index].kind === 'file')
      .map(index => items[index].getAsFile());
  }

  // Use DataTransfer interface to access the file(s)
  return event.dataTransfer.files;
};

export default {
  setAudioContext: createAction('SET_AUDIO_CONTEXT'),
  onDrop: event => async (dispatch, getState) => {
    event.stopPropagation();
    event.preventDefault();

    const audioContext = getAudioContext(getState());
    const files = getFiles(event);
    const fileReader = new FileReader();
    const tracks = getTracks(getState());

    if (!tracks.length) {
      dispatch({
        type: 'NEW_TRACK'
      });
    }

    fileReader.onload = async e => {
      const fileResult = e.target.result;

      await audioContext.decodeAudioData(fileResult, buffer => {
        dispatch({
          type: 'SET_AUDIO_BUFFER',
          payload: buffer
        });
      });
    };

    fileReader.onerror = error => {
      dispatch({
        type: 'SET_AUDIO_BUFFER_ERROR',
        payload: error
      });
    };

    fileReader.readAsArrayBuffer(files[0]);
  }
};
