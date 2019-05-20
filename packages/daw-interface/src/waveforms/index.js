import * as THREE from 'three';

export default props => {
  props.audioBuffer.forEach((buffer, trackId) => {
    const data = buffer.getChannelData(0);
    const material = new THREE.LineBasicMaterial({
      color: 0x416696
    });
    const geometry = new THREE.Geometry();
    const halfTrackHeight = props.layout.trackHeight / 2;

    data.forEach((sample, x) => {
      const fromY = -sample * halfTrackHeight;
      const toY = sample * halfTrackHeight;
      const z = 0;

      geometry.vertices.push(
        new THREE.Vector3(x, fromY, z),
        new THREE.Vector3(x, toY, z)
      );
    });

    const line = new THREE.LineSegments(geometry, material);

    const group = new THREE.Object3D();

    const planeGeometry = new THREE.PlaneBufferGeometry(
      data.length,
      props.layout.trackHeight
    );
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xe2e2e4
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.position.x = data.length / 2;
    line.position.z = -3;
    plane.position.z = -5;

    group.name = 'waveform';
    group.add(plane);
    group.add(line);

    group.position.y = 0 - halfTrackHeight;
    // Fix first ticks because our geometry starts at the first tick bar
    group.position.x = -props.arrangement.ticks;
    group.trackId = trackId;
    props.addToScene(group);
    props.addToRaycaster(plane);
  });
};
