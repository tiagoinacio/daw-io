import {useState, useEffect} from 'react';

export default ({zoom, camera, ref, arrangement}) => {
  const [defaultBottom, setDefaultBottom] = useState(0);
  let [zoomValueX, setZoomX] = useState(zoom.horizontal.current);
  const [zoomValueY, setZoomY] = useState(zoom.vertical.current);
  let defaultRight, defaultLeft;

  const onZoomX = event => {
    if (!defaultRight) {
      defaultRight = (ref.current.clientWidth / 2) * 10;
      defaultLeft = ref.current.clientWidth / -2 - arrangement.ticks;
    }
    const value = Number(event.target.value);
    // Take zoom into consideration because the camera values increase exponential whereas the mouse coordinates don't
    // Since our zoom slider starts at half, we need to subtract the value if the new zoom is below the default zoom, or add it if it is above
    const signedValue = value < zoom.horizontal.default ? -value : value;
    const nextRight = (defaultRight * signedValue) / zoom.horizontal.default;
    const nextLeft = -(defaultLeft * signedValue) / zoom.horizontal.default;
    const previousRight = camera.right;
    const difference = nextRight - previousRight;
    camera.right = nextRight;
    camera.position.x = Math.max(ref.current.clientWidth / 2, camera.position.x - difference / (2.5)); // + (nextRight / previousRight));

    // TODO refactor this - needs to update state but we have to mutate the zoomValueX because it is used onWheel event and setState does not work
    zoomValueX = value;
    setZoomX(value);
  };

  const onZoomY = event => {
    camera.bottom =
      (defaultBottom * Number(event.target.value)) / zoom.vertical.default;

    setZoomY(Number(event.target.value));
  };

  const onWheel = event => {
    if (event.ctrlKey) {
      const deltaY = event.deltaMode === 1 ? event.deltaY * 18 : event.deltaY;
      const value = Math.min(
        Math.max(1, zoomValueX + deltaY * 100),
        zoom.horizontal.max,
      );

      onZoomX({
        clientX: event.clientX,
        clientY: event.clientY,
        deltaY,
        deltaX: event.deltaX,
        target: {
          value,
        },
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
    onWheel,
  };
};
