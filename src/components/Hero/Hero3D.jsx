import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometries() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Sphere */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 0.5, -1]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#00f5ff"
            speed={2}
            distort={0.3}
            radius={1}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      </Float>

      {/* Torus */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-2.5, -1, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.8, 0.25, 16, 60]} />
          <MeshWobbleMaterial
            color="#a855f7"
            speed={1}
            factor={0.4}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      </Float>

      {/* Octahedron */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[3.5, -1.5, -2]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Dodecahedron */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[-3, 1.5, -1.5]}>
          <dodecahedronGeometry args={[0.6]} />
          <MeshDistortMaterial
            color="#ec4899"
            speed={3}
            distort={0.2}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Small spheres cluster */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const r = 3.5 + Math.random() * 1.5
        return (
          <Float key={i} speed={1 + Math.random()} floatIntensity={1 + Math.random()}>
            <mesh position={[Math.cos(angle) * r, (Math.random() - 0.5) * 3, Math.sin(angle) * r - 2]}>
              <sphereGeometry args={[0.06 + Math.random() * 0.08, 8, 8]} />
              <meshStandardMaterial
                color={['#00f5ff', '#a855f7', '#3b82f6', '#ec4899'][i % 4]}
                emissive={['#00f5ff', '#a855f7', '#3b82f6', '#ec4899'][i % 4]}
                emissiveIntensity={0.5}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function ParticleField() {
  const count = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1
    }
  })

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#00f5ff" transparent opacity={0.6} sizeAttenuation />
      </points>
      <Sparkles count={100} scale={10} size={1.5} speed={0.3} color="#a855f7" />
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      eventSource={document.getElementById('root')}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={0.3} />
      <pointLight position={[5, -2, 3]} color="#00f5ff" intensity={0.3} />
      <FloatingGeometries />
      <ParticleField />
    </Canvas>
  )
}
