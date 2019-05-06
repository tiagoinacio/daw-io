import { useState, useEffect } from 'react';
import * as THREE from 'three';

export default ({
  domElement,
  camera,
  objects,
  renderScene,
  zoomValueX,
  zoomValueY
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

      let onMouseMove = event => {
        if (currentObject) {
          const previousCoordinates = { ...mouse };
          const nextCoordinates = getMouse(event);
          const differenceOnXAxis = nextCoordinates.x - previousCoordinates.x;
          const differenceOnYAxis = nextCoordinates.y - previousCoordinates.y;
          // differenceOnXAxis is too small so we multiply by this constant
          const incrementConstantX = zoomValueX * 100;
          const incrementConstantY = (zoomValueY / 100) * 3;

          currentObject.object.parent.position.x =
            currentObject.object.parent.position.x +
            differenceOnXAxis * incrementConstantX;
          currentObject.object.parent.position.y =
            currentObject.object.parent.position.y +
            differenceOnYAxis * incrementConstantY;

          requestAnimationFrame(renderScene);
        }

        let onMouseUp = () => {
          domElement.style.cursor = 'default';
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('onMouseUp', onMouseUp);
          onMouseMove = null;
          onMouseUp = null;
        };

        document.addEventListener('mouseup', onMouseUp, false);
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
