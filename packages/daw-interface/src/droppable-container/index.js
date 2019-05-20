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

export default withAudio(
  ({ onDrop, forwardedRef, style, onMouseMove, onMouseDown, onMouseUp }) => (
    <div
      onDrop={onDrop}
      onMouseMove={onMouseMove}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={forwardedRef}
      style={style}
    />
  )
);
