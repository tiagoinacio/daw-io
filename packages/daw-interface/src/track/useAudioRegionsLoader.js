// import { useState } from 'react';

// export default props => {
//   const [sources, setAudioSource] = useState(null);
//   const [audioRegions, setAudioRegions] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const onDragOver = event => {
//     event.stopPropagation();
//     event.preventDefault();
//   };

//   const onDragEnter = event => {
//     event.stopPropagation();
//     event.preventDefault();
//   };

//   const onResizeStop = (event, direction, ref, delta) => {
//     props.audioContext.resume();
//   };

//   const onFileDrop = event => {
//     event.stopPropagation();
//     event.preventDefault();

//     setIsLoading(true);

//     const files = getFiles(event);
//     const fileReader = new FileReader();

//     fileReader.onload = function(e) {
//       const fileResult = e.target.result;

//       props.audioContext.decodeAudioData(fileResult, buffer => {
//         setAudioRegions(buffer);
//       });
//     };

//     fileReader.onerror = function(e) {
//     };

//     fileReader.readAsArrayBuffer(files[0]);
//   };
//   const onPlayPause = () => {
//     if (props.isPlaying && audioRegions) {
//       let source = props.audioContext.createBufferSource();
//       source.buffer = audioRegions;

//       setAudioSource(source);

//       source.connect(props.audioContext.destination);

//       if (props.audioContext.state !== 'running') {
//         props.audioContext.resume();
//       } else {
//         props.audioContext.resume();
//         source.start();
//       }
//     } else if (sources && !props.isPlaying) {
//       props.audioContext.suspend();
//     }
//   };

//   const onDone = () => {
//     setIsLoading(false);
//   };

//   return {
//     audioRegions,
//     onDragOver,
//     onDragEnter,
//     onFileDrop,
//     onPlayPause,
//     onDone,
//     onResizeStop,
//     isLoading
//   };
// };
