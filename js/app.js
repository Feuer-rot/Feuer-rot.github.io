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
  const thumbnails = document.querySelectorAll(".video-thumbnail");

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
      const videoUrl = thumbnail.getAttribute("data-video");

      // Create the iframe dynamically
      const iframe = document.createElement("iframe");
      iframe.src = videoUrl;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.borderRadius = "12px";

      // Replace thumbnail with the iframe
      thumbnail.innerHTML = "";
      thumbnail.appendChild(iframe);
    });
  });
});


// ____________________________
// THREE.JS 3D MODELS 
// ____________________________

// ____________________________
// // THREE.JS 3D SLIDESHOW
// ____________________________

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.querySelector(".container3D").appendChild(renderer.domElement);

// Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040, 3);
scene.add(ambientLight);

camera.position.set(0, 1, 8);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Model setup
const loader = new GLTFLoader();
const models = ["taube", "froggo"]; // 👉 Hier deine Modellnamen eintragen
let currentIndex = 0;
let currentModel = null;

// Funktion zum Laden eines Modells
function loadModel(name) {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else obj.material.dispose();
      }
    });
  }

  loader.load(
    `./models/${name}/scene.gltf`,
    gltf => {
      currentModel = gltf.scene;
      currentModel.position.set(0, -1.5, 0);
      scene.add(currentModel);
      console.log(`Loaded: ${name}`);
    },
    xhr => console.log(`${(xhr.loaded / xhr.total * 100).toFixed(1)}% loaded`),
    err => console.error("Error loading model:", err)
  );
}

// Buttons
document.getElementById("prevModel").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + models.length) % models.length;
  loadModel(models[currentIndex]);
});

document.getElementById("nextModel").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % models.length;
  loadModel(models[currentIndex]);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (currentModel) currentModel.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start
loadModel(models[currentIndex]);
animate();
