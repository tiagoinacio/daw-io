import { useState, useEffect } from 'react';
import * as THREE from 'three';

export default ({ ref, zoom, arrangement }) => {
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    const defaultRight = (width / 2) * 10;
    const left = width / -2 - arrangement.ticks;
    const right =
      (defaultRight / zoom.horizontal.default) * zoom.horizontal.current;
    const camera = new THREE.OrthographicCamera(
      left,
      right,
      0,
      -height,
      1,
      5000
    );

    camera.position.set(ref.current.clientWidth / 2, 0, 1);

    camera.updateProjectionMatrix();

    setCamera(camera);
  }, []);

  return camera;
};
