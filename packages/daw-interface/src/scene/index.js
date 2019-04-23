import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = props => {
  const ref = useRef(null);
  const [env, setEnv] = useState(null);
  let frameId;

  const start = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(animate);
    }
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
  };

  const animate = () => {
    renderScene();
    frameId = window.requestAnimationFrame(animate);
  };

  const renderScene = () => {
    env.renderer.render(env.scene, env.camera);
  };

  const drawTimeDomain = amplitudeArray => {
    // for (var i = 0; i < amplitudeArray.length; i++) {
    //   var value = amplitudeArray[i] * 2;
    //   var y = 0.01 * value;

    //   env.waveform.geom.vertices[i].setX((5 / amplitudeArray.length) * i - 2.5);
    //   env.waveform.geom.vertices[i].setY(y);
    //   /*env.waveform.geom.vertices[i].setZ((Math.random()*Math.abs(y))-(Math.abs(y)/2));*/
    // }
    for (var i = 0; i < amplitudeArray.length; i += 1) {
      var min = 1.0;
      var max = -1.0;
      for (var j = 0; j < 1; j += 1) {
        var datum = amplitudeArray[i * 1 + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        env.waveform.geom.vertices[i].setX(i);
        env.waveform.geom.vertices[i].setY((1 + min) * 100); // substitue 100 with height / 2
      }
    }
    env.waveform.geom.verticesNeedUpdate = true;
  };

  useEffect(() => {
    const env = {
      renderer: new THREE.WebGLRenderer(),
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(
        75,
        ref.current.clientWidth / ref.current.clientHeight,
        0.1,
        10000
      ),
      cameraTrack: new THREE.Group(),
      lights: {
        ambient: new THREE.AmbientLight(0x444444),
        directional: new THREE.DirectionalLight(0xffeedd)
      },
      floor: {
        geom: new THREE.PlaneGeometry(5, 5, 6, 6),
        material: new THREE.MeshBasicMaterial({
          color: 0x444444,
          wireframe: true
        })
      },
      volume: {
        geom: new THREE.BoxGeometry(5, 5, 5),
        material: new THREE.MeshBasicMaterial({
          color: 0x02082a,
          wireframe: true
        })
      },
      target: new THREE.Vector3(0, 1, 0),
      waveform: {
        geom: new THREE.Geometry(),
        material: new THREE.LineBasicMaterial({
          color: 0x733738
        })
      }
    };

    setEnv(env);
  }, []);

  useEffect(() => {
    if (env) {
      ref.current.appendChild(env.renderer.domElement);

      window.scene = env.scene;

      start();

      return () => {
        stop();
        ref.current.removeChild(env.renderer.domElement);
      };
    }
  }, [env]);

  useEffect(() => {
    if (props.audioContext && env) {
      env.floor.mesh = new THREE.Mesh(env.floor.geom, env.floor.material);
      env.volume.mesh = new THREE.Mesh(env.volume.geom, env.volume.material);
      env.waveform.mesh = new THREE.Line(
        env.waveform.geom,
        env.waveform.material
      );

      // Create the array for the data values
      const amplitudeArray =
        (props.audioBuffer[0] && props.audioBuffer[0].getChannelData(0)) || []; //new Uint8Array(analyserNode.frequencyBinCount);

      for (var a = 0; a < amplitudeArray.length; a++) {
        // TODO was 1024 instead of amplitudeArray
        env.waveform.geom.vertices.push(
          new THREE.Vector3((5 / amplitudeArray.length) * a - 2.5, 2.5, 0)
        );
      }

      env.cameraTrack.rotation.y = -0.25;
      env.camera.position.z = 8;
      env.camera.position.y = 6.8;
      env.cameraTrack.rotation.z = -0.5;
      env.camera.lookAt(env.target);
      env.lights.directional.position.set(0, 0, 1).normalize();
      env.volume.mesh.position.y = 2.5;
      env.floor.mesh.rotation.x = (90 * Math.PI) / 180;

      //Add those things to the scene
      env.cameraTrack.add(env.camera);
      env.scene.add(env.cameraTrack);
      //env.scene.add(env.floor.mesh);
      env.scene.add(env.volume.mesh);
      env.scene.add(env.lights.ambient);
      env.scene.add(env.lights.directional);
      env.scene.add(env.waveform.mesh);

      const sampleSize = 1024;
      const sourceNode = props.audioContext.createBufferSource();
      const analyserNode = props.audioContext.createAnalyser();
      const javascriptNode = props.audioContext.createScriptProcessor(
        sampleSize,
        1,
        1
      );

      // Now connect the nodes together
      sourceNode.connect(props.audioContext.destination);
      sourceNode.connect(analyserNode);
      sourceNode.buffer = props.audioBuffer[0];
      analyserNode.connect(javascriptNode);
      javascriptNode.connect(props.audioContext.destination);

      if (amplitudeArray.length) {
        drawTimeDomain(amplitudeArray);
        console.log('finish');
      }
    }
  });

  // componentWillUpdate(nextProps) {
  //   const listener = new THREE.AudioListener();
  //   this.camera.add(listener);
  //   const sound = new THREE.Audio(listener);
  //   var fftSize = 128;
  //   var audioLoader = new THREE.AudioLoader();

  //   if (nextProps.audioBuffer.length) {
  //     console.log(nextProps.audioBuffer);
  //     sound.setBuffer(nextProps.audioBuffer[0]);
  //     sound.setVolume(0.5);
  //     sound.play();

  //     // create an AudioAnalyser, passing in the sound and desired fftSize
  //     var analyser = new THREE.AudioAnalyser(sound, 32);
  //     console.log(analyser.data);
  //     // get the average frequency of the sound
  //     // var data = analyser.getAverageFrequency();
  //     var uniforms = {
  //       tAudioData: {
  //         value: new THREE.DataTexture(
  //           analyser.data,
  //           fftSize / 2,
  //           1,
  //           THREE.LuminanceFormat
  //         )
  //       }
  //     };
  //     var material = new THREE.ShaderMaterial({
  //       uniforms: uniforms
  //       //   vertexShader: document.getElementById('vertexShader').textContent,
  //       //   fragmentShader: document.getElementById('fragmentShader').textContent
  //     });
  //     var geometry = new THREE.PlaneBufferGeometry(1, 1);
  //     var mesh = new THREE.Mesh(geometry, material);
  //     this.scene.add(mesh);
  //   }

  return <div ref={ref} style={{ width: '800px', height: '300px' }} />;
};

export default ThreeScene;
