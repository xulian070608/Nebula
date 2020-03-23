import * as THREE from "three";

// environment lights settings
function EnvironmentLight() {
  let environmentLightGroup = new THREE.Group();

  // two light from opposite directions with difference intensity
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
  directionalLight1.position.set(200, 200, 200);
  environmentLightGroup.add(directionalLight1);

  var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-200, -200, 200);
  environmentLightGroup.add(directionalLight2);

  return environmentLightGroup;
}

export default EnvironmentLight;
