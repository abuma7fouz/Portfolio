import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import NeuralBrainLobes from './NeuralBrainLobes';
import GiantNeuronProject from './GiantNeuronProject';

interface CameraControllerProps {
  versionId: number;
  isSleeping: boolean;
  onPositionChange: (pos: { x: number; y: number; z: number }) => void;
}

// Camera controller driving scroll-linked helix travel & lookAt focus
function CameraController({ versionId, isSleeping, onPositionChange }: CameraControllerProps) {
  const { camera } = useThree();
  
  // Vary lookTarget starting coordinates slightly based on versionId
  const lookTarget = useRef(new THREE.Vector3(
    versionId === 3 ? 0.4 : versionId === 4 ? -0.4 : 0,
    versionId === 2 ? 14.5 : 15,
    versionId === 3 ? -0.3 : versionId === 4 ? 0.2 : 0
  ));

  const clusterCenters = useMemo(() => [
    { x: 0, y: 15, z: 0 },        // hero
    { x: -8, y: 5, z: -5 },       // about
    { x: 8, y: -5, z: -12 },      // experience
    { x: -8, y: -12, z: -18 },    // certificates (New!)
    { x: 0, y: -22, z: -26 },     // skills (3D Brain)
    { x: 8, y: -32, z: -34 },     // projects (3D Neurons)
    { x: -8, y: -42, z: -42 },    // services
    { x: 4, y: -50, z: -50 },     // testimonials
    { x: 0, y: -60, z: -58 }      // contact
  ], []);

  // Winding camera offsets (positioned slightly in front and side to show sections)
  const cameraPath = useMemo(() => {
    const list = [
      { x: 0, y: 15, z: 10 },
      { x: -8, y: 5, z: 5 },
      { x: 8, y: -5, z: -2 },
      { x: -8, y: -12, z: -8 },
      { x: 0, y: -22, z: -16 },
      { x: 8, y: -32, z: -24 },
      { x: -8, y: -42, z: -32 },
      { x: 4, y: -50, z: -40 },
      { x: 0, y: -60, z: -48 }
    ];

    // Subtle startup camera coordinates variations per version
    return list.map((cam, idx) => {
      const copy = { ...cam };
      if (idx === 0) {
        if (versionId === 2) copy.x += 0.8;
        else if (versionId === 3) copy.y -= 0.6;
        else if (versionId === 4) copy.z += 1.2;
      }
      return copy;
    });
  }, [versionId]);

  useFrame(() => {
    if (isSleeping) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.03);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 40, 0.03);
      camera.lookAt(0, 0, 0);
      return;
    }

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    const targetIndex = progress * (cameraPath.length - 1);
    const baseIndex = Math.floor(targetIndex);
    const nextIndex = Math.min(baseIndex + 1, cameraPath.length - 1);
    const factor = targetIndex - baseIndex;

    const startCam = cameraPath[baseIndex];
    const endCam = cameraPath[nextIndex];
    const targetCamX = THREE.MathUtils.lerp(startCam.x, endCam.x, factor);
    const targetCamY = THREE.MathUtils.lerp(startCam.y, endCam.y, factor);
    const targetCamZ = THREE.MathUtils.lerp(startCam.z, endCam.z, factor);

    const startLook = clusterCenters[baseIndex];
    const endLook = clusterCenters[nextIndex];
    const targetLookX = THREE.MathUtils.lerp(startLook.x, endLook.x, factor);
    const targetLookY = THREE.MathUtils.lerp(startLook.y, endLook.y, factor);
    const targetLookZ = THREE.MathUtils.lerp(startLook.z, endLook.z, factor);

    // Smooth inertia camera translation and look orientation shifts
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.04);

    lookTarget.current.x = THREE.MathUtils.lerp(lookTarget.current.x, targetLookX, 0.04);
    lookTarget.current.y = THREE.MathUtils.lerp(lookTarget.current.y, targetLookY, 0.04);
    lookTarget.current.z = THREE.MathUtils.lerp(lookTarget.current.z, targetLookZ, 0.04);
    camera.lookAt(lookTarget.current);

    onPositionChange({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    });
  });

  return null;
}

