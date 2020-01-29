// import from external packages
import * as THREE from "three";
import axios from "axios";

// import from internal packages
import { DirectionalLight } from "./LightLib";
import RenderController from "./RenderController";
import CameraController from "./CameraController";
import Room from "./RoomGenerator";
import OrbitController from "./OrbitManager";
import { RectAreaLight } from "three";

var controls, renderer, scene, camera, raycaster;
var roomList = [];
var mouse = new THREE.Vector2(),
  INTERSECTED;

// function renderEngine() {
//   axios.get("http://100.94.29.214:8000/apis/v1/rooms/").then(res => {
//     res.data.results.map(data => roomList.push(new Room(data)));
//     init(roomList);
//     animate();
//   });
// }

function renderEngine(url) {
  axios
  .get(url)
  .then(res => {
    res.data.results.map(data => roomList.push(new Room(data)));
    if (res.data.next !== null) {
      renderEngine(res.data.next);
    } else {
      init(roomList);
      animate();
    }
  });
}

function init(roomList) {
  //set up scene background
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // set up light source
  var directionalLight = new DirectionalLight();

  roomList.forEach(element => scene.add(element));
  scene.add(directionalLight);

  renderer = new RenderController().renderer;
  camera = new CameraController();
  controls = new OrbitController(camera, renderer);
  raycaster = new THREE.Raycaster();

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("click", onDocumentMouseDown, false);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children),
    material;

  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].object) {
      if (INTERSECTED) {
        material = INTERSECTED.material;
        if (material.emissive) {
          material.emissive.setHex(INTERSECTED.currentHex);
        } else {
          material.color.setHex(INTERSECTED.currentHex);
        }
      }
      INTERSECTED = intersects[0].object;
      material = INTERSECTED.material;
      if (material.emissive) {
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        material.emissive.setHex(0xff0000);
      } else {
        INTERSECTED.currentHex = material.color.getHex();
        material.color.setHex(0xff0000);
      }

      console.log(INTERSECTED.position);
    }
  } else {
    if (INTERSECTED) {
      material = INTERSECTED.material;

      if (material.emissive) {
        material.emissive.setHex(INTERSECTED.currentHex);
      } else {
        material.color.setHex(INTERSECTED.currentHex);
      }
    }

    INTERSECTED = null;
  }

  controls.update();
  renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  //get "layout_render" location coordinates to correct raycasting
  var rect = document.getElementById("layout_render").getBoundingClientRect();
  var container_style = document.getElementById("layout_render").style

  // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouse.x = ((event.clientX-rect.left) / parseInt(container_style.width)) * 2 - 1;
  mouse.y = -((event.clientY-rect.top) / parseInt(container_style.height)) * 2 + 1;

}

function onDocumentMouseDown(event) {
  event.preventDefault();

  //get "layout_render" location coordinates to correct raycasting
  var rect = document.getElementById("layout_render").getBoundingClientRect();
  var container_style = document.getElementById("layout_render").style

  // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouse.x = ((event.clientX-rect.left) / parseInt(container_style.width)) * 2 - 1;
  mouse.y = -((event.clientY-rect.top) / parseInt(container_style.height)) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    intersects[0].object.callback();
  }
}

export default renderEngine;
