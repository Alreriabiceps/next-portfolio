import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- SUB-COMPONENTS ---

interface StarTunnelProps {
  count?: number;
}

const StarTunnel: React.FC<StarTunnelProps> = ({ count = 4000 }) => {
  const points = useRef<THREE.Points>(null);
  
  // Generate random points in a cylinder/tunnel shape
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 90; 
      const theta = 2 * Math.PI * Math.random();
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = (Math.random() - 0.5) * 400; // Longer tunnel
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.8); // Cyan/Blue
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface TerrainProps {
  visible: boolean;
}

const Terrain: React.FC<TerrainProps> = ({ visible }) => {
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(120, 120, 60, 60);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const dist = Math.sqrt(x*x + y*y);
            const height = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 2 + (Math.random() * 1.5);
            pos.setZ(i, height + Math.pow(dist / 20, 3)); 
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame((state) => {
        if(groupRef.current && materialRef.current) {
             groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, visible ? -15 : -80, 0.03);
             groupRef.current.rotation.z += 0.001;
             materialRef.current.opacity = 0.05 + Math.sin(state.clock.elapsedTime) * 0.03;
        }
    });

    return (
        <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -50, -50]}>
            <mesh geometry={geometry}>
                 <meshBasicMaterial ref={materialRef} color="#38bdf8" wireframe transparent opacity={0.08} />
            </mesh>
            <mesh geometry={geometry} position={[0, 0, -0.1]}>
                 <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    );
};

// --- MAIN SCENE ---

const ScrollAwareScene: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sceneRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
    
    // Smooth progress
    setScrollProgress(THREE.MathUtils.lerp(scrollProgress, progress, 0.1));
    
    // Simulate velocity
    const velocity = (progress - scrollProgress);
    
    // Apply camera shake and tilt based on velocity
    if (sceneRef.current) {
       // Shake
       sceneRef.current.position.x = (Math.random() - 0.5) * velocity * 2;
       sceneRef.current.position.y = (Math.random() - 0.5) * velocity * 2;
       
       // Tilt/Bank
       sceneRef.current.rotation.z = THREE.MathUtils.lerp(sceneRef.current.rotation.z, velocity * 2, 0.1);
    }
    
    // Warp Stars
    if (starsRef.current) {
        const firstChild = starsRef.current.children[0] as any;
        if (firstChild && firstChild.geometry) {
            const positions = firstChild.geometry.attributes.position.array;
            // Warp speed multiplier
            const speed = 1 + Math.abs(velocity) * 500; 
            
            for(let i=0; i < 4000; i++) {
                 let z = positions[i*3 + 2];
                 z += speed * 0.2;
                 if (z > 50) z = -350;
                 positions[i*3 + 2] = z;
            }
            firstChild.geometry.attributes.position.needsUpdate = true;
        }
    }
  });

  const landVisible = scrollProgress > 0.85;

  return (
    <group ref={sceneRef}>
      <Environment preset="city" />
      <group ref={starsRef}>
         <StarTunnel count={4000} />
      </group>
      <Terrain visible={landVisible} />
    </group>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        gl={{ 
            antialias: true, 
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping 
        }}
      >
        <fog attach="fog" args={['#050505', 0, 120]} />
        <ScrollAwareScene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;