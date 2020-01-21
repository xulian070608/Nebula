import * as THREE from "three";

class RenderController {
  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("rgb(120, 120, 120)");
    document.getElementById("root").appendChild(this.renderer.domElement);
  }

  renderer() {
    return this.renderer;
  }
}

export default RenderController;