// Subcomponent rendering flowing data packets
interface DataPacketsProps {
  versionId: number;
  lines: Float32Array;
  theme: 'dark' | 'light';
  isSleeping: boolean;
}

function DataPackets({ versionId, lines, theme, isSleeping }: DataPacketsProps) {
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Vary packet counts slightly per version
  const packetCount = useMemo(() => {
    if (versionId === 2) return 40;
    if (versionId === 3) return 50;
    if (versionId === 4) return 35;
    return 45; // Version 1
  }, [versionId]);

  const packets = useMemo(() => {
    const list = [];
    const segmentsCount = lines.length / 6;
    for (let i = 0; i < packetCount; i++) {
      const segmentIdx = Math.floor(Math.random() * segmentsCount) * 6;
      list.push({
        segmentIdx,
        progress: Math.random(),
        // Vary speeds slightly based on versionId
        speed: (versionId === 2 ? 0.007 : versionId === 3 ? 0.004 : 0.005) + Math.random() * 0.01,
      });
    }
    return list;
  }, [lines, packetCount, versionId]);

  const positions = useMemo(() => new Float32Array(packetCount * 3), [packetCount]);

  useFrame(() => {
    if (isSleeping) {
      if (pointsRef.current) {
        const mat = pointsRef.current.material as THREE.PointsMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, 0.04);
      }
      return;
    }

    const segmentsCount = lines.length / 6;

    for (let i = 0; i < packetCount; i++) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;
        p.segmentIdx = Math.floor(Math.random() * segmentsCount) * 6;
      }

      const s = p.segmentIdx;
      const startX = lines[s];
      const startY = lines[s + 1];
      const startZ = lines[s + 2];
      const endX = lines[s + 3];
      const endY = lines[s + 4];
      const endZ = lines[s + 5];

      positions[i * 3] = THREE.MathUtils.lerp(startX, endX, p.progress);
      positions[i * 3 + 1] = THREE.MathUtils.lerp(startY, endY, p.progress);
      positions[i * 3 + 2] = THREE.MathUtils.lerp(startZ, endZ, p.progress);
    }

    if (geomRef.current) {
      geomRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geomRef.current.attributes.position.needsUpdate = true;
    }
  });

  const isLight = theme === 'light';
  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        color={isLight ? '#0284C7' : '#FFFFFF'}
        size={0.2}
        sizeAttenuation={true}
        transparent={true}
        opacity={isLight ? 0.75 : 0.9}
        depthWrite={false}
      />
    </points>
  );
}

// Subcomponent rendering segmented clusters & connecting synapse paths
interface NeuralNetworkMeshProps {
  versionId: number;
  isSleeping: boolean;
  theme: 'dark' | 'light';
  onLinesReady: (lines: Float32Array) => void;
}

