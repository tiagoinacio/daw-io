import { useState, useEffect } from 'react';
import * as THREE from 'three';

export default ({ ref, zoom, arrangement }) => {
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    const defaultRight = (width / 2) * 10;
    const right =
      (defaultRight / zoom.horizontal.default) * zoom.horizontal.current;
    const camera = new THREE.OrthographicCamera(
      width / -2 - arrangement.ticks,
      right,
      0,
      -height,
      1,
      5000
    );

    setCamera(camera);
  }, []);

  return camera;
};
