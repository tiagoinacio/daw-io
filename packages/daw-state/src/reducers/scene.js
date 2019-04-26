import { handleActions } from 'redux-actions';
import * as THREE from 'three';

export default {
  scene: handleActions(
    {
      SET_CAMERA: (state, action) => ({
        ...state,
        camera: action.payload
      }),
      ADD_TO_SCENE: (state, action) => ({
        ...state,
        objects: [...state.objects, action.payload]
      }),
      ON_SCROLL: (state, action) => {
        const horizontal = Math.max(
          0,
          state.scroll.horizontal + action.payload.deltaX * 10
        );
        const vertical = Math.max(
          0,
          state.scroll.vertical + action.payload.deltaY * 10
        );

        return {
          ...state,
          scroll: {
            horizontal,
            vertical
          }
        };
      },
      ON_ZOOM: (state, action) => {
        const zoom = action.payload;
        const zoomBoundMax = Math.min(state.zoom.horizontal.max, zoom);
        const zoomBound = Math.max(zoomBoundMax, state.zoom.horizontal.min);

        return {
          ...state,
          zoom: {
            ...state.zoom,
            horizontal: {
              ...state.zoom.horizontal,
              current: zoomBound
            }
          }
        };
      }
    },
    {
      renderer: new THREE.WebGLRenderer({ antialias: true }),
      scene: new THREE.Scene(),
      raycaster: new THREE.Raycaster(),
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
