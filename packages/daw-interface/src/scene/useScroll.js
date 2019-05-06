import { useState, useEffect } from 'react';

export default ({ zoom, maxY, ref }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: maxY
  });
  const onScroll = event => {
    if (!event.ctrlKey) {
      const x = Math.max(
        ref.current.clientWidth / 2,
        position.x + (event.deltaX * zoom.horizontal.current) / 10
      );
      const y = Math.min(maxY, position.y - event.deltaY);

      setPosition({
        x,
        y
      });
    }
  };

  useEffect(() => {
    document.addEventListener('wheel', onScroll, false);

    return () => {
      document.removeEventListener('wheel', onScroll);
    };
  }, [position]);

  return position;
};
