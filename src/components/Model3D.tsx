import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MousePosition {
  x: number;
  y: number;
}

const Model: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { scene, animations } = useGLTF('/model.glb');
  const targetRotation = useRef({ x: 0, y: 0 });
  const smoothedRotation = useRef({ x: 0, y: 0 });
  const baseRotation = useRef<THREE.Euler | null>(null);

  useEffect(() => {
    // Find head node - Cylinder.002_2 is the true head
    let foundHead: any = null;
    scene.traverse((child: any) => {
      if (child.name && child.name.includes('Cylinder.002')) {
        foundHead = child;
      }
    });

    if (foundHead) {
      headRef.current = foundHead;
      // Save the default rest pose of the head so we can apply mouse offsets cleanly
      baseRotation.current = foundHead.rotation.clone();
      console.log('=== HEAD SET ===', foundHead.name);
    }

    // Setup animation mixer with the original clip
    mixerRef.current = new THREE.AnimationMixer(scene);
    
    if (animations.length > 0) {
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }
  }, [scene, animations]);

  useFrame((_state, delta) => {
    // Update animation - this determines the base pose for this frame
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Apply relative rotation for the head to follow cursor
    if (headRef.current) {
      // Cylinder.002_2 is rotated 90deg on Z.
      // Local X is global UP. Local Y is global LEFT.
      
      // Yaw (Left/Right): driven by mouseX. Rotate around Local X (UP).
      // mouseX > 0 (Right) requires negative rotation around UP
      targetRotation.current.x = mousePosition.x * -0.7;
      
      // Pitch (Up/Down): driven by mouseY. Rotate around Local Y (LEFT).
      // mouseY > 0 (Up) requires positive rotation around LEFT
      targetRotation.current.y = mousePosition.y * 0.5;

      smoothedRotation.current.x += (targetRotation.current.x - smoothedRotation.current.x) * 0.1;
      smoothedRotation.current.y += (targetRotation.current.y - smoothedRotation.current.y) * 0.1;

      // Apply the smoothed rotation as an offset ON TOP of the animation's rotation
      headRef.current.rotateX(smoothedRotation.current.x);
      headRef.current.rotateY(smoothedRotation.current.y);
    } else if (groupRef.current) {
      // Fallback: rotate whole model
      targetRotation.current.x = mousePosition.y * 0.2;
      targetRotation.current.y = mousePosition.x * 0.4;

      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.06;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={0.55}>
      <primitive object={scene} />
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
        maxDistance={10}
        target={[0, 0, 0]}
      />
    </>
  );
};

const Model3D: React.FC = () => {
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
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Model3D;
