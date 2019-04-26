import * as THREE from 'three';

export default props => {
  props.renderer.setClearColor(new THREE.Color(0.7, 0.7, 0.7));
  props.renderer.setPixelRatio(window.devicePixelRatio);

  const ticks = new THREE.Geometry();
  const bars = new THREE.Geometry();
  const ticksMaterial = new THREE.LineBasicMaterial({
    color: 0xc9c8c8
  });
  const barsMaterial = new THREE.LineBasicMaterial({
    color: 0x656565
  });

  [...Array(props.arrangement.bars).keys()].forEach(bar => {
    [...Array(props.arrangement.divs).keys()].forEach(beatIndex => {
      const geometry = beatIndex === 3 ? bars : ticks;

      geometry.vertices.push(
        new THREE.Vector3(
          beatIndex * props.arrangement.ticks +
            bar * props.arrangement.beats * props.arrangement.ticks,
          -props.layout.tickHeight,
          0
        ),
        new THREE.Vector3(
          beatIndex * props.arrangement.ticks +
            bar * props.arrangement.beats * props.arrangement.ticks,
          0,
          0
        )
      );
    });
  });

  const ticksMesh = new THREE.LineSegments(ticks, ticksMaterial);
  const barsMesh = new THREE.LineSegments(bars, barsMaterial);

  props.scene.add(ticksMesh);
  props.scene.add(barsMesh);
};
