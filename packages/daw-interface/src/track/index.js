import React, { useState } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import classnames from 'classnames';
import './styles.css';

export default props => {
  const [audio, setAudio] = useState(null);

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

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          var file = event.dataTransfer.items[i].getAsFile();

          setAudio(file);
          console.log(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.files.length; i++) {
        var file = event.dataTransfer.files[i];
        setAudio(file);
        console.log(file);
      }
    }
  };

  if (audio) {
    var audioElement = document.createElement('audio');
    audioElement.src = URL.createObjectURL(audio);
    var ctx = new AudioContext();
    var sourceNode = ctx.createMediaElementSource(audioElement);
    var analyser = ctx.createAnalyser();
    sourceNode.connect(analyser);
    analyser.connect(ctx.destination);
    audioElement.play();
  }

  return (
    <ListItem className={props.className}>
      <div className={classnames('select', { active: props.isActive })} />
      <div
        className="drag"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onFileDrop}
      >
        <Typography className="name">Track {props.index}</Typography>
      </div>
    </ListItem>
  );
};