function NeuralNetworkMesh({ versionId, isSleeping, theme, onLinesReady }: NeuralNetworkMeshProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const isLight = theme === 'light';
  const nodeColor = isLight ? '#008FA8' : '#00E5FF';
  const synapseColor = isLight ? '#008FA8' : '#00E5FF';
  const synapseOpacity = isLight ? 0.18 : 0.12;

  // Segment points into 9 section-based coordinates
  const { positions, lines } = useMemo(() => {
    const clusterCenters = [
      { x: 0, y: 15, z: 0 },        // hero
      { x: -8, y: 5, z: -5 },       // about
      { x: 8, y: -5, z: -12 },      // experience
      { x: -8, y: -12, z: -18 },    // certificates (New!)
      { x: 0, y: -22, z: -26 },     // skills (3D Brain)
      { x: 8, y: -32, z: -34 },     // projects (3D Neurons)
      { x: -8, y: -42, z: -42 },    // services
      { x: 4, y: -50, z: -50 },     // testimonials
      { x: 0, y: -60, z: -58 }      // contact
    ];

    // Subtle displacement of starting cluster centers per variation
    const shiftedCenters = clusterCenters.map((center, idx) => {
      const copy = { ...center };
      if (versionId === 2) {
        copy.x += Math.sin(idx) * 0.45;
        copy.y += Math.cos(idx) * 0.35;
      } else if (versionId === 3) {
        copy.x += Math.cos(idx * 1.5) * 0.55;
        copy.z += Math.sin(idx * 1.5) * 0.45;
      } else if (versionId === 4) {
        copy.y += Math.sin(idx * 2) * 0.45;
        copy.z += Math.cos(idx * 2) * 0.35;
      }
      return copy;
    });

    const tempPositions: number[] = [];
    const clustersCount = shiftedCenters.length;
    const particlesPerCluster = 20; // 180 total particles
    
    for (let c = 0; c < clustersCount; c++) {
      const center = shiftedCenters[c];
      for (let p = 0; p < particlesPerCluster; p++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        // Vary the radius dispersion slightly based on versionId
        let radius = 1.2 + Math.random() * 3.8;
        if (versionId === 2) radius = 1.0 + Math.random() * 4.1;
        else if (versionId === 3) radius = 1.4 + Math.random() * 3.3;
        else if (versionId === 4) radius = 0.8 + Math.random() * 4.3;
        
        const x = center.x + Math.sin(phi) * Math.cos(theta) * radius;
        const y = center.y + Math.sin(phi) * Math.sin(theta) * radius;
        const z = center.z + Math.cos(phi) * radius;
        
        tempPositions.push(x, y, z);
      }
    }

    const posArray = new Float32Array(tempPositions);
    const tempLines: number[] = [];

    // Vary bridging synapse probability per version
    let bridgeProb = 0.6; // standard (Version 1)
    if (versionId === 2) bridgeProb = 0.5;
    else if (versionId === 3) bridgeProb = 0.7;
    else if (versionId === 4) bridgeProb = 0.55;

    // Establish connections (intracluster and intercluster)
    for (let c = 0; c < clustersCount; c++) {
      const startIdx = c * particlesPerCluster;
      const endIdx = startIdx + particlesPerCluster;

      for (let i = startIdx; i < endIdx; i++) {
        const ix = posArray[i * 3];
        const iy = posArray[i * 3 + 1];
        const iz = posArray[i * 3 + 2];

        // 1. Connect to 2 nearest neighbors in the same cluster
        const clusterDists = [];
        for (let j = startIdx; j < endIdx; j++) {
          if (i === j) continue;
          const jx = posArray[j * 3];
          const jy = posArray[j * 3 + 1];
          const jz = posArray[j * 3 + 2];
          const dist = Math.sqrt((ix - jx) ** 2 + (iy - jy) ** 2 + (iz - jz) ** 2);
          clusterDists.push({ index: j, dist });
        }
        clusterDists.sort((a, b) => a.dist - b.dist);
        
        for (let k = 0; k < Math.min(2, clusterDists.length); k++) {
          const target = clusterDists[k].index;
          tempLines.push(ix, iy, iz, posArray[target * 3], posArray[target * 3 + 1], posArray[target * 3 + 2]);
        }

        // 2. Connect to the nearest neighbor in the next adjacent cluster (continuous winding fiber)
        if (c < clustersCount - 1) {
          const nextStart = (c + 1) * particlesPerCluster;
          const nextEnd = nextStart + particlesPerCluster;
          
          let nearestNextIdx = nextStart;
          let minNextDist = Infinity;
          for (let j = nextStart; j < nextEnd; j++) {
            const jx = posArray[j * 3];
            const jy = posArray[j * 3 + 1];
            const jz = posArray[j * 3 + 2];
            const dist = Math.sqrt((ix - jx) ** 2 + (iy - jy) ** 2 + (iz - jz) ** 2);
            if (dist < minNextDist) {
              minNextDist = dist;
              nearestNextIdx = j;
            }
          }
          if (Math.random() > bridgeProb) {
            tempLines.push(ix, iy, iz, posArray[nearestNextIdx * 3], posArray[nearestNextIdx * 3 + 1], posArray[nearestNextIdx * 3 + 2]);
          }
        }
      }
    }

    const lineArray = new Float32Array(tempLines);
    return { positions: posArray, lines: lineArray };
  }, [versionId]);

  useEffect(() => {
    onLinesReady(lines);
  }, [lines, onLinesReady]);

  // Parallax Orbit
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.015 + mouse.current.x * 0.04;
      pointsRef.current.rotation.x = mouse.current.y * 0.04;
      if (isSleeping) {
        const mat = pointsRef.current.material as THREE.PointsMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, 0.02);
      }
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = elapsed * 0.015 + mouse.current.x * 0.04;
      linesRef.current.rotation.x = mouse.current.y * 0.04;
      if (isSleeping) {
        const mat = linesRef.current.material as THREE.LineBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, 0.02);
      }
    }
  });

  return (
    <group>
      {/* Neurons */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={nodeColor}
          size={0.16}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
        />
      </points>

      {/* Synapse Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={synapseColor}
          transparent={true}
          opacity={synapseOpacity}
          depthWrite={false}
        />
      </lineSegments>

      {/* Volumetric ambient floating dust */}
      <FloatingDust isSleeping={isSleeping} theme={theme} />
    </group>
  );
}

