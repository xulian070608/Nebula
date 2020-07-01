import * as THREE from "three";

function Camera(params) {
  const { width, height } = calculateRegion(params);

  // camera settings
  const camera = new THREE.OrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    -300000,
    300000
  );
  camera.up.set(0, 0, 1);
  camera.position.set(0, 0, 30000);
  camera.zoom = 1;
  camera.updateProjectionMatrix();

  return camera;
}

function calculateRegion(params) {
  const { bb3, targetWidth, targetHeight } = params;

  // calculate camera region
  const groupLeft = bb3.min.x;
  const groupRight = bb3.max.x;
  const groupTop = bb3.max.y;
  const groupBottom = bb3.min.y;
  let width, height;
  const aspectRatio = (groupRight - groupLeft) / (groupTop - groupBottom);
  const targetAspectRatio = targetWidth / targetHeight;
  const offsetPixels = 18000;
  if (targetAspectRatio > aspectRatio) {
    height = groupTop - groupBottom + offsetPixels;
    width = height * (targetWidth / targetHeight);
  } else {
    width = groupRight - groupLeft + offsetPixels;
    height = width * (targetHeight / targetWidth);
  }

  return { width, height };
}

export default Camera;
export { calculateRegion };
