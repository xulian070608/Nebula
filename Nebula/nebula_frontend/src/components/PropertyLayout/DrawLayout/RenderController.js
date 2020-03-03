import * as THREE from "three";

class RenderController {
  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // var container_style = document.getElementById("layout_render").style
    // this.renderer.setSize(parseInt(container_style.width), parseInt(container_style.height));
    // this.renderer.setClearColor("rgb(120, 120, 120)");
    // document.getElementById("layout_render").appendChild(this.renderer.domElement);
  }

  renderer() {
    return this.renderer;
  }
}

export default RenderController;