function FloatingDust({ isSleeping, theme }: { isSleeping: boolean; theme: 'dark' | 'light' }) {
  const dustRef = useRef<THREE.Points>(null);
  
  const isLight = theme === 'light';
  const dustColor = isLight ? '#0284C7' : '#FFFFFF';
  const dustOpacity = isLight ? 0.22 : 0.35;

  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 260; i++) {
      temp.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 80 - 15,
        (Math.random() - 0.5) * 40 - 20
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (dustRef.current) {
      dustRef.current.rotation.y = elapsed * 0.006;
      dustRef.current.rotation.x = elapsed * 0.002;
      
      if (isSleeping) {
        const mat = dustRef.current.material as THREE.PointsMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, 0.03);
      }
    }
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={dustColor}
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={dustOpacity}
        depthWrite={false}
      />
    </points>
  );
}

interface NeuralBackgroundProps {
  theme: 'dark' | 'light';
  isSleeping: boolean;
  onPositionChange: (pos: { x: number; y: number; z: number }) => void;
  hoveredLobe: number | null;
  activeProject: number | null;
  onSelectProject: (id: number | null) => void;
}

export default function NeuralBackground({ 
  theme, 
  isSleeping, 
  onPositionChange, 
  hoveredLobe, 
  activeProject, 
  onSelectProject 
}: NeuralBackgroundProps) {
  
  const isLight = theme === 'light';
  const [lines, setLines] = useState<Float32Array | null>(null);

  // Predefine and select one of 4 background variations, always showing Version 1 on first visit
  const [versionId] = useState(() => {
    try {
      const hasVisited = localStorage.getItem('mahfouz_visited');
      if (!hasVisited) {
        localStorage.setItem('mahfouz_visited', 'true');
        return 1; // Always original background on first visit
      }
      return Math.floor(Math.random() * 4) + 1;
    } catch (e) {
      return 1; // Fail-safe for sandboxed envs
    }
  });

  return (
    <div className="fixed inset-0 z-0 bg-[#050816] transition-colors duration-700 dark:bg-[#050816] light:bg-[#F4F6FA] overflow-hidden">
      {/* Volumetric Apple Vision Pro style backdrop lighting */}
      {!isLight ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(0,229,255,0.06)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(57,255,136,0.04)_0%,transparent_50%)] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(2,132,199,0.06)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(5,150,105,0.04)_0%,transparent_50%)] pointer-events-none" />
        </>
      )}
      
      <Canvas
        camera={{ position: [0, 15, 10], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <color attach="background" args={[isLight ? '#F4F6FA' : '#050816']} />
        
        {/* Soft volumetric lighting */}
        <ambientLight intensity={isLight ? 2.2 : 1.6} />
        <pointLight position={[10, 20, 10]} intensity={1.5} />
        
        <NeuralNetworkMesh versionId={versionId} isSleeping={isSleeping} theme={theme} onLinesReady={setLines} />
        
        {/* Render packets on lines once generated */}
        {lines && (
          <DataPackets versionId={versionId} lines={lines} theme={theme} isSleeping={isSleeping} />
        )}
        
        {/* 3D Brain model inside coordinates map */}
        <NeuralBrainLobes hoveredLobe={hoveredLobe} />
        
        {/* 3D Giant Projects inside coordinates map */}
        <GiantNeuronProject activeProject={activeProject} onSelectProject={onSelectProject} />
        
        <CameraController 
          versionId={versionId}
          isSleeping={isSleeping}
          onPositionChange={onPositionChange} 
        />
      </Canvas>
    </div>
  );
}
