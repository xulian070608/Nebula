import * as THREE from "three";

function CameraController() {
  // var width = window.innerWidth;
  // var height = window.innerHeight;
  var container_style = document.getElementById("layout_render").style
  var width = parseInt(container_style.width);
  var height = parseInt(container_style.height);
  var near = -100;
  var far = 100;
  var zoomScale = 4;

  var camera = new THREE.OrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    near,
    far
  );

  camera.zoom = zoomScale;
  camera.position.set(0, 5, 0);
  camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), (-90 / 180) * Math.PI);
  camera.updateProjectionMatrix();

  return camera;
}

export default CameraController;
