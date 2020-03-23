import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function CameraControl(params) {
  const { camera, renderer } = params;
  // orbit control settings
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = true;
  controls.maxPolarAngle = Math.PI / 2;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  };
  controls.screenSpacePanning = true;
  controls.target.set(0, 0, 0);

  return controls;
}

export default CameraControl;
