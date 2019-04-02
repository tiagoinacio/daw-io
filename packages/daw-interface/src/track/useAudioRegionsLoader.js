import { useState } from 'react';

const getFiles = event => {
  const items = event.dataTransfer.items;

  if (items) {
    return Object.keys(items)
      .filter((_, index) => items[index].kind === 'file')
      .map(index => items[index].getAsFile());
  }

  // Use DataTransfer interface to access the file(s)
  return event.dataTransfer.files;
};

export default () => {
  const [audioRegions, setAudioRegions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDragOver = event => {
    event.stopPropagation();
    event.preventDefault();
    console.log('onDragEnter', event);
  };

  const onDragEnter = event => {
    event.stopPropagation();
    event.preventDefault();
    console.log('onDragEnter', event);
  };

  const onFileDrop = event => {
    event.stopPropagation();
    event.preventDefault();

    setIsLoading(true);

    const files = getFiles(event);
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      const fileResult = e.target.result;
      const ctx = new AudioContext();

      ctx.decodeAudioData(fileResult, buffer => {
        setAudioRegions(buffer);
      });
    };

    fileReader.onerror = function(e) {
      console.log(e);
    };

    fileReader.readAsArrayBuffer(files[0]);
  };

  const onDone = () => {
    setIsLoading(false);
  };

  return {
    audioRegions,
    onDragOver,
    onDragEnter,
    onFileDrop,
    onDone,
    isLoading
  };
};
