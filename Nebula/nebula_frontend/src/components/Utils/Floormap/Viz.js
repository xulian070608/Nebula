/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from "three";
import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import EnvironmentLight from "./lights";
import RoomGenerator from "./Mesh";
import Camera, { calculateRegion } from "./Camera";
import CameraControl from "./CameraControl";
import PopperX from "./PopperControl";
import RoomInfoModal from "./RoomInfoModal";

import HelperMode from "./helpers";
import styles from "./styles";
import { useFetchList } from "../useFetch";
import { ProjectsURL } from "../Constant";

function Viz(props) {
  const { useRef, useEffect, useState } = React;
  const mount = useRef(null);
  const floorID = props.floorID;
  const currentProjectID = props.currentProjectID;
  const url = ProjectsURL + currentProjectID + "/floors/" + floorID + "/rooms/";
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
    physicalDeskCount: Number,
  });
  const [open, setOpen] = useState(false);
  const [roomID, setRoomID] = useState(null);

  const { data: rooms, loaded } = useFetchList(url);

  useEffect(() => {
    let targetWidth = mount.current.clientWidth;
    let targetHeight = mount.current.clientHeight;

    // scene settings
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // renderer settings
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("rgb(120, 120, 120)");
    renderer.setSize(targetWidth, targetHeight);

    // add objects into scene
    var primaryGroup = new THREE.Group();
    primaryGroup.name = "primary";
    var secondaryWork = new THREE.Group();
    secondaryWork.name = "secondary_work";
    var secondaryExtra = new THREE.Group();
    secondaryExtra.name = "secondary_extra";

    // create meshes based on returned data
    let meshArray = [];
    rooms.forEach((res) =>
      meshArray.push(
        new RoomGenerator({ id: res.id, attributes: res.attributes })
      )
    );

    // seperate meshes into several groups
    meshArray.forEach((mesh) => {
      if (mesh.userData.programType) {
        if (
          mesh.userData.programType === "WORK" ||
          mesh.userData.programType === "MEET"
        ) {
          secondaryWork.add(mesh);
        } else {
          secondaryExtra.add(mesh);
        }
      } else {
        secondaryExtra.add(mesh);
      }
    });
    primaryGroup.add(secondaryWork);
    primaryGroup.add(secondaryExtra);
    // center mesh group based on (0,0,0) using boundingBox
    let GroupBB3 = new THREE.Box3();
    GroupBB3.setFromObject(primaryGroup)
      .getCenter(primaryGroup.position)
      .multiplyScalar(-1);

    // var b3helper = new THREE.Box3Helper(GroupBB3, 0x000000);
    // scene.add(b3helper);

    scene.add(primaryGroup);

    // add environment lights on the scene
    const environmentLight = new EnvironmentLight();
    scene.add(environmentLight);

    // add camera into scene
    let camera = new Camera({
      bb3: GroupBB3,
      targetWidth: targetWidth,
      targetHeight: targetHeight,
    });
    scene.add(camera);

    const controls = new CameraControl({
      camera: camera,
      renderer: renderer,
    });

    // show helpers for devlopment mode
    const helpers = new HelperMode({
      mode: "off", // 'on' or 'off'
      // envLights: environmentLight,
      showAxes: true,
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
        targetHeight: targetHeight,
      });
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      renderScene();
    };

    const onButtonClick = (event) => {
      event.preventDefault();
      isButtonOn = !isButtonOn;
      const secondaryWorkMeshes = scene.getObjectByName("secondary_work");
      if (secondaryWorkMeshes) {
        var meshes = secondaryWorkMeshes.children;
      }
      if (isButtonOn) {
        meshes.forEach((mesh) => {
          let programType = mesh.userData.programType;
          if (programType === "WORK") {
            let deskcount = mesh.userData.deskcount;
            if (deskcount > 10) {
              mesh.material.color.setHex(0xfc03f0);
            } else {
              mesh.material.color.setHex(0x646464);
            }
          }
        });
      } else {
        meshes.forEach((mesh) => {
          let programType = mesh.userData.programType;
          if (programType === "WORK") {
            let hasWindow = mesh.userData.hasWindow;
            if (hasWindow) {
              mesh.material.color.setHex(0xe4f3f7);
            } else {
              mesh.material.color.setHex(0xabdde7);
            }
          }
        });
      }
    };

    const onMouseDown = () => {
      // console.log("mouse down");
      isDrag = false;
      timmerHandle = setTimeout(() => {
        // console.log("draging");
        isDrag = true;
      }, 200);
    };

    const updateMousePos = (x, y) => {
      mouse.x = (x / targetWidth) * 2 - 1;
      mouse.y = -(y / targetHeight) * 2 + 1;
      // console.log(mouse.x, mouse.y);
    };

    const onMouseMove = (event) => {
      event.preventDefault();
      updateMousePos(event.offsetX, event.offsetY);

      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      const rooms = scene.getObjectByName("secondary_work");

      // calculate objects intersecting the picking ray
      if (rooms) {
        var intersects = raycaster.intersectObjects(rooms.children);
      }

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
            roomName: INTERSECTED.userData.roomName,
            roomNumber: INTERSECTED.userData.roomNumber,
            deskcount: INTERSECTED.userData.deskcount,
            physicalDeskcount: INTERSECTED.userData.physicalDeskcount,
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
    };

    const onMouseUp = (event) => {
      event.preventDefault();
      updateMousePos(event.offsetX, event.offsetY);

      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      const rooms = scene.getObjectByName("secondary_work");

      // calculate objects intersecting the picking ray
      if (rooms) {
        var intersects = raycaster.intersectObjects(rooms.children);
      }

      if (!isDrag) {
        clearTimeout(timmerHandle);
        if (intersects.length > 0) {
          setRoomID(intersects[0].object.userData.roomID);
          setOpen(true);
          // intersects[0].object.callback();
          // console.log(intersects[0].object);
        }
      } else {
        isDrag = false;
        // console.log("draging over");
      }
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
      mount.current.removeEventListener("mousemove", onMouseMove);
      mount.current.removeEventListener("mousedown", onMouseDown);
      mount.current.removeEventListener("mouseup", onMouseUp);
      mount.current.removeChild(renderer.domElement);
      button.removeEventListener("click", onButtonClick);
      meshArray.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    };
  }, [loaded, rooms]);

  const classes = styles();
  return (
    <div className={classes.root}>
      <div className={classes.viz} ref={mount}></div>
      <Button id="button" className={classes.button} variant="outlined">
        >10 desks
      </Button>
      {isTouched ? (
        <PopperX isTouched={isTouched} roomInfo={roomInfo}></PopperX>
      ) : null}
      {roomID ? (
        <Modal
          className={classes.modal}
          anchor="left"
          open={open}
          onClose={() => {
            setOpen(false);
            setRoomID(null);
          }}
        >
          <RoomInfoModal
            currentProjectID={currentProjectID}
            floorID={floorID}
            roomID={roomID}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default Viz;
