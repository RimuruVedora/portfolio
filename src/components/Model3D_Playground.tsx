import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import { SkeletonUtils } from 'three-stdlib';

interface MousePosition {
  x: number;
  y: number;
}

const Model: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { scene, animations } = useGLTF('/robot_playground.glb');
  const targetRotation = useRef({ x: 0, y: 0 });

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    mixerRef.current = new THREE.AnimationMixer(clonedScene);
    
    if (animations.length > 0) {
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }
  }, [clonedScene, animations]);

  useFrame((_state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (groupRef.current) {
      targetRotation.current.x = mousePosition.y * 0.2;
      targetRotation.current.y = mousePosition.x * 0.4;

      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.06;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={1.2} position={[0, -1.2, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

const Scene: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ec4899" />
      <Model mousePosition={mousePosition} />
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={2}
        maxDistance={15}
        target={[0, 0, 0]}
      />
    </>
  );
};

const Model3D_Playground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Model3D_Playground;
