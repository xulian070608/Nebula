import * as THREE from "three";

function HelperMode(params) {
  const { mode, envLights, camera, showAxes } = params;
  let helperGroup = new THREE.Group();

  if (mode === "on") {
    if (envLights) {
      envLights.children.forEach(light => {
        let lightHelper = new THREE.DirectionalLightHelper(light);
        helperGroup.add(lightHelper);
      });
    }
    if (camera) {
      // camera helper: used to help with visualizing a camera
      // contians in its frustum
      var cameraHelper = new THREE.CameraHelper(camera);
      helperGroup.add(cameraHelper);
    }
    if (showAxes) {
      // show origin point and axis directions
      var axesHelper = new THREE.AxesHelper(5);
      helperGroup.add(axesHelper);
    }
  }
  return helperGroup;
}

export default HelperMode;
