import { useEffect } from 'react';

export default ({ children, onNewTrack, onZoom, onScroll }) => {
  useEffect(() => {
    document.addEventListener('keydown', event => {
      // event.preventDefault();

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
        // onZoom(-event.deltaY);
        // onScroll(event);
      },
      { passive: false }
    );
  }, []);

  return children;
};
