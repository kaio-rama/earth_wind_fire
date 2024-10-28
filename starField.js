// starField.js
import * as THREE from 'three';

export function getStarField() {
  const starCount = 10000; // Ajusta la cantidad de estrellas según prefieras
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05, // Tamaño de cada estrella
    transparent: true
  });

  // Crear posiciones aleatorias para cada estrella
  const positions = [];
  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000; // Ajusta el rango según el tamaño de tu escena
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    positions.push(x, y, z);
  }

  // Añadir las posiciones al buffer
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  return new THREE.Points(starGeometry, starMaterial);
}
