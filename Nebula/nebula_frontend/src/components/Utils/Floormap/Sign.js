import * as THREE from "three";

function SignGenerator() {
  var texture = new THREE.TextureLoader().load("../img/meeting.png");

  var material = new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff });
  // create a sprite
  var spriteMaterial = new THREE.SpriteMaterial({
    color: 0xffffff,
    map: texture
  });
  let sprite = new THREE.Sprite(material);
  sprite.position.z = 3;
  return sprite;

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
