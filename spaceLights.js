import * as THREE from 'three'

export function earth(){
    const loader = new THREE.TextureLoader();

    // Earth
    const geometry =  new THREE.IcosahedronGeometry(2 , 16) 
    const material =  new THREE.MeshStandardMaterial({ 
        map: loader.load('./assets/earth/earthmap1k.jpg'),      
    })
    const earthMesh = new THREE.Mesh( geometry, material );
    const eartGroup = new THREE.Group();
    eartGroup.rotation.z = -23.4 * Math.PI / 180;
    eartGroup.add(earthMesh);
    camera.position.z = 5;

    // Clouds
    const cloudsMat = new THREE.MeshStandardMaterial({ 
        map: loader.load('./assets/earth/earthcloudmaptrans.jpg'),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,


        });

    const earthMeshClouds = new THREE.Mesh( geometry, cloudsMat);

    earthMeshClouds.scale.set(1.02, 1.02, 1.02);
    eartGroup.add(earthMeshClouds);

    // Glow of the Earth
    const glowMat = new THREE.MeshStandardMaterial({ 
        map: loader.load('./assets/earth/earthcloudmap.jpg'),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,
        });
        
    const glowMesh = new THREE.Mesh( geometry, glowMat);
    glowMesh.scale.set(1.03, 1.03, 1.03);
    eartGroup.add(glowMesh);

    // Lights of the Earth
    const ligthsMat = new THREE.MeshBasicMaterial({ 
        map: loader.load('./assets/earth/earthlights1k.jpg'),
        blending: THREE.AdditiveBlending,
        
        });

    const ligthMesh = new THREE.Mesh( geometry, ligthsMat);

    eartGroup.add(ligthMesh);

    function animate() {
        requestAnimationFrame(animate);
        earthMesh.rotation.y += 0.001;
        ligthMesh.rotation.y += 0.001;
        earthMeshClouds.rotation.y += 0.001;
        glowMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
        controls.update();
      }

      scene.add(eartGroup);

    return animate();
}