import * as THREE from "three";

function SignGenerator(mesh, gravityCenter) {
  // calculate the location of this text
  mesh.geometry.computeBoundingBox();
  // const bb3 = mesh.geometry.boundingBox;
  // const centroidX = (bb3.max.x + bb3.min.x) / 2;
  // const centroidY = (bb3.max.y + bb3.min.y) / 2;
  const centroidX = gravityCenter.gravityX;
  const centroidY = gravityCenter.gravityY;

  var img_path;
  switch (mesh.userData.roomName) {
    case "MEN WC":
      img_path = "https://api.c3plus.top/media/images/origin/wc_m2x.png";
      break;
    case "W RESTROOM":
    case "WOMEN WC":
      img_path = "https://api.c3plus.top/media/images/origin/wc_f2x.png";
      break;
    case "RESTROOM":
    case "UNISEX":
      img_path = "https://api.c3plus.top/media/images/origin/wc_u2x.png";
      break;
    case "VIP Lounge":
    case "MINI LOUNGE":
    case "LOUNGE":
      img_path = "https://api.c3plus.top/media/images/origin/lounge.png";
      break;
    case "IT":
      img_path = "https://api.c3plus.top/media/images/origin/IT_room2x.png";
      break;
    case "MAIL":
      img_path = "https://api.c3plus.top/media/images/origin/mail_room2x.png";
      break;
    case "PHONE BOOTH":
      img_path = "https://api.c3plus.top/media/images/origin/phone_booth2x.png";
      break;
    case "Cafe":
    case "PANTRY":
      img_path = "https://api.c3plus.top/media/images/origin/pantry2x.png";
      break;
    case "PRINTER":
      img_path = "https://api.c3plus.top/media/images/origin/printer2x.png";
      break;
    case "STOR":
      img_path = "https://api.c3plus.top/media/images/origin/storage2x.png";
      break;
    case "STAIR FOYER":
      img_path = "https://api.c3plus.top/media/images/origin/stair.png";
      break;
    case "MOTHER RM":
      img_path = "https://api.c3plus.top/media/images/origin/motherroom2x.png";
      break;
    case "MOP":
      img_path = "https://api.c3plus.top/media/images/origin/maintenance2x.png";
      break;
    case "MECH":
      img_path = "https://api.c3plus.top/media/images/origin/mechanical2x.png";
      break;
    case "ADA":
      img_path = "https://api.c3plus.top/media/images/origin/wc_ada.png";
      break;
    case "COMMUNITY BAR":
      img_path = "https://api.c3plus.top/media/images/origin/we_reception.png";
      break;
    default:
      return new THREE.Object3D();
  }

  var spriteMap = new THREE.TextureLoader().load(img_path);
  var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
  var sprite = new THREE.Sprite(spriteMaterial);

  let scalar = 1000;
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
