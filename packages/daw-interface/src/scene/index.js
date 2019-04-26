import React, { useEffect, useRef, Fragment } from 'react';
import { withScene, withTime } from '@daw/state';
import useZoom from './useZoom';
import useScroll from './useScroll';
import useCamera from './useCamera';
import DroppableContainer from '../droppable-container';
import addWaveforms from '../waveforms';
import addTracks from '../tracks';
import * as THREE from 'three';
import addArrangementBackground from '../arrangement-background';
import './styles.css';

const ThreeScene = props => {
  const ref = useRef(null);
  const camera = useCamera({
    ref,
    arrangement: props.arrangement,
    zoom: props.zoom,
    scene: props.scene
  });
  const { zoomValueX, zoomValueY, onZoomY, onZoomX } = useZoom({
    zoom: props.zoom,
    camera,
    ref
  });
  const { x, y } = useScroll({
    zoom: props.zoom,
    ref,
    maxY: 0
  });

  var raycaster = new THREE.Raycaster(); // create once
  var mouse = new THREE.Vector2(); // create once

  const renderScene = () => {
    props.renderer.render(props.scene, camera);
  };

  const onMouseMove = event => {
    mouse.x = (event.clientX / ref.current.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / ref.current.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(props.objects, true);
    // console.log(mouse.x, mouse.y, props.objects, intersects);
    if (intersects[0]) {
      Object.keys(intersects).forEach(mesh => {
        console.log(mesh);
      });
    }
  };

  useEffect(() => {
    ref.current.appendChild(props.renderer.domElement);

    return () => {
      ref.current.removeChild(props.renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (camera) {
      camera.position.set(ref.current.clientWidth / 2, 0, 1);

      camera.updateProjectionMatrix();

      props.scene.add(camera);

      props.setCamera(camera);

      addArrangementBackground(props);

      props.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      props.renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);

      requestAnimationFrame(renderScene);
    }
  }, [camera]);

  useEffect(() => {
    if (camera) {
      camera.position.set(x, y, 1);
      camera.updateProjectionMatrix();
      requestAnimationFrame(renderScene);
    }
  }, [x, y]);

  useEffect(() => {
    if (camera) {
      addTracks({
        ...props,
        height: ref.current.clientHeight
      });
      requestAnimationFrame(renderScene);
    }
  }, [props.tracks]);

  useEffect(() => {
    if (camera) {
      camera.updateProjectionMatrix();
      requestAnimationFrame(renderScene);
    }
  }, [zoomValueX, zoomValueY]);

  useEffect(() => {
    if (camera) {
      addWaveforms({ ...props, height: ref.current.clientHeight });
      requestAnimationFrame(renderScene);
    }
  }, [props.audioBuffer]);

  return (
    <Fragment>
      <DroppableContainer
        onMouseMove={onMouseMove}
        forwardedRef={ref}
        style={{ width: '100%', height: '100%' }}
      />
      <label id="horizontal-zoom">
        <input
          type="range"
          min={props.zoom.horizontal.min}
          max={props.zoom.horizontal.max}
          value={zoomValueX}
          onChange={onZoomX}
          step={props.zoom.horizontal.step}
        />
      </label>
      <label id="vertical-zoom">
        <input
          type="range"
          min={props.zoom.vertical.min}
          max={props.zoom.vertical.max}
          value={zoomValueY}
          onChange={onZoomY}
          step={props.zoom.vertical.step}
        />
      </label>
    </Fragment>
  );
};

export default withTime(withScene(ThreeScene));