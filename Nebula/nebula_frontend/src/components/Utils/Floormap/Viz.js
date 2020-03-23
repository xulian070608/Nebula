import * as THREE from "three";
import axios from "axios";
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";

import EnvironmentLight from "./lights";
import RoomGenerator from "./Mesh";
import Camera, { calculateRegion } from "./Camera";
import CameraControl from "./CameraControl";
import PopperX from "./PopperControl";

import HelperMode from "./helpers";
import styles from "./styles";

import { withStyles } from "@material-ui/core/styles";

function Viz(props) {
  const { useRef, useEffect, useState } = React;
  const mount = useRef(null);
  const floor_uuid = props.floor_uuid;
  // const base_api = "http://100.94.29.214:8000/apis/v1/rooms/?level_id=";
  const base_api = "http://127.0.0.1:8000/apis/v1/rooms/?level_id=";
  const url = base_api + floor_uuid;
  var meshArray = [];
  var GroupBB3, camera, scene;
  var targetWidth, targetHeight;
  var isButtonOn = false;
  var isDrag = false;
  var mouse = new THREE.Vector2();
  var raycaster = new THREE.Raycaster();
  var timmerHandle, INTERSECTED;
  const [isTouched, setIsTouched] = useState(Boolean);
  const [roomInfo, setRoomInfo] = useState({
    roomName: String,
    roomNumber: String,
    deskCount: Number,
    physicalDeskCount: Number
  });

  useEffect(() => {
    retriveData(url);
  }, []);

  function retriveData(url) {
    axios.get(url).then(res => {
      // console.log(res);
      res.data.results.map(data => meshArray.push(new RoomGenerator(data)));
      if (res.data.next !== null) {
        retriveData(res.data.next);
      } else {
        showView(meshArray);
      }
    });
  }

  function showView(meshArray) {
    targetWidth = mount.current.clientWidth;
    targetHeight = mount.current.clientHeight;

    // scene settings
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // renderer settings
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("rgb(120, 120, 120)");
    renderer.setSize(targetWidth, targetHeight);

    // add objects into scene
    var groupA = new THREE.Group();
    meshArray.forEach(mesh => {
      groupA.add(mesh);
    });

    // center mesh group based on (0,0,0) using boundingBox
    GroupBB3 = new THREE.Box3();
    GroupBB3.setFromObject(groupA)
      .getCenter(groupA.position)
      .multiplyScalar(-1);

    // var b3helper = new THREE.Box3Helper(GroupBB3, 0x000000);
    // scene.add(b3helper);

    scene.add(groupA);

    // add environment lights on the scene
    const environmentLight = new EnvironmentLight();
    scene.add(environmentLight);

    // add camera into scene
    camera = new Camera({
      bb3: GroupBB3,
      targetWidth: targetWidth,
      targetHeight: targetHeight
    });
    scene.add(camera);

    const controls = new CameraControl({
      camera: camera,
      renderer: renderer
    });

    // show helpers for devlopment mode
    const helpers = new HelperMode({
      mode: "off", // 'on' or 'off'
      // envLights: environmentLight,
      showAxes: true
      // camera: camera,
    });
    scene.add(helpers);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      targetWidth = mount.current.clientWidth;
      targetHeight = mount.current.clientHeight;
      renderer.setSize(targetWidth, targetHeight);
      const { width, height } = calculateRegion({
        bb3: GroupBB3,
        targetWidth: targetWidth,
        targetHeight: targetHeight
      });
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      renderScene();
    };

    const animate = () => {
      renderScene();
      window.requestAnimationFrame(animate);
      controls.update();
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener("resize", handleResize);
    mount.current.addEventListener("mousemove", onMouseMove, false);
    mount.current.addEventListener("mousedown", onMouseDown, false);
    mount.current.addEventListener("mouseup", onMouseUp, false);
    var button = document.getElementById("button");
    button.addEventListener("click", onButtonClick, false);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.current.removeChild(renderer.domElement);
      meshArray.forEach(mesh => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    };
  }

  function onButtonClick(event) {
    event.preventDefault();
    isButtonOn = !isButtonOn;
    var roomObjects = scene.children[0].children;
    if (isButtonOn) {
      roomObjects.forEach(room => {
        let programType = room.programType;
        if (programType === "WORK") {
          let deskCount = room.deskCount;
          if (deskCount > 10) {
            room.material.color.setHex(0xfc03f0);
          } else {
            room.material.color.setHex(0x646464);
          }
        }
      });
    } else {
      roomObjects.forEach(room => {
        let programType = room.programType;
        if (programType === "WORK") {
          let hasWindow = room.hasWindow;
          if (hasWindow) {
            room.material.color.setHex(0xe4f3f7);
          } else {
            room.material.color.setHex(0xabdde7);
          }
        }
      });
    }

    // console.log(scene.children);
  }

  function onMouseDown() {
    // console.log("mouse down");
    isDrag = false;
    timmerHandle = setTimeout(() => {
      // console.log("draging");
      isDrag = true;
    }, 200);
  }

  function updateMousePos(x, y) {
    mouse.x = (x / targetWidth) * 2 - 1;
    mouse.y = -(y / targetHeight) * 2 + 1;
    // console.log(mouse.x, mouse.y);
  }

  function onMouseMove(event) {
    event.preventDefault();
    updateMousePos(event.offsetX, event.offsetY);

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children[0].children);

    // if there is one (or more) intersections
    if (intersects.length > 0) {
      // if the closest object intersected is not the currently stored intersection object
      if (intersects[0].object !== INTERSECTED) {
        // restore previous intersection object (if is exists) to its original color
        if (INTERSECTED) {
          INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        }
        // store reference to closest object as current intersection object
        INTERSECTED = intersects[0].object;
        setRoomInfo({
          roomName: INTERSECTED.roomName,
          roomNumber: INTERSECTED.roomNumber,
          deskCount: INTERSECTED.deskCount,
          physicalDeskCount: INTERSECTED.physicalDeskCount
        });
        setIsTouched(true);
        // store color of closest object (for later restoration)
        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
        // set a new color for closest object
        INTERSECTED.material.color.setHex(0xffffff);
      }
    } // there are no intersections
    else {
      // restore previous intersection object (if it exists) to its orginal color
      if (INTERSECTED) {
        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      }
      // remove previous intersection object reference to "nothing"
      INTERSECTED = null;
      setIsTouched(false);
    }
  }

  function onMouseUp(event) {
    event.preventDefault();
    updateMousePos(event.offsetX, event.offsetY);

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children[0].children);

    if (!isDrag) {
      clearTimeout(timmerHandle);
      if (intersects.length > 0) {
        intersects[0].object.callback();
      }
    } else {
      isDrag = false;
      // console.log("draging over");
    }
  }

  const classes = styles();
  return (
    <div>
      <div className={classes.root} ref={mount}></div>
      <Button id="button" className={classes.button} variant="outlined">
        Show
      </Button>
      {isTouched ? (
        <PopperX isTouched={isTouched} roomInfo={roomInfo}></PopperX>
      ) : null}
    </div>
  );
}

export default Viz;
