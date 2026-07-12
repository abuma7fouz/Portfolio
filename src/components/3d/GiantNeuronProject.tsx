import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GiantNeuronProps {
  activeProject: number | null; // 1 to 6
  onSelectProject: (id: number | null) => void;
}

interface Project3DData {
  id: number;
  name: string;
  color: string;
  position: THREE.Vector3;
  architecture: string[];
}

export default function GiantNeuronProject({ activeProject, onSelectProject }: GiantNeuronProps) {
  const groupRef = useRef<THREE.Group>(null);

  const projects: Project3DData[] = useMemo(() => [
    {
      id: 1,
      name: 'HR Analytics Dashboard',
      color: '#00E5FF',
      position: new THREE.Vector3(6, -30, -32),
      architecture: ['Power BI Engine', 'DAX Logic', 'Power Query Pipeline', 'Excel Core']
    },
    {
      id: 2,
      name: 'Emotion Recognition',
      color: '#5EEBFF',
      position: new THREE.Vector3(10, -30, -35),
      architecture: ['CNN Network', 'TensorFlow Core', 'OpenCV Process', 'Flask Web API']
    },
    {
      id: 3,
      name: 'EduBot AI Assistant',
      color: '#39FF88',
      position: new THREE.Vector3(6, -33, -31),
      architecture: ['BERT Classifier', 'T5 Summarizer', 'FastAPI Backend', 'Next.js UI']
    },
    {
      id: 4,
      name: 'Multilabel CXR-14 Disease Detection',
      color: '#FFC857',
      position: new THREE.Vector3(10, -33, -36),
      architecture: ['ResNet50 Backbone', 'Multi-Head Sigmoid', 'Focal Loss Optimizer', 'Streamlit App']
    },
    {
      id: 5,
      name: 'Fashion Multi-Label Classification',
      color: '#FF4D6D',
      position: new THREE.Vector3(7, -35, -33),
      architecture: ['YOLOv8 Feature Extractor', 'OpenCV Overlay', 'FastAPI Broker', 'Multi-Head Sigmoid']
    },
    {
      id: 6,
      name: 'SmartPlate Recognition',
      color: '#FFFFFF',
      position: new THREE.Vector3(9, -35, -37),
      architecture: ['YOLOv8 Segmenter', 'FastAPI Stats Broker', 'EasyOCR String Extractor', 'Regex Validation']
    }
  ], []);

  return (
    <group ref={groupRef}>
      {projects.map((proj) => (
        <NeuronNode
          key={proj.id}
          project={proj}
          isActive={activeProject === proj.id}
          isAnyActive={activeProject !== null}
          onClick={() => {
            if (activeProject === proj.id) {
              onSelectProject(null);
            } else {
              onSelectProject(proj.id);
            }
          }}
        />
      ))}
    </group>
  );
}

interface NeuronNodeProps {
  project: Project3DData;
  isActive: boolean;
  isAnyActive: boolean;
  onClick: () => void;
}

function NeuronNode({ project, isActive, isAnyActive, onClick }: NeuronNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Points>(null);
  const childGroupRef = useRef<THREE.Group>(null);

  // Generate orbital points for project neuron ring
  const ringPoints = useMemo(() => {
    const temp = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const x = Math.cos(theta) * 1.1;
      const y = (Math.random() - 0.5) * 0.1;
      const z = Math.sin(theta) * 1.1;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const pulseSpeed = isActive ? 4 : 1.5;
    const pulseFactor = 1 + Math.sin(elapsed * pulseSpeed) * (isActive ? 0.12 : 0.04);

    // Rotate core mesh
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.4;
      meshRef.current.rotation.x = elapsed * 0.2;
      meshRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }

    // Rotate satellite fingerprint rings
    if (ringRef.current) {
      ringRef.current.rotation.y = -elapsed * 0.6;
      ringRef.current.rotation.z = elapsed * 0.2;
    }

    // Orbit/spin child architectural nodes
    if (childGroupRef.current && isActive) {
      childGroupRef.current.rotation.y = elapsed * 0.3;
    }
  });

  // Decide sizing and visual weights
  let opacity = 0.75;
  let scale = 1.0;

  if (isAnyActive) {
    if (isActive) {
      opacity = 1.0;
      scale = 1.5;
    } else {
      opacity = 0.15; // Dim others
      scale = 0.75;
    }
  }

  return (
    <group 
      position={project.position} 
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Central Pulsing Wireframe Nucleus */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshBasicMaterial
          color={project.color}
          wireframe={true}
          transparent={true}
          opacity={opacity}
        />
      </mesh>

      {/* Orbiting Fingerprint Ring */}
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ringPoints, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={project.color}
          size={0.08}
          sizeAttenuation={true}
          transparent={true}
          opacity={opacity * 0.9}
        />
      </points>

      {/* Satellite Architecture Nodes (Sprouted when Active) */}
      {isActive && (
        <group ref={childGroupRef}>
          {project.architecture.map((_, index) => {
            const count = project.architecture.length;
            const angle = (index / count) * Math.PI * 2;
            const dist = 2.4; // radial orbit distance
            
            const cx = Math.cos(angle) * dist;
            const cz = Math.sin(angle) * dist;

            return (
              <group key={index} position={[cx, 0, cz]}>
                {/* Connecting Dendrite Line */}
                <line>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      args={[new Float32Array([0, 0, 0, -cx, 0, -cz]), 3]}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial 
                    color={project.color} 
                    transparent={true} 
                    opacity={0.35} 
                  />
                </line>

                {/* Sub Node */}
                <mesh>
                  <sphereGeometry args={[0.18, 8, 8]} />
                  <meshBasicMaterial 
                    color="#FFFFFF" 
                    wireframe={true} 
                    transparent={true}
                    opacity={0.9}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
}
