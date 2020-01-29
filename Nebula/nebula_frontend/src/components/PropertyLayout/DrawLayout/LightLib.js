import * as THREE from "three";

function PointLight() {
  let intensity = 1;
  let light = new THREE.PointLight(0xffffff, intensity);
  light.position.set(0, 0, 3);

  let lightBulb = new LightBulb();
  light.add(lightBulb);

  return light;
}

function DirectionalLight() {
  let intensity = 0.5;
  let light = new THREE.DirectionalLight(0xffffff, intensity);
  light.position.set(0, 0, 3);

  return light;
}

function LightBulb() {
  let geometry = new THREE.SphereGeometry(0.05, 24, 24);
  let material = new THREE.MeshBasicMaterial({ color: 0xfffff });
  let mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

export { PointLight, DirectionalLight };
