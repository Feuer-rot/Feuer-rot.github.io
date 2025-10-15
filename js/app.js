// ____________________________
// // BURGER MENU 
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const navMenu = document.querySelector("header ul");


    burgerMenu.addEventListener("click", (event) => {
        event.stopPropagation(); 
        navMenu.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
            navMenu.classList.remove("open");
        }
    });

    navMenu.addEventListener("mouseleave", () => {
        navMenu.classList.remove("open");
    });
});

// ____________________________
// // TOGGLE SWITCH ART TO DEV 
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById("toggle");
        const headline2 = document.querySelector("#welcome h2");
        const headline = document.querySelector("h1 a");
        const menu = document.querySelector("header ul");
        const work = document.querySelector("#work")
        const arrow = document.querySelector(".arrow");
        const aboutMe = document.querySelector(".about-me-wrapper");

    toggle.addEventListener("change", () => {
        if (toggle.checked) {   

            if (headline2) headline2.textContent = "Hi, welcome to my Developer Portfolio";

            if (headline) headline.textContent = "FEUERROT.dev";

            if (menu) menu.innerHTML = `
            <li><a href='index.html#'>Home</a></li>
            <li><a href='index.html#work'>Work</a></li>
            <li><a href='#about-me'>About Me</a></li>
            <li><a href='#contact'>Contact</a></li>
            `;

            if (work) work.style.display = "block";

            if (arrow) arrow.href = "#work";

            if(aboutMe) aboutMe.innerHTML = `
                <img src='images/profile-pic.webp' alt='Profile Picture of Mailin Knaak'>
                <p>Hi! I’m Mailin, an Illustration Student at HAW in Hamburg, a creative developer and digital artist with a love for all things visual and interactive.<br> I enjoy working where creativity meets technology— whether it's crafting 3D models, building smooth web interfaces, or bringing ideas to life through animation. I want to create things that invite curiosity — playful, visual, and a bit offbeat in all the right ways.<br><br>When I’m not in front of a screen, you’ll probably find me sketching, exploring new creative tools, or out on an outdoor adventure.</p>
            `;
           
        } else {
            
            if (headline2) headline2.textContent = "Hi, welcome to my Art Portfolio";

            if (headline) headline.textContent = "FEUERROT.art";

            if (menu) menu.innerHTML = `
            <li><a href='#'>Home</a></li>
            <li><a href='animation.html'>Animation</a></li>
            <li><a href='3d.html'>3D</a></li>
            <li><a href='illustration.html'>Illustration</a></li>
            <li><a href='#about-me'>About Me</a></li>
            <li><a href='#contact'>Contact</a></li>
            `;

            if (work) work.style.display = "none";

            if (arrow) arrow.href = "animation.html";

            if(aboutMe) aboutMe.innerHTML = ` 
                <img src='images/profile-pic.webp' alt='Profile Picture of Mailin Knaak'>
                <p>Hi! I’m Mailin, an Illustration Student at HAW in Hamburg, a creative developer and digital artist with a love for all things visual and interactive.<br> I enjoy working where creativity meets technology— whether it's crafting 3D models, building smooth web interfaces, or bringing ideas to life through animation. I want to create things that invite curiosity — playful, visual, and a bit offbeat in all the right ways.<br><br>When I’m not in front of a screen, you’ll probably find me sketching, exploring new creative tools, or out on an outdoor adventure.</p><ul><p>Exhibitons:</p><br><li><a href='https://www.instagram.com/p/CbvE5FVNiA6/?utm_source=ig_web_copy_link&amp;igsh=MzRlODBiNWFlZA==' target='_blank'>Urban Apes Wall + Art </a>&nbsp;(all Urban Apes Locations) <em>since Feb 2022</em></li><li><a href='/illustration/'>'Feste Feiern!' (MK&amp;G, Hamburg)</a> <em>16.02.2024 - 19.01.2025</em></li></ul>
            `;
        }
    });
});


// ____________________________
// // IMG TO VIDEOPLAYER 
// ____________________________

document.addEventListener("DOMContentLoaded", () => {
        const videoImg = document.querySelectorAll("video-thumbnail");
        const video = document.querySelectorAll(iframe);


    }
   );

// ____________________________
// // THREE.JS 3D MODELS 
// ____________________________

// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
const objToRender = "dino";

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);

    // Optional: center or scale the model if needed
    object.position.set(0, -2, 0);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100).toFixed(2) + "% loaded");
  },
  function (error) {
    // If there is an error, log it
    console.error("An error occurred while loading the model:", error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ✅ FIX: Correct selector syntax (needed a dot for class)
document.querySelector(".container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 25 : 500;

// Add lights to the scene
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(
  0x333333,
  objToRender === "dino" ? 5 : 1
);
scene.add(ambientLight);

// Add OrbitControls
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // smooth controls
  controls.dampingFactor = 0.05;
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // Optional: make the object slowly rotate
  if (object) object.rotation.y += 0.005;

  if (controls) controls.update();
  renderer.render(scene, camera);
}

// Adjust camera and renderer on window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering
animate();
