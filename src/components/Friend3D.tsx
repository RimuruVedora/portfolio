import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MousePosition { x: number; y: number; }

const FriendModel: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  // Target the requested friend.glb directly
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}friend.glb`);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // If the massive GLB carries idle animations, lock them natively and playback!
    mixerRef.current = new THREE.AnimationMixer(scene);
    if (animations.length > 0) {
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }
  }, [scene, animations]);

  useFrame((_state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);

    // Dynamic Cursor Tracking! Because it is a monolithic mesh we track the entire group bounds!
    if (groupRef.current) {
      // The math constrains the target bounds severely so it looks around naturally without flipping
      targetRotation.current.x = mousePosition.y * 0.4;
      targetRotation.current.y = mousePosition.x * 0.6;

      // Linear interpolation (lerp) specifically forcing it to glide organically to the destination
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={1.8} position={[0, -1.5, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const FriendScene = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse plane geometry directly from [-1, 1] for 3D translation
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full lg:h-[90vh] flex items-center justify-center absolute inset-0 z-0 pointer-events-none mt-10">
      <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }} className="pointer-events-auto">
        <ambientLight intensity={0.9} />
        {/* Dynamic Studio Lighting Rig to emphasize metallic elements of gltf models */}
        <directionalLight position={[10, 15, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, 0, -10]} intensity={1.2} color="#ec4899" />
        <pointLight position={[10, 5, 10]} intensity={1.2} color="#00ffd0" />
        <pointLight position={[0, -5, 0]} intensity={0.8} color="#f97316" />
        
        <FriendModel mousePosition={mousePosition} />
        {/* Restrict camera control so rotation is dictated exclusively by cursor lerp mechanics */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

// Pre-fetch the heavy 56MB asset directly within react-three/fiber cache
useGLTF.preload(`${import.meta.env.BASE_URL}friend.glb`);

export default FriendScene;
