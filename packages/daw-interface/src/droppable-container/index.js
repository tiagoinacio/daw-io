import React from 'react';
import { withAudio } from '@daw/state';

const onDragOver = event => {
  event.stopPropagation();
  event.preventDefault();
};

const onDragEnter = event => {
  event.stopPropagation();
  event.preventDefault();
};

export default withAudio(({ onDrop, forwardedRef, style, onMouseMove }) => (
  <div
    onDrop={onDrop}
    onMouseMove={onMouseMove}
    onDragOver={onDragOver}
    onDragEnter={onDragEnter}
    ref={forwardedRef}
    style={style}
  />
));
