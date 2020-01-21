import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

function OrbitControl(camera, renderer) {
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = false;
  //   controls.maxPolarAngle = 90;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  };

  return controls;
}

export default OrbitControl;
