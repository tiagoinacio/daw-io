import { useState, useEffect } from 'react';

export default ({ zoom, camera, ref }) => {
  const [defaultBottom, setDefaultBottom] = useState(0);
  let [zoomValueX, setZoomX] = useState(zoom.horizontal.current);
  const [zoomValueY, setZoomY] = useState(zoom.vertical.current);

  const onZoomX = event => {
    const defaultRight = (ref.current.clientWidth / 2) * 10;

    camera.right =
      (defaultRight / zoom.horizontal.default) * Number(event.target.value);
    zoomValueX = Number(event.target.value);

    // TODO refactor this - needs to update state but we have to mutate the zoomValueX because it is used onWheel event and setState does not work
    setZoomX(Number(event.target.value));
  };

  const onZoomY = event => {
    camera.bottom =
      (defaultBottom * Number(event.target.value)) / zoom.vertical.default;

    setZoomY(Number(event.target.value));
  };

  const onWheel = event => {
    if (event.ctrlKey) {
      onZoomX({
        target: {
          value: zoomValueX + zoomValueX * event.deltaY * 0.01
        }
      });
    }
  };

  useEffect(() => {
    if (camera) {
      setDefaultBottom(camera.bottom);

      document.addEventListener('wheel', onWheel, false);
      return () => {
        document.removeEventListener('wheel', onWheel);
      };
    }
  }, [camera]);

  return {
    zoomValueY,
    zoomValueX,
    onZoomX,
    onZoomY,
    onWheel
  };
};
