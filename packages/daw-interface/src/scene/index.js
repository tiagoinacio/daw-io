import React, { useEffect, useState, useRef, Fragment } from 'react';
import { withScene, withTime } from '@daw/state';
import useZoom from './useZoom';
import useScroll from './useScroll';
import useCamera from './useCamera';
import useMouse from './useMouse';
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
  const { x, y } = useScroll({
    zoom: props.zoom,
    ref,
    maxY: 0
  });
  const { zoomValueX, zoomValueY, onZoomY, onZoomX } = useZoom({
    zoom: props.zoom,
    camera,
    ref,
    arrangement: props.arrangement
  });
  let timeout;

  const renderScene = () => {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }
    timeout = requestAnimationFrame(() =>
      props.renderer.render(props.scene, camera)
    );
  };
  const { onMouseMove, onMouseUp, onMouseDown } = useMouse({
    domElement: props.renderer.domElement,
    camera,
    ref,
    arrangement: props.arrangement,
    objects: props.objects,
    renderScene,
    zoomValueX,
    zoomValueY,
    zoom: props.zoom,
    raycasterObjects: props.raycasterObjects
  });

  useEffect(() => {
    const onWindowResize = () => {
      camera.aspect = ref.current.clientWidth / ref.current.clientHeight;
      camera.updateProjectionMatrix();

      props.renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    };

    ref.current.appendChild(props.renderer.domElement);
    ref.current.addEventListener('resize', onWindowResize, false);

    return () => {
      ref.current.removeChild(props.renderer.domElement);
      ref.current.removeEventListener('resize', onWindowResize);
    };
  }, []);

  useEffect(() => {
    if (camera) {
      props.scene.add(camera);
      props.setCamera(camera);
      addArrangementBackground(props);
      props.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      props.renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
      renderScene();
    }
  }, [camera]);

  useEffect(() => {
    if (camera) {
      camera.updateProjectionMatrix();
      renderScene();
    }
  }, [zoomValueX, zoomValueY]);

  useEffect(() => {
    if (camera) {
      camera.position.set(x, y, 1);
      renderScene();
    }
  }, [x, y]);

  useEffect(() => {
    if (camera) {
      addTracks({
        ...props,
        height: ref.current.clientHeight
      });
      renderScene();
    }
  }, [props.tracks]);

  useEffect(() => {
    if (camera) {
      addWaveforms({ ...props, height: ref.current.clientHeight });
      renderScene();
    }
  }, [props.audioBuffer]);

  return (
    <Fragment>
      <DroppableContainer
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
