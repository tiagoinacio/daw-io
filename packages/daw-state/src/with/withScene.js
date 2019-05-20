import { connect } from 'react-redux';
import sceneActions from '../actions/scene';
import {
  getScene,
  getCamera,
  getRenderer,
  getZoom,
  getObjects,
  getLayout,
  getRaycaster,
  getRaycasterObjects,
  getScroll
} from '../selectors/scene';

const mapStateToProps = state => ({
  scene: getScene(state),
  raycaster: getRaycaster(state),
  camera: getCamera(state),
  renderer: getRenderer(state),
  zoom: getZoom(state),
  layout: getLayout(state),
  scroll: getScroll(state),
  objects: getObjects(state),
  raycasterObjects: getRaycasterObjects(state)
});

export const withScene = connect(
  mapStateToProps,
  sceneActions
);
