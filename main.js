// import * as THREE from "three";
import * as THREE from "../node_modules/three/build/three.module.js
// import { Figure } from "./modules/character.js";
// import { test } from "./modules/character.js";
// import { Camera, GreaterStencilFunc, Mesh, RGB_ETC1_Format } from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { degToRad } from "three/src/math/MathUtils";
//
let mouseClicked = false;
var cursor = {};
cursor.x = 0;
cursor.y = 0;

var lines = [];

let scrollY = window.scrollY;

const scene = new THREE.Scene();

//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.setZ(30);
cameraGroup.add(camera);

renderer.render(scene, camera);

//-----------------------------------------
//               Characters
//-----------------------------------------

class Figure {
  constructor(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.bodyGroup = new THREE.Group();
    this.armGroup01 = new THREE.Group();
    this.armGroup02 = new THREE.Group();
    this.legGroup01 = new THREE.Group();
    this.legGroup02 = new THREE.Group();
    this.armGroup01.position.set(1, 1.8, 0);
    this.armGroup02.position.set(-1, 1.8, 0);
    this.legGroup01.position.set(-0.5, -2.5, 0);
    this.legGroup02.position.set(0.5, -2.5, 0);

    this.bodyGroup.position.set(x, y, z);
    scene.add(this.bodyGroup);
    console.log("Created Character");
    this.waveValue = r;
    this.walkValue = r;
    this.jumpValue = r;
  }

  createBody() {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2, 5, 2),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0xff0000,
      }),
    );
    body.position.set(0, 0, 0);
    this.bodyGroup.add(body);
  }
  createHead() {
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 16),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x00ff00,
      }),
    );
    head.position.set(0, 4, 0);
    this.bodyGroup.add(head);
  }
  createEyes() {
    const eye01 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 16),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x000000,
      }),
    );
    const eye02 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 16),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x000000,
      }),
    );
    eye01.position.set(0.5, 4, 1.5);
    eye02.position.set(-0.5, 4, 1.5);
    this.bodyGroup.add(eye01);
    this.bodyGroup.add(eye02);
  }
  createArms() {
    const arm01 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 4, 0.5),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x000000,
      }),
    );
    const arm02 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 4, 0.5),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x000000,
      }),
    );
    arm01.position.set(0, -2, 0);
    arm02.position.set(0, -2, 0);
    this.armGroup01.add(arm01);
    this.armGroup02.add(arm02);
  }
  createLegs() {
    const leg01 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 5, 0.5),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x000000,
      }),
    );
    const leg02 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 5, 0.5),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x000000,
      }),
    );
    leg01.position.set(0, -2.5, 0);
    leg02.position.set(0, -2.5, 0);
    this.legGroup01.add(leg01);
    this.legGroup02.add(leg02);
  }
  init() {
    this.createBody();
    this.createHead();
    this.createEyes();
    this.createArms();
    this.bodyGroup.add(this.armGroup01);
    this.bodyGroup.add(this.armGroup02);
    this.createLegs();
    this.bodyGroup.add(this.legGroup01);
    this.bodyGroup.add(this.legGroup02);
  }
  // Animations:
  leftwave() {
    this.waveValue += 0.08;
    this.armGroup01.rotation.z = Math.sin(this.waveValue) * 1.0 + 1.5;
  }
  rightwave() {
    this.waveValue += 0.08;
    this.armGroup02.rotation.z = -Math.sin(this.waveValue) * 1.0 - 1.5;
  }
  walk() {
    this.walkValue += 0.1;
    this.legGroup01.rotation.x = Math.sin(this.walkValue) * 0.8;
    this.legGroup02.rotation.x = -Math.sin(this.walkValue) * 0.8;
  }
  jump() {
    if (Math.sin(this.jumpValue) < 0) {
      this.bodyGroup.position.set(this.x, this.y, this.z);
      this.jumpValue += 0.3;
    } else {
      this.jumpValue += 0.1;
      this.bodyGroup.position.set(
        this.x,
        this.y + Math.sin(this.jumpValue) * 3,
        this.z,
      );
    }
  }
}
const character01 = new Figure(-20, -162, 0, 10);
character01.bodyGroup.rotation.y = 0.55;
character01.init();
const character02 = new Figure(-12, -162, 0, 7);
character02.bodyGroup.rotation.y = 0.4;
character02.init();
// character.armGroup01.rotation.z = 1.5;

