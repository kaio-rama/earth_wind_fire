import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { getStarField } from './starField.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new THREE.TextureLoader();


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const earthTextures = ['./assets/earth/earthmap1k.jpg', './assets/earth/earthcloudmaptrans.jpg', './assets/earth/earthcloudmap.jpg', './assets/earth/earthlights1k.jpg'];
const moonTextures = [ '', '', './assets/moon/moonmap2k.jpg','./assets/moon/moonbump2k.jpg'];
const meatBallTextures = ['./assets/meatBall/baseColor.jpg','./assets/meatBall/normal.jpg','./assets/meatBall/aOmap.jpg', ''];


// Space Lights
const sunLight = new THREE.DirectionalLight(0xaaaaaa, 1);
scene.add(sunLight);
sunLight.position.set(-2, 0.5, 1.5);
// Stars
const stars = getStarField();
scene.add(stars); 

// Earth
function earthGenerate(array){
    const geometry =  new THREE.IcosahedronGeometry(2 , 16) 
    const material =  new THREE.MeshStandardMaterial({ 
        map: loader.load(array[0] ? array[0] : ''),                            // LOAD BASIC TEXTURES
      })
    const earthMesh = new THREE.Mesh( geometry, material );
    const eartGroup = new THREE.Group();
    eartGroup.rotation.z = -23.4 * Math.PI / 180;
    eartGroup.add(earthMesh);
    camera.position.z = 5;

    // Clouds
    const cloudsMat = new THREE.MeshStandardMaterial({ 
        map: loader.load(array[1] ? array[1] : ''),      // LOAD CLOUD TEXTURES
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,


        });

    const earthMeshClouds = new THREE.Mesh( geometry, cloudsMat);

    earthMeshClouds.scale.set(1.02, 1.02, 1.02);
    eartGroup.add(earthMeshClouds);

    // Glow of the Earth
    const glowMat = new THREE.MeshStandardMaterial({ 
        map: loader.load(array[2] ? array[2] : ''),       // LOAD GLOW TEXTURES
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,
        });
        
    const glowMesh = new THREE.Mesh( geometry, glowMat);
    glowMesh.scale.set(1.03, 1.03, 1.03);
    eartGroup.add(glowMesh);

    // Lights of the Earth
    const ligthsMat = new THREE.MeshBasicMaterial({            
        map: loader.load(array[3] ? array[3] : ''),                           // LOAD LIGHTS
        blending: THREE.AdditiveBlending,
        
        });

    const ligthMesh = new THREE.Mesh( geometry, ligthsMat);

    eartGroup.add(ligthMesh);
    scene.add(eartGroup);

    function animate() {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.001;
      ligthMesh.rotation.y += 0.001;
      earthMeshClouds.rotation.y += 0.001;
      glowMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
      controls.update();
    }

    animate();

}

earthGenerate(earthTextures)

document.getElementById("meat-button").addEventListener("click", () => {
  if(scene.children[2]){
    scene.children.pop()
    earthGenerate(meatBallTextures)
  }
})

document.getElementById("earth-button").addEventListener("click", () => {
  if(scene.children[2]){
    scene.children.pop()
    earthGenerate(earthTextures)
  }
})

document.getElementById("moon-button").addEventListener("click", () => {
  if(scene.children[2]){
    scene.children.pop()
    earthGenerate(moonTextures)
  }
})

document.getElementById("stars-button").addEventListener("click", () => {
  if (scene.children[1].visible)
    scene.children[1].visible = false
  else
    scene.children[1].visible = true
})