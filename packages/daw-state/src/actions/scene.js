import { createAction } from 'redux-actions';

const addToScene = object => (dispatch, getState) => {
  const state = getState();

  state.scene.scene.add(object);

  dispatch({
    type: 'ADD_TO_SCENE',
    payload: object
  });
};

export default {
  setCamera: createAction('SET_CAMERA'),
  setHorizontalZoom: createAction('SET_HORIZONTAL_ZOOM'),
  onZoom: createAction('ON_ZOOM'),
  onScroll: createAction('ON_SCROLL'),
  addToScene,
  addToRaycaster: createAction('ADD_TO_RAYCASTER')
};
