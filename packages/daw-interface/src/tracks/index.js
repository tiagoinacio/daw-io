import * as THREE from 'three';

export default props => {
  props.tracks.forEach((track, trackId) => {
    const material = new THREE.LineBasicMaterial({
      color: 0x333
    });
    const paddingMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0
    });
    const geometry = new THREE.Geometry();
    const fromX = -props.arrangement.ticks;
    const toX = props.arrangement.width;
    const y = -props.layout.trackHeight * trackId - props.layout.trackHeight;
    const z = 0;

    geometry.vertices.push(
      new THREE.Vector3(fromX, y, z),
      new THREE.Vector3(toX, y, z),
      new THREE.Vector3(fromX, y + 1, z),
      new THREE.Vector3(toX, y + 1, z)
    );

    const group = new THREE.Object3D();
    const line = new THREE.LineSegments(geometry, material);
    const paddingHeight = 10;
    const paddingGeometry = new THREE.PlaneGeometry(
      props.arrangement.width - props.arrangement.ticks,
      paddingHeight
    );
    const padding = new THREE.Mesh(paddingGeometry, paddingMaterial);

    padding.position.y = y;

    group.name = 'separator';

    group.add(line);
    group.add(padding);
    group.trackId = trackId;

    props.addToScene(group);
  });
};
