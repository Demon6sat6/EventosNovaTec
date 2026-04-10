import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const W = window.innerWidth, H = window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.set(0, 0, 40);

    // ── Partículas con velocidades individuales ──
    const COUNT = 2000;
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);
    const vel   = new Float32Array(COUNT * 3);
    const palette = [
      [0.49, 0.23, 0.93],
      [0.93, 0.28, 0.60],
      [0.39, 0.40, 0.95],
      [0.67, 0.55, 0.98],
      [0.96, 0.45, 0.71],
    ];
    for (let i = 0; i < COUNT; i++) {
      pos[i*3]   = (Math.random()-0.5)*160;
      pos[i*3+1] = (Math.random()-0.5)*100;
      pos[i*3+2] = (Math.random()-0.5)*80;
      const c = palette[Math.floor(Math.random()*palette.length)];
      col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2];
      vel[i*3]   = (Math.random()-0.5)*0.008;
      vel[i*3+1] = (Math.random()-0.5)*0.006;
      vel[i*3+2] = (Math.random()-0.5)*0.004;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.25, vertexColors: true, transparent: true,
      opacity: 0.65, sizeAttenuation: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Anillo exterior giratorio ──
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(22, 0.06, 6, 120),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.12, wireframe: false })
    );
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    // ── Anillo interior ──
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(14, 0.04, 6, 100),
      new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.1 })
    );
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // ── Esfera wireframe central ──
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6, 2),
      new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.04, wireframe: true })
    );
    scene.add(sphere);

    // ── Octaedro flotante ──
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(3, 0),
      new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.06, wireframe: true })
    );
    octa.position.set(18, 8, -10);
    scene.add(octa);

    // ── Segundo octaedro ──
    const octa2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(2, 0),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.07, wireframe: true })
    );
    octa2.position.set(-20, -6, -8);
    scene.add(octa2);

    // ── Líneas de conexión (grid 3D) ──
    const grid = new THREE.GridHelper(120, 24, 0x7c3aed, 0x7c3aed);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.03;
    grid.position.y = -28;
    scene.add(grid);

    // ── Tubo helicoidal ──
    const helixPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 6;
      helixPoints.push(new THREE.Vector3(Math.cos(t) * 12, (i/200)*40 - 20, Math.sin(t) * 12));
    }
    const helixGeo  = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPoints), 200, 0.04, 4, false);
    const helixMesh = new THREE.Mesh(helixGeo,
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.08 })
    );
    scene.add(helixMesh);

    // ── Mouse parallax ──
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / W - 0.5) * 2;
      my = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let t = 0, animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.004;

      // Mover partículas individualmente
      const positions = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        positions[i*3]   += vel[i*3];
        positions[i*3+1] += vel[i*3+1];
        positions[i*3+2] += vel[i*3+2];
        // Rebote en los bordes
        if (Math.abs(positions[i*3])   > 80) vel[i*3]   *= -1;
        if (Math.abs(positions[i*3+1]) > 50) vel[i*3+1] *= -1;
        if (Math.abs(positions[i*3+2]) > 40) vel[i*3+2] *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      ring1.rotation.z += 0.002;
      ring1.rotation.y += 0.001;
      ring2.rotation.z -= 0.003;
      ring2.rotation.x += 0.001;

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.004;
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      sphere.scale.set(s, s, s);

      octa.rotation.x  += 0.006;
      octa.rotation.y  += 0.008;
      octa.position.y   = 8 + Math.sin(t * 0.8) * 3;

      octa2.rotation.x -= 0.005;
      octa2.rotation.z += 0.007;
      octa2.position.y  = -6 + Math.cos(t * 0.6) * 2;

      helixMesh.rotation.y += 0.002;

      // Parallax suave
      camera.position.x += (mx * 4 - camera.position.x) * 0.025;
      camera.position.y += (-my * 3 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement))
        mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }} />;
}