// scene.add(character.group);

// const test_sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 16, 11),
//   new THREE.MeshStandardMaterial({
//     wireframe: true,
//     color: 0x000000,
//   }),
// );
// test_sphere.position.set(0, 0, 20);
// scene.add(test_sphere);
//-----------------------------------------
//               Hub Planet
//-----------------------------------------
const hubPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 16),
  new THREE.MeshStandardMaterial({
    wireframe: true,
    color: 0x000000,
  }),
);

let vectorhP = new THREE.Vector3(30, 10, -20);
hubPlanet.position.copy(vectorhP);
scene.add(hubPlanet);
//-----------------------------------------
//                 Moon
//-----------------------------------------
const moonAxis = new THREE.Mesh(
  new THREE.SphereGeometry(0, 0, 0),
  new THREE.MeshStandardMaterial({
    wireframe: true,
    color: 0x000000,
  }),
);

let vectormA = new THREE.Vector3(30, 10, -20);
moonAxis.position.copy(vectormA);
scene.add(moonAxis);

const sPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 16, 11),
  new THREE.MeshStandardMaterial({
    wireframe: true,
    color: 0x000000,
  }),
);
let vectorsP = new THREE.Vector3(30, 10, -20);
sPlanet.position.copy(vectorsP);
moonAxis.add(sPlanet);
//-----------------------------------------
//                  Stars
//-----------------------------------------
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(400).fill().forEach(addStar);
//-----------------------------------------
//                Rocket
//-----------------------------------------
const rocket = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 11),
  new THREE.MeshStandardMaterial({
    wireframe: true,
    color: 0x000000,
  }),
);
let vectorsR = new THREE.Vector3(-3, 1, 27);
rocket.position.copy(vectorsR);
// scene.add(rocket);
//-----------------------------------------
//                Lines
//-----------------------------------------
// function addLine(l) {
//   const line = new THREE.Mesh(
//     new THREE.BoxGeometry(50, 0.5, 0.5),
//     new THREE.MeshStandardMaterial({ color: 0x000000 }),
//   );
//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(200));

//   line.position.set(0, -70 - l * 7, 0);
//   scene.add(line);
// }

// for (var i = 0; i < 3; i++) {
//   lines[i] = addLine(i);
// }

//-----------------------------------------
//        Github Cube
//-----------------------------------------
let gitHubCubes = [];
function addGitHubCubes(l) {
  let projects = [
    "githubProjects/four.png",
    "githubProjects/iceCube.png",
    "githubProjects/Jup.png",
    "githubProjects/kalman.png",
    "githubProjects/Math.png",
    "githubProjects/Network.png",
  ];
  const temp_cube = new THREE.Mesh(
    new THREE.BoxGeometry(20, 10, 1),
    new THREE.MeshStandardMaterial({
      // wireframe: true,
      // color: 0x000000,
      map: THREE.ImageUtils.loadTexture(projects[l]),
    }),
  );
  if (l == 0) temp_cube.position.set(-12, -69, 0);
  if (l == 1) temp_cube.position.set(12, -69, 0);
  if (l == 2) temp_cube.position.set(-12, -80, 0);
  if (l == 3) temp_cube.position.set(12, -80, 0);
  if (l == 4) temp_cube.position.set(-12, -91, 0);
  if (l == 5) temp_cube.position.set(12, -91, 0);
  else;
  scene.add(temp_cube);
  return temp_cube;
}

for (var i = 0; i < 6; i++) {
  gitHubCubes[i] = addGitHubCubes(i);
}

