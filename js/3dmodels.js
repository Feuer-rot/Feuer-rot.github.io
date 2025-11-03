import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true,
    canvas: document.querySelector('.container3D')
});

const container = document.querySelector('.container3D');
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);

camera.position.setZ(10);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 100);
pointLight1.position.set(5,5,5);
const pointLight2 = new THREE.PointLight(0xffffff, 50);
pointLight2.position.set(-5,5,5);
const pointLight3 = new THREE.PointLight(0xffffff, 50);
pointLight3.position.set(-5, 0,-5);
scene.add(pointLight1, pointLight2, pointLight3);

// const lightHelper = new THREE.PointLightHelper(pointLight1)
// scene.add(lightHelper)

// const lightHelper1 = new THREE.PointLightHelper(pointLight2)
// scene.add(lightHelper1)

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
loader.load(
  'models/taube/taube.glb',
  (gltf) => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center); // move model so its center is at (0, 0, 0)
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error('Fehler beim Laden des Modells:', error);
  }
);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
