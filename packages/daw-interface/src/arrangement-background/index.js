import * as THREE from 'three';

export default props => {
  props.renderer.setClearColor(0x4e4e4e);
  props.renderer.setPixelRatio(window.devicePixelRatio);

  const ticks = new THREE.Geometry();
  const bars = new THREE.Geometry();
  const ticksMaterial = new THREE.LineBasicMaterial({
    color: 0x656565
  });
  const barsMaterial = new THREE.LineBasicMaterial({
    color: 0xc9c8c8
  });

  [...Array(props.arrangement.bars).keys()].forEach(bar => {
    [...Array(props.arrangement.divs).keys()].forEach(beatIndex => {
      const geometry = beatIndex === 3 ? bars : ticks;

      geometry.vertices.push(
        new THREE.Vector3(
          beatIndex * props.arrangement.ticks +
            bar * props.arrangement.beats * props.arrangement.ticks,
          -props.layout.tickHeight,
          -10
        ),
        new THREE.Vector3(
          beatIndex * props.arrangement.ticks +
            bar * props.arrangement.beats * props.arrangement.ticks,
          0,
          -10
        )
      );
    });
  });

  const ticksMesh = new THREE.LineSegments(ticks, ticksMaterial);
  const barsMesh = new THREE.LineSegments(bars, barsMaterial);

  ticksMesh.name = 'ticks';
  barsMesh.name = 'bars';

  props.scene.add(ticksMesh);
  props.scene.add(barsMesh);
};
