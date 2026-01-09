import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.02); // Matches void color

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- GROUP SETUP ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    
    // Separate groups for parallax layering
    const backgroundGroup = new THREE.Group(); 
    const foregroundGroup = new THREE.Group(); 
    
    mainGroup.add(backgroundGroup); // Render order implications handled by z-depth
    mainGroup.add(foregroundGroup);

    // --- GEOMETRY 1: NEURAL KNOT (Center - Main Group) ---
    const knotGeometry = new THREE.TorusKnotGeometry(5, 1.4, 128, 32);
    const knotMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xbd00ff, 
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    mainGroup.add(knot);

    // --- GEOMETRY 2: DATA CLOUD (Background Layer) ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2500;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      // Spread particles wide
      posArray[i] = (Math.random() - 0.5) * 70;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    backgroundGroup.add(particleMesh);

    // --- GEOMETRY 3: ORBITAL RINGS (Foreground Layer) ---
    const ringGeometry = new THREE.TorusGeometry(12, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    foregroundGroup.add(ring);

    const ring2 = ring.clone();
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring2.scale.set(0.8, 0.8, 0.8);
    foregroundGroup.add(ring2);


    // --- INTERACTION STATE ---
    let mouseX = 0; // Normalized -1 to 1
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Mouse speed/intensity calculation
    let lastClientX = 0;
    let lastClientY = 0;
    let mouseSpeed = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      // Normalize for rotation targets
      targetX = (event.clientX - windowHalfX) * 0.001;
      targetY = (event.clientY - windowHalfY) * 0.001;

      // Calculate approximate speed
      const deltaX = event.clientX - lastClientX;
      const deltaY = event.clientY - lastClientY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Add to speed (clamped)
      mouseSpeed = Math.min(mouseSpeed + dist * 0.005, 1.5); 

      lastClientX = event.clientX;
      lastClientY = event.clientY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', handleResize);

    // --- ANIMATE ---
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate mouse position
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Decay speed back to zero
      mouseSpeed *= 0.96;

      // --- 1. PARALLAX EFFECTS ---
      
      // Main Group (The Knot): Follows mouse subtly
      mainGroup.rotation.y = mouseX * 0.5;
      mainGroup.rotation.x = mouseY * 0.5;

      // Background (Particles): Moves OPPOSITE to mouse (Depth)
      backgroundGroup.rotation.y = -mouseX * 0.2;
      backgroundGroup.rotation.x = -mouseY * 0.2;
      
      // Foreground (Rings): Moves MORE with mouse (Closer)
      foregroundGroup.rotation.y = mouseX * 0.8;
      foregroundGroup.rotation.x = mouseY * 0.8;
      foregroundGroup.position.x = mouseX * 2; // Slight sway
      foregroundGroup.position.y = -mouseY * 2;

      // --- 2. OBJECT ANIMATIONS ---

      // Knot: Constant rotation + Speed Burst
      knot.rotation.y += 0.002 + (mouseSpeed * 0.05); 
      knot.rotation.z += 0.001;
      
      // Knot: Breathing effect + Speed Expansion
      const breathingScale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
      const speedScale = mouseSpeed * 0.1;
      knot.scale.setScalar(breathingScale + speedScale);
      
      // Particles: Slow drift
      particleMesh.rotation.y -= 0.0005;
      
      // Rings: Complex wobbles
      ring.rotation.z -= 0.002;
      // Ring wobbles based on time
      ring.rotation.x = (Math.PI / 2) + Math.sin(elapsedTime * 0.2) * 0.1;
      
      ring2.rotation.z += 0.003;
      ring2.rotation.y = (Math.PI / 4) + Math.cos(elapsedTime * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
      if(containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default ThreeHeroBackground;