import * as THREE from 'three';

export default props => {
  props.tracks.forEach((track, index) => {
    const material = new THREE.LineBasicMaterial({
      color: 0x333
    });
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3(
        -props.arrangement.ticks,
        -props.layout.trackHeight * index - props.layout.trackHeight,
        0
      ),
      new THREE.Vector3(
        props.arrangement.width,
        -props.layout.trackHeight * index - props.layout.trackHeight,
        0
      )
    );

    const line = new THREE.LineSegments(geometry, material);

    props.addToScene(line);
  });
};
