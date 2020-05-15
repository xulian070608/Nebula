import * as THREE from "three";

function SignGenerator(mesh) {
  // calculate the location of this text
  mesh.geometry.computeBoundingBox();
  const bb3 = mesh.geometry.boundingBox;
  const centroidX = (bb3.max.x + bb3.min.x) / 2;
  const centroidY = (bb3.max.y + bb3.min.y) / 2;

  var img_path;
  switch (mesh.roomName) {
    case "MEN WC":
      img_path = "https://api.c3plus.top/media/images/origin/man.png";
      break;
    case "WOMEN WC":
      img_path = "https://api.c3plus.top/media/images/origin/woman.png";
      break;
    case "UNISEX":
      img_path =
        "https://api.c3plus.top/media/images/origin/man-woman_KvpnENb.png";
      break;
    default:
      return new THREE.Object3D();
  }

  var spriteMap = new THREE.TextureLoader().load(img_path);
  var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
  var sprite = new THREE.Sprite(spriteMaterial);

  let scalar = 900;
  sprite.scale.multiplyScalar(scalar);
  sprite.position.set(centroidX, centroidY, 600);

  return sprite;

  // var texture = new THREE.TextureLoader().load("../img/meeting.png");

  // var material = new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff });
  // // create a sprite
  // var spriteMaterial = new THREE.SpriteMaterial({
  //   color: 0xffffff,
  //   map: texture
  // });
  // let sprite = new THREE.Sprite(material);
  // sprite.position.z = 3;
  // return sprite;

  // * local images cannot be loaded
  // var spriteMap = new THREE.TextureLoader().load(
  //   "http://127.0.0.1:3002/meeting.png"
  // );
  // console.log(spriteMap);
  // var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
  // console.log(spriteMaterial);
  // var sprite = new THREE.Sprite(spriteMaterial);
  // sprite.position.set(0, 0, 10);
  // // var imageWidth = spriteMaterial.map.image.width;
  // // var imageHeight = spriteMaterial.map.image.height;
  // // sprite.scale.set(2 * imageWidth, 2 * imageHeight, 1.0);
  // scene.add(sprite);
}

export default SignGenerator;