//-----------------------------------------
//        Hobbies Cube
//-----------------------------------------
class HobbieCubes {
  constructor() {
    this.cubes = [];
    this.rotationVal = 0;
    this.hobbies = [
      "hobbiePictures/climbing.JPG",
      "hobbiePictures/endeavour.png",
      "hobbiePictures/cycling.JPG",
    ];
  }
  createCubes(i, max) {
    const temp_cube = new THREE.Mesh(
      new THREE.BoxGeometry(18, 27, 0.5),
      new THREE.MeshStandardMaterial({
        // wireframe: true,
        // color: 0x000000,
        map: THREE.ImageUtils.loadTexture(this.hobbies[i]),
      }),
    );
    temp_cube.position.set(
      -10 + 20 * Math.sin((i * 2 * Math.PI) / max),
      -120,
      -5 + 10 * Math.cos((i * 2 * Math.PI) / max),
    );
    scene.add(temp_cube);
    return temp_cube;
  }
  stall() {
    var closest_Cube = 0;
    var closest_Cube_Thresh = this.cubes[0].position.z;
    for (var i = 1; i < this.hobbies.length; i++) {
      if (this.cubes[i].position.z > closest_Cube_Thresh) {
        closest_Cube = i;
        closest_Cube_Thresh = this.cubes[i].position.z;
      }
    }
    var distance_from_front = this.cubes[closest_Cube].position.z;
    if (5 - Math.abs(this.cubes[closest_Cube].position.z) < 0.01) {
    } else if (this.cubes[closest_Cube].position.x > -12)
      this.rotateCubes(-0.1 / distance_from_front);
    else this.rotateCubes(0.1 / distance_from_front);
  }
  rotateCubes(change_angle) {
    this.rotationVal += change_angle;
    for (var i = 0; i < this.hobbies.length; i++) {
      this.cubes[i].position.set(
        -12 +
          12 *
            Math.sin(
              (i * 2 * Math.PI) / this.hobbies.length + this.rotationVal,
            ),
        -120,
        -5 +
          10 *
            Math.cos(
              (i * 2 * Math.PI) / this.hobbies.length + this.rotationVal,
            ),
      );
    }
  }
  init() {
    for (var i = 0; i < this.hobbies.length; i++) {
      this.cubes[i] = this.createCubes(i, this.hobbies.length);
    }
  }
}
const hobyCubes = new HobbieCubes();
hobyCubes.init();

//-----------------------------------------
//      BezierCurve
//-----------------------------------------
// const curve = new THREE.CubicBezierCurve3(
//   new THREE.Vector3(-10, 0, 0),
//   new THREE.Vector3(-5, 15, 0),
//   new THREE.Vector3(20, 15, 0),
//   new THREE.Vector3(10, 0, 0),
// );

// const points = curve.getPoints(50);
// const geometry = new THREE.BufferGeometry().setFromPoints(points);

// const material = new THREE.LineBasicMaterial({ color: 0x000000 });

