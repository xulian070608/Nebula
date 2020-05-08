import * as THREE from "three";
import TextGenerator from "./Text";
import SignGenerator from "./Sign";
import { colorSchema } from "../Constant";

function RoomGenerator(roomInfo) {
  const {
    // level_id,
    // room_revit_id,
    // room_uuid,
    room_name,
    room_number,
    area,
    has_window,
    deskcount,
    physical_deskcount,
    program_type,
    internal_room_count,
    has_av,
    outline,
    // level_revit_id
  } = roomInfo;

  var mesh;

  if (program_type === "WORK" || program_type === "MEET") {
    // change color for WORK room has window
    let roomColor;
    switch (has_window) {
      case true:
        roomColor = 0xe4f3f7;
        break;
      default:
        roomColor = colorSchema[program_type];
    }

    let roomGeometry = createShape(outline);
    var roomMaterial = new THREE.MeshPhongMaterial({
      color: roomColor,
      side: THREE.BackSide,
      transparent: false,
      shininess: 0,
    });
    mesh = new THREE.Mesh(roomGeometry, roomMaterial);

    // set an attribute for the object
    mesh.roomName = room_name;
    mesh.roomNumber = room_number;
    mesh.area = area;
    mesh.deskCount = deskcount;
    mesh.physicalDeskCount = physical_deskcount;
    mesh.internalRoomCount = internal_room_count;
    mesh.hasAV = has_av;
    mesh.programType = program_type;
    mesh.hasWindow = has_window;

    // add room number text on rooms
    const roomText = new TextGenerator(mesh);
    mesh.add(roomText);

    // add frame lines for the rooms
    let roomFrameEdges = new THREE.EdgesGeometry(roomGeometry, 1);
    let edgeMtl = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1,
    });
    let roomFrameLines = new THREE.LineSegments(roomFrameEdges, edgeMtl);
    mesh.add(roomFrameLines);

    // avoid the overlap with planes
    mesh.position.z = 1;

    // set a method for the object
    mesh.callback = function () {
      alert(room_name + " " + room_number);
    };

    return mesh;
  } else {
    let roomGeometry = planeShape(outline);
    let roomMaterial = new THREE.LineBasicMaterial({
      color: colorSchema[program_type],
    });
    mesh = new THREE.Mesh(roomGeometry, roomMaterial);

    mesh.roomName = room_name;
    mesh.roomNumber = room_number;
    mesh.hasAV = has_av;
    mesh.programType = program_type;

    mesh.receiveShadow = true;
    if (program_type === "WE") {
      mesh.position.z = 0.5;
    }
    const roomSign = new SignGenerator(mesh);
    mesh.add(roomSign);
    return mesh;
  }
}

function createShape(outline) {
  var roomBoundary = outline.coordinates;
  var roomExterior = roomBoundary[0];
  var exteriorPointArray = [];

  for (let i = 0; i < roomExterior.length; i++) {
    let x = roomExterior[i][0];
    let y = roomExterior[i][1];
    let point = new THREE.Vector2(x, y);
    exteriorPointArray.push(point);
  }

  var geometryShape = new THREE.Shape(exteriorPointArray);

  if (roomBoundary.length > 1) {
    var roomHoles = roomBoundary.slice(1, roomBoundary.length);
    var HolesArray = [];
    for (let i = 0; i < roomHoles.length; i++) {
      var HoleArray = [];
      for (let j = 0; j < roomHoles[i].length; j++) {
        let x = roomHoles[i][j][0];
        let y = roomHoles[i][j][1];
        let point = new THREE.Vector2(x, y);
        HoleArray.push(point);
      }
      HolesArray.push(new THREE.Path(HoleArray));
    }
    geometryShape.holes = HolesArray;
  }

  var extrudeSettings = { steps: 1, depth: 1500, bevelEnabled: false };
  var geometry = new THREE.ExtrudeBufferGeometry(
    geometryShape,
    extrudeSettings
  );

  return geometry;
}

function planeShape(outline) {
  var roomBoundary = outline.coordinates;
  var roomExterior = roomBoundary[0];
  var exteriorPointArray = [];

  for (let i = 0; i < roomExterior.length; i++) {
    let x = roomExterior[i][0];
    let y = roomExterior[i][1];
    let point = new THREE.Vector2(x, y);
    exteriorPointArray.push(point);
  }
  var geometryShape = new THREE.Shape(exteriorPointArray);
  var geometry = new THREE.ShapeBufferGeometry(geometryShape);

  return geometry;
}

export default RoomGenerator;
