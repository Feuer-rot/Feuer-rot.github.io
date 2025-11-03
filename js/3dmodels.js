  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
  import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';

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

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 100);
pointLight1.position.set(5,5,5);
const pointLight2 = new THREE.PointLight(0xffffff, 50);
pointLight2.position.set(-5,5,5);
const pointLight3 = new THREE.PointLight(0xffffff, 50);
pointLight3.position.set(-5, 0,-5);
scene.add(pointLight1, pointLight2, pointLight3);

const controls = new OrbitControls(camera, renderer.domElement);

// Model switching setup
const models = [
  'models/taube/taube.glb',
  'models/froggo/froggo2.glb',
  'models/frenchpress/frenchpress.glb'
];

let currentModel = null;
let currentIndex = 0;

const loader = new GLTFLoader();

function loadModel(path) {
    // Remove previous model
    if (currentModel) {
        scene.remove(currentModel);
    }

    loader.load(
        path,
        (gltf) => {
            const model = gltf.scene;

            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = new THREE.Vector3();
            box.getCenter(center);
            model.position.sub(center);

            scene.add(model);
            currentModel = model;
        },
        undefined,
        (error) => {
            console.error('Fehler beim Laden des Modells:', error);
        }
    );
}

// Initial load
loadModel(models[currentIndex]);

// Switch models with buttons
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % models.length;
    loadModel(models[currentIndex]);
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + models.length) % models.length;
    loadModel(models[currentIndex]);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
