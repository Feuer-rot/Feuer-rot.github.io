import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.container3D')
});

const container = document.querySelector('.container3D');
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);

camera.position.setZ(30);
camera.lookAt(0, 0, 0);

const spotLight = new THREE.SpotLight(0xffffff, 3, 100, .2, 0.5);
spotLight.position.set(0, 25, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(spotLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(spotLight)
scene.add(lightHelper)

const loader = new GLTFLoader();
loader.load(
  'models/taube/scene.gltf',
  (gltf) => {
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
