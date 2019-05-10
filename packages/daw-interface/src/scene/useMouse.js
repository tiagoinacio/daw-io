import { useState, useEffect } from 'react';
import * as THREE from 'three';

export default ({
  domElement,
  camera,
  objects,
  renderScene,
  zoom,
  zoomValueX,
  zoomValueY,
  ref,
  arrangement
}) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const [currentObject, setCurrentObject] = useState(null);
  const rect = domElement.getBoundingClientRect();
  const getMouse = event => {
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    return mouse;
  };

  const dragWaveform = ({ trackPC, mouseDifference }) => {
    currentObject.object.parent.position.x = trackPC.x + mouseDifference.x;
    // TODO snap to grid
    // currentObject.object.parent.position.y = trackPC.y + mouseDifference.y;
  };

  const updateWaveformsHeight = ({
    waveformsPC,
    waveforms,
    mouseDifference
  }) => {
    waveforms.forEach(waveform => {
      // TODO Divide by 2 to center the waveform
      const newY = waveformsPC[waveform.uuid].y + mouseDifference.y / 2;
      const oldY = waveform.position.y;
      const yDiff = oldY + newY;

      waveform.position.y = newY;
      // TODO 200 should be the default track height
      waveform.scale.set(1, yDiff / 200, 1);
    });
  };

  const dragTrackSeparator = ({
    mouseDifference,
    trackPC,
    waveformsPC,
    waveforms
  }) => {
    currentObject.object.parent.position.y = trackPC.y + mouseDifference.y;

    updateWaveformsHeight({
      mouseDifference,
      waveformsPC,
      waveforms
    });
  };

  const onMouseAction = event => {
    raycaster.setFromCamera(getMouse(event), camera);

    const intersects = raycaster.intersectObjects(objects, true);

    if (intersects[0] && currentObject !== intersects[0]) {
      domElement.style.cursor = 'pointer';
      setCurrentObject(intersects[0]);
    } else {
      domElement.style.cursor = 'default';
      setCurrentObject(null);
    }
  };

  const onMouseDown = event => {
    if (currentObject) {
      getMouse(event);
      const mousePC = { ...mouse };
      const trackPC = { ...currentObject.object.parent.position };
      const waveforms = objects
        .filter(
          object => object.trackId === currentObject.object.parent.trackId
        )
        .filter(object => object.name === 'waveform');
      const waveformsPC = waveforms.reduce(
        (acc, object) => ({
          ...acc,
          [object.uuid]: { ...object.position }
        }),
        {}
      );
      // TODO extract this logic since its the same as the useCamera
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;
      const defaultRight = (width / 2) * 10;
      const right = (defaultRight / zoom.horizontal.default) * zoomValueX;
      const left = width / -2 - arrangement.ticks;

      let onMouseUp, onMouseUpHandler;

      let onMouseMove = event => {
        const nextCoordinates = getMouse(event);
        const mouseDifference = {
          y: ((nextCoordinates.y - mousePC.y) / 2) * height,
          x: ((nextCoordinates.x - mousePC.x) * (right - left)) / 2
        };

        if (currentObject.object.parent.name === 'waveform') {
          // TODO rename trackPC to currentObject
          dragWaveform({
            trackPC,
            mouseDifference
          });
        } else if (currentObject.object.parent.name === 'separator') {
          dragTrackSeparator({
            mouseDifference,
            trackPC,
            waveformsPC,
            waveforms
          });
        }

        requestAnimationFrame(renderScene);

        if (!onMouseUp) {
          onMouseUp = () => {
            domElement.style.cursor = 'default';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('onMouseUp', onMouseUp);
            onMouseMove = null;
            onMouseUp = null;
            onMouseUpHandler = null;
          };
        }

        if (!onMouseUpHandler) {
          onMouseUpHandler = document.addEventListener(
            'mouseup',
            onMouseUp,
            false
          );
        }
      };

      document.addEventListener('mousemove', onMouseMove, false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown, false);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [currentObject]);

  return { onMouseMove: onMouseAction };
};