// // Create the final object to add to the scene
// const curveObject = new THREE.Line(geometry, material);
// scene.add(curveObject);
//
//-----------------------------------------
//
//-----------------------------------------

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30, -30, -30);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
gridHelper.position.set(0, -170, 0);
scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);
var add = 0;
function animate() {
  if (
    cursor.x < -0.045 &&
    cursor.x > -0.38 &&
    (cursor.y < 0.33) & (cursor.y > -0.33)
  ) {
    hobyCubes.stall();
  } else hobyCubes.rotateCubes(0.01);
  character01.leftwave();
  character02.leftwave();
  character02.rightwave();
  character02.walk();
  character02.jump();
  // character.walk();
  document.body.style.cursor = "default";
  if (scrollY == -80) {
    if (
      cursor.x < -0.022 &&
      cursor.x > -0.25 &&
      cursor.y < -0.122 &&
      cursor.y > -0.34
    ) {
      gitHubCubes[0].position.set(0, -77, 15);
      document.body.style.cursor = "pointer";
      if (mouseClicked)
        window.location.href = "https://github.com/BenMcConville";
    } else {
      gitHubCubes[0].position.set(-12, -69, 0);
      document.body.style.cursor = "cursor";
    }
    if (
      cursor.x < -0.022 &&
      cursor.x > -0.25 &&
      cursor.y < 0.1 &&
      cursor.y > -0.118
    ) {
      document.body.style.cursor = "pointer";
      gitHubCubes[2].position.set(0, -77, 15);
      if (mouseClicked)
        window.location.href = "https://github.com/BenMcConville";
    } else gitHubCubes[2].position.set(-12, -80, 0);
    if (
      cursor.x < -0.022 &&
      cursor.x > -0.25 &&
      cursor.y < 0.336 &&
      cursor.y > 0.118
    ) {
      document.body.style.cursor = "pointer";
      gitHubCubes[4].position.set(0, -82, 15);
      if (mouseClicked)
        window.location.href = "https://github.com/BenMcConville";
    } else gitHubCubes[4].position.set(-12, -91, 0);

    if (
      cursor.x > 0.022 &&
      cursor.x < 0.25 &&
      cursor.y < -0.122 &&
      cursor.y > -0.34
    ) {
      document.body.style.cursor = "pointer";
      gitHubCubes[1].position.set(0, -77, 15);
      if (mouseClicked)
        window.location.href = "https://github.com/BenMcConville";
    } else gitHubCubes[1].position.set(12, -69, 0);
    if (
      cursor.x > 0.022 &&
      cursor.x < 0.25 &&
      cursor.y < 0.1 &&
      cursor.y > -0.118
    ) {
      document.body.style.cursor = "pointer";
      gitHubCubes[3].position.set(0, -77, 15);
      if (mouseClicked)
        window.location.href = "https://github.com/BenMcConville";
    } else gitHubCubes[3].position.set(12, -80, 0);
    if (
      cursor.x > 0.022 &&
      cursor.x < 0.25 &&
      cursor.y < 0.336 &&
      cursor.y > 0.118
    ) {
      document.body.style.cursor = "pointer";
      gitHubCubes[5].position.set(0, -82, 15);
      if (mouseClicked)
        window.location.href = "https://github.com/BenMcConville";
    } else gitHubCubes[5].position.set(12, -91, 0);
    // else {
    //   gitHubCubes[0].position.set(-12, -69, 0);
    //   gitHubCubes[1].position.set(12, -69, 0);
    //   gitHubCubes[2].position.set(-12, -80, 0);
    //   gitHubCubes[3].position.set(12, -80, 0);
    //   gitHubCubes[4].position.set(-12, -91, 0);
    //   gitHubCubes[5].position.set(12, -91, 0);
  }

  moonAxis.rotateX(0.001);
  moonAxis.rotateY(0.005);
  moonAxis.rotateZ(0.004);
  requestAnimationFrame(animate);

  add += 0.03;
  if ((camera.position.y - rocket.position.y) ** 2 > 5) {
    var force = 0.0000000000001 / (camera.position.y - rocket.position.y) ** 2;
    // console.log(force);
    rocket.position.y = camera.position.y + force; // + deltaY;
  }
  // console.log(force);

  const parallaxX = cursor.x * 2;
  const parallaxY = -cursor.y * 2;
  camera.position.y = scrollY;
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.05;
  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.05;
  // controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("scroll", () => {
  // console.log(document.body.scrollHeight);
  scrollY = (window.scrollY / -window.innerHeight) * 40;
  // console.log(scrollY);
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  scrollY = (window.scrollY / -window.innerHeight) * 20;
};

//-----------------------------------------
//                Parallax
//-----------------------------------------
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
});

document.body.onmousedown = function () {
  mouseClicked = true;
};
document.body.onmouseup = function () {
  mouseClicked = false;
};

//-----------------------------------------
//
//-----------------------------------------
