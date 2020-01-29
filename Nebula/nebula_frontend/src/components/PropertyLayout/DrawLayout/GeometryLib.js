import * as THREE from "three";

function boxWithHole() {
  var boxCorner1 = new THREE.Vector2(-2, -2);
  var boxCorner2 = new THREE.Vector2(-2, 2);
  var boxCorner3 = new THREE.Vector2(2, 2);
  var boxCorner4 = new THREE.Vector2(2, -2);
  var pointArray = [boxCorner1, boxCorner2, boxCorner3, boxCorner4];
  var boxShape = new THREE.Shape(pointArray);

  var holeCorner1 = new THREE.Vector2(-1, -1);
  var holeCorner2 = new THREE.Vector2(-1, 1);
  var holeCorner3 = new THREE.Vector2(1, 1);
  var holeCorner4 = new THREE.Vector2(1, -1);
  var holeArray = [holeCorner1, holeCorner2, holeCorner3, holeCorner4];
  boxShape.holes = [new THREE.Path(holeArray)];

  var extrudeSettings = { depth: 1, bevelEnabled: false };

  var geometry = new THREE.ExtrudeGeometry(boxShape, extrudeSettings);

  var mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: 0xabdde7
    })
  );

  mesh.rotation.x = (-90 / 180) * Math.PI;
  mesh.name = "Ame";

  mesh.callback = function() {
    alert("Hello!");
  };

  return mesh;
}

export { boxWithHole };
