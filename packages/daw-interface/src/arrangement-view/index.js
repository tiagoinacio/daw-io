import React, { useEffect, useState } from 'react';
import Track from '../track';
import Resizable from 're-resizable';
import { withAudio, withTime, withTransport } from '@daw/state';
import Slider from '@material-ui/lab/Slider';
import './styles.css';

export default withTime(
  withTransport(
    withAudio(props => {
      const [currentTime, setCurrentTime] = useState(0);
      const [style, setStyle] = useState(null);

      useEffect(() => {
        if (props.isPlaying) {
          setCurrentTime(currentTime + 0.009 * 4);
        }

        if (props.isStopped) {
          setCurrentTime(0);
        }
      }, [props.isPlaying, props.isStopped, currentTime]);

      useEffect(() => {
        // const style = {
        //   background: `
        //     repeating-linear-gradient(
        //       90deg,
        //       var(--color-primary-light-grey) 0px,
        //       var(--color-primary-light-grey) 33px,
        //       var(--color-primary-dark-grey) 34px,
        //       var(--color-primary-light-grey) 35px,
        //       var(--color-primary-light-grey) 35.4px
        //     )`
        // };
        // const style90bpms = {
        //   background: `
        //     repeating-linear-gradient(
        //       90deg,
        //       var(--color-primary-light-grey) 0px,
        //       var(--color-primary-light-grey) 10.5px,
        //       var(--color-primary-dark-grey) 10px,
        //       var(--color-primary-light-grey) 11px,
        //       var(--color-primary-light-grey) 11.8px
        //     )`
        // };
        const style = {
          background: `
            repeating-linear-gradient(
              90deg,
              var(--color-primary-light-grey) 0px,
              var(--color-primary-light-grey) ${21.75 +
                Number(props.bpm) * 0.375}px,
              var(--color-primary-dark-grey) ${22 + Number(props.bpm) * 0.4}px,
              var(--color-primary-light-grey) ${23 + Number(props.bpm) * 0.4}px,
              var(--color-primary-light-grey) ${23.61 +
                Number(props.bpm) * 0.393}px
            )`
        };

        console.log(props);

        setStyle(style);
      }, [props.bpm]);

      return (
        <div className={props.className} style={style}>
          <span className="marker" style={{ paddingLeft: currentTime }} />
          <Resizable
            enable={{
              bottom: true
            }}
            minHeight="50"
            defaultSize={{
              height: 100
            }}
          >
            <Track
              backgroundColor="#2C3224"
              index="1"
              className="track"
              isPaused={props.isPaused}
              isPlaying={props.isStopped}
              horizontalZoom={props.horizontalZoom}
              audioContext={props.audioContext}
            />
          </Resizable>
          <Resizable
            enable={{
              bottom: true
            }}
            minHeight="50"
            defaultSize={{
              height: 100
            }}
          >
            <Track
              backgroundColor="#2A5060"
              index="2"
              className="track"
              isPaused={props.isPaused}
              isPlaying={props.isStopped}
              horizontalZoom={props.horizontalZoom}
              audioContext={props.audioContext}
            />
          </Resizable>
          <Resizable
            enable={{
              bottom: true
            }}
            minHeight="50"
            defaultSize={{
              height: 100
            }}
          >
            <Track
              isActive
              backgroundColor="#2A5060"
              index="3"
              className="track"
              isPaused={props.isPaused}
              isPlaying={props.isStopped}
              horizontalZoom={props.horizontalZoom}
              audioContext={props.audioContext}
            />
          </Resizable>
          <Resizable
            enable={{
              bottom: true
            }}
            minHeight="50"
            defaultSize={{
              height: 100
            }}
          >
            <Track
              backgroundColor="#2A5060"
              index="4"
              className="track"
              isPaused={props.isPaused}
              isPlaying={props.isStopped}
              horizontalZoom={props.horizontalZoom}
              audioContext={props.audioContext}
            />
          </Resizable>
          <div className="horizontal-zoom">
            <Slider
              value={props.horizontalZoom}
              min={1}
              max={50}
              step={2}
              aria-labelledby="label"
              onChange={(_, value) => props.setHorizontalZoom(value)}
            />
          </div>
        </div>
      );
    })
  )
);
