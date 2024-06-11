import * as THREE from "three";

const material = new THREE.MeshLambertMaterial({ color: 0xffffff });

class Figure {
  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ry: 0,
      ...params,
    };

    this.group = new THREE.Group();
    scene.add(this.group);
  }

  createBody() {
    const geometry = new THREE.BoxGeometry(1, 1.5, 1);
    const body = new THREE.Mesh(geometry, material);
    this.group.add(body);
  }
  init() {
    this.createBody();
  }
}
function test() {
  console.log("this works");
}
