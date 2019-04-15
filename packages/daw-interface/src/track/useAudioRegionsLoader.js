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

export default props => {
  const [sources, setAudioSource] = useState(null);
  const [audioRegions, setAudioRegions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDragOver = event => {
    event.stopPropagation();
    event.preventDefault();
    // console.log('onDragEnter', event);
  };

  const onDragEnter = event => {
    event.stopPropagation();
    event.preventDefault();
    // console.log('onDragEnter', event);
  };

  const onResizeStop = (event, direction, ref, delta) => {
    console.log(audioRegions);
    props.audioContext.resume();
    console.log(audioRegions.getChannelData(0).fill(0));
  };

  const onFileDrop = event => {
    event.stopPropagation();
    event.preventDefault();

    setIsLoading(true);

    const files = getFiles(event);
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      const fileResult = e.target.result;

      props.audioContext.decodeAudioData(fileResult, buffer => {
        setAudioRegions(buffer);
      });
    };

    fileReader.onerror = function(e) {
      console.log(e);
    };

    fileReader.readAsArrayBuffer(files[0]);
  };
  const onPlayPause = () => {
    debugger;
    if (props.isPlaying && audioRegions) {
      let source = props.audioContext.createBufferSource();
      source.buffer = audioRegions;

      setAudioSource(source);

      source.connect(props.audioContext.destination);

      if (props.audioContext.state !== 'running') {
        props.audioContext.resume();
      } else {
        props.audioContext.resume();
        source.start();
      }
    } else if (sources && !props.isPlaying) {
      props.audioContext.suspend();
    }
  };

  const onDone = () => {
    setIsLoading(false);
  };

  return {
    audioRegions,
    onDragOver,
    onDragEnter,
    onFileDrop,
    onPlayPause,
    onDone,
    onResizeStop,
    isLoading
  };
};
