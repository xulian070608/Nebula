import * as THREE from "three";

const colorSchema = {
  WORK: 0xabdde7,
  MEET: 0xb7f0d9,
  OPERATE: 0xe2e2e2,
  SERVE: 0xffd26a,
  WE: 0xffd26a,
  CIRCULATE: 0xfff7df,
  WASH: 0xc3c3c3
};

function RoomGenerator(roomInfo) {
  const {
    level_id,
    room_revit_id,
    room_uuid,
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
    level_revit_id
  } = roomInfo;

  var roomGeometry = GeometryShape(outline);
  var color = new THREE.MeshBasicMaterial({ color: colorSchema[program_type] });
  var mesh = new THREE.Mesh(roomGeometry, color);
  mesh.rotation.x = (-90 / 180) * Math.PI;

  mesh.callback = function() {
    alert(room_name + " " + room_number);
  };

  return mesh;
}

function GeometryShape(outline) {
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

  var extrudeSettings = { depth: 1, bevelEnabled: false };
  var geometry = new THREE.ExtrudeGeometry(geometryShape, extrudeSettings);

  return geometry;
}

export default RoomGenerator;
