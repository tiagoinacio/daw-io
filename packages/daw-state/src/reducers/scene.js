import { handleActions } from 'redux-actions';
import * as THREE from 'three';

export default {
  scene: handleActions(
    {
      SET_CAMERA: (state, action) => ({
        ...state,
        camera: action.payload
      }),
      ADD_TO_RAYCASTER: (state, action) => ({
        ...state,
        raycasterObjects: [...state.raycasterObjects, action.payload]
      }),
      ADD_TO_SCENE: (state, action) => ({
        ...state,
        objects: [...state.objects, action.payload].sort((a, b) => {
          if (a.trackId < b.trackId) {
            return a;
          }

          if (a.trackId > b.trackId) {
            return b;
          }

          return a.position.x < b.position.x ? a : b;
        })
      })
    },
    {
      renderer: new THREE.WebGLRenderer({ antialias: true }),
      scene: new THREE.Scene(),
      raycaster: new THREE.Raycaster(),
      raycasterObjects: [],
      objects: [],
      camera: null,
      layout: {
        trackHeight: 200,
        tickHeight: 1000 // TODO update with clients height
      },
      zoom: {
        horizontal: {
          default: 20,
          max: 20000,
          current: 10000,
          min: 1,
          step: 1
        },
        vertical: {
          default: 5000,
          max: 20000,
          current: 10000,
          min: 3000,
          step: 1
        }
      },
      scroll: {
        horizontal: 0,
        vertical: 0
      }
    }
  )
};
