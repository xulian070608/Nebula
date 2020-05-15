import TextTexture from "three.texttexture";
import * as THREE from "three";

function TextGenerator(mesh) {
  // Option 1: use three.texttexture to show text
  // these option only worked on 19.0.0 version
  // DO NOT UPDATE TO THE LATEST VERISON

  // calculate the location of this text
  mesh.geometry.computeBoundingBox();
  const bb3 = mesh.geometry.boundingBox;
  const centroidX = (bb3.max.x + bb3.min.x) / 2;
  const centroidY = (bb3.max.y + bb3.min.y) / 2;
  let text = mesh.roomNumber;

  // text texture settings
  let texture = new TextTexture({
    text: text,
    fontSize: 64,
    fontFamily: "Arial, Helvetica, sans-serif",
    align: "center",
    fontWeight: "bold", // normal, bold, bolder, lighter
    fontStyle: "normal", // normal, italic, oblique,
  });
  let material = new THREE.SpriteMaterial({
    color: "rgb(0,0,0)",
    map: texture,
  });
  let sprite = new THREE.Sprite(material);

  // deal with text with multiple lines
  let scalar = 900;
  const breaklines = text.split("\n").length;
  if (breaklines > 1) {
    scalar = breaklines * (scalar - 0.26);
  }

  // resize the sprite depending on aspect
  let w = texture.image.width;
  let h = texture.image.height;
  // console.log(text, w, h);
  sprite.scale.set(1, 1, 1);
  sprite.scale.setX(w / h).multiplyScalar(scalar);

  sprite.position.set(centroidX, centroidY, 600);

  // // Option 2: create canvas directly
  // // using canvas to draw text
  // let canvas = document.createElement("canvas");
  // let ctx = canvas.getContext("2d");
  // ctx.fillStyle = "#000000";
  // ctx.font = "Bold 64px Arial";
  // ctx.lineWidth = 4;
  // ctx.fillText(text, 60, 100);
  // ctx.textAlign = "center";
  // let texture = new THREE.Texture(canvas);
  // texture.needsUpdate = true;

  // // use sprite to map the text texture
  // let material = new THREE.SpriteMaterial({ map: texture });
  // let sprite = new THREE.Sprite(material);
  return sprite;
}

export default TextGenerator;
