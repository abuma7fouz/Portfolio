import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BrainLobeProps {
  hoveredLobe: number | null; // 0 to 4
}

interface LobeData {
  name: string;
  color: string;
  center: THREE.Vector3;
  pointCount: number;
  spread: { x: number; y: number; z: number };
}

// Sub-component for each individual brain lobe to handle independent frame-by-frame lerping
function LobeGroup({
  positions,
  colors,
  isHovered,
  isAnyHovered
}: {
  positions: Float32Array;
  colors: Float32Array;
  isHovered: boolean;
  isAnyHovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  useFrame(() => {
    // Target metrics based on hover telemetry
    let targetScale = 1.0;
    let targetOpacity = 0.55;

    if (isAnyHovered) {
      if (isHovered) {
        targetScale = 1.15;
        targetOpacity = 0.95;
      } else {
        targetScale = 0.88;
        targetOpacity = 0.15;
      }
    }

    // Lerp scaling (stiffness / smoothing factor = 0.08)
    if (groupRef.current) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.08);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.08);
    }

    // Lerp material opacity
    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef}
          size={0.12}
          vertexColors={true}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.55}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function NeuralBrainLobes({ hoveredLobe }: BrainLobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const lobes: LobeData[] = useMemo(() => [
    {
      name: 'Frontal Lobe (Artificial Intelligence)',
      color: '#00E5FF',
      center: new THREE.Vector3(0, 1.2, 0.6),
      pointCount: 160,
      spread: { x: 1.5, y: 1.0, z: 1.2 }
    },
    {
      name: 'Parietal Lobe (Programming)',
      color: '#5EEBFF',
      center: new THREE.Vector3(0, 1.5, -0.8),
      pointCount: 120,
      spread: { x: 1.3, y: 0.9, z: 1.1 }
    },
    {
      name: 'Occipital Lobe (Frameworks & Vision)',
      color: '#FF4D6D',
      center: new THREE.Vector3(0, 0.5, -1.8),
      pointCount: 90,
      spread: { x: 1.1, y: 0.8, z: 0.9 }
    },
    {
      name: 'Temporal Lobe (Data Analysis)',
      color: '#FFC857',
      center: new THREE.Vector3(1.3, 0.2, -0.4),
      pointCount: 100,
      spread: { x: 0.7, y: 0.8, z: 1.4 }
    },
    {
      name: 'Cerebellum & Stem (Soft Skills)',
      color: '#39FF88',
      center: new THREE.Vector3(0, -1.0, -1.0),
      pointCount: 100,
      spread: { x: 1.1, y: 0.8, z: 1.0 }
    }
  ], []);

  const particles = useMemo(() => {
    const lobePositions: Float32Array[] = [];
    const lobeColors: Float32Array[] = [];

    lobes.forEach((lobe) => {
      const pos = new Float32Array(lobe.pointCount * 3);
      const col = new Float32Array(lobe.pointCount * 3);
      const lobeColorObj = new THREE.Color(lobe.color);

      for (let i = 0; i < lobe.pointCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const u = Math.random();
        const radius = u * 0.9;

        const rx = Math.sin(phi) * Math.cos(theta) * radius * lobe.spread.x;
        const ry = Math.sin(phi) * Math.sin(theta) * radius * lobe.spread.y;
        const rz = Math.cos(phi) * radius * lobe.spread.z;

        pos[i * 3] = lobe.center.x + rx;
        pos[i * 3 + 1] = lobe.center.y + ry;
        pos[i * 3 + 2] = lobe.center.z + rz;

        col[i * 3] = lobeColorObj.r;
        col[i * 3 + 1] = lobeColorObj.g;
        col[i * 3 + 2] = lobeColorObj.b;
      }

      lobePositions.push(pos);
      lobeColors.push(col);
    });

    return { lobePositions, lobeColors };
  }, [lobes]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -22, -26]}>
      {lobes.map((_, index) => {
        const isHovered = hoveredLobe === index;
        const isAnyHovered = hoveredLobe !== null;

        return (
          <LobeGroup
            key={index}
            positions={particles.lobePositions[index]}
            colors={particles.lobeColors[index]}
            isHovered={isHovered}
            isAnyHovered={isAnyHovered}
          />
        );
      })}

      {/* Thalamus center representation */}
      <mesh position={[0, 0.2, -0.4]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial 
          color="#00E5FF" 
          transparent={true} 
          opacity={hoveredLobe !== null ? 0.08 : 0.22} 
          wireframe={true} 
        />
      </mesh>
    </group>
  );
}
