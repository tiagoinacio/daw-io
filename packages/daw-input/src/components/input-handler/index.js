import { useEffect } from 'react';

export default ({ children, onNewTrack, onZoom }) => {
  useEffect(() => {
    document.addEventListener('keydown', event => {
      event.preventDefault();

      if (event.ctrlKey && event.shiftKey && event.key === 'N') {
        onNewTrack();
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener(
      'wheel',
      event => {
        event.preventDefault();
        event.stopPropagation();

        onZoom(-event.deltaY);
      },
      { passive: false }
    );
  }, []);

  return children;
};
