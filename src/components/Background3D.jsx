import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

/* ─── Mouse-reactive camera rig ─── */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        mouse.current.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2
        mouse.current.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.5 - target.current.x) * 0.02
    target.current.y += (-mouse.current.y * 0.3 - target.current.y) * 0.02
    camera.position.x = target.current.x
    camera.position.y = target.current.y + 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── Scroll-reactive group wrapper ─── */
function ScrollGroup({ children }) {
  const groupRef = useRef()
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      const progress = scrollY.current / (document.body.scrollHeight - window.innerHeight || 1)
      groupRef.current.rotation.y += 0.001
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        progress * Math.PI * 0.15,
        0.02
      )
    }
  })

  return <group ref={groupRef}>{children}</group>
}

/* ─── Massive particle constellation field ─── */
function ConstellationField() {
  const count = isMobile ? 500 : 1800
  const lineCount = isMobile ? 50 : 250
  const pointsRef = useRef()
  const linesRef = useRef()

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const palette = [
      [0, 0.96, 1],     // cyan
      [0.66, 0.33, 0.97], // purple
      [0.23, 0.51, 0.96], // blue
      [0.93, 0.29, 0.6],  // pink
      [0.06, 0.73, 0.51], // green
    ]
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell with inner radius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 + Math.random() * 14
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c[0]
      col[i * 3 + 1] = c[1]
      col[i * 3 + 2] = c[2]
      sz[i] = 0.8 + Math.random() * 2.5
    }
    return { positions: pos, colors: col, sizes: sz }
  }, [])

  // Line connections
  const linePositions = useMemo(() => {
    const lp = new Float32Array(lineCount * 6)
    for (let i = 0; i < lineCount; i++) {
      const a = Math.floor(Math.random() * count)
      const b = Math.floor(Math.random() * count)
      lp[i * 6] = positions[a * 3]
      lp[i * 6 + 1] = positions[a * 3 + 1]
      lp[i * 6 + 2] = positions[a * 3 + 2]
      lp[i * 6 + 3] = positions[b * 3]
      lp[i * 6 + 4] = positions[b * 3 + 1]
      lp[i * 6 + 5] = positions[b * 3 + 2]
    }
    return lp
  }, [positions])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.15
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.015
      linesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.15
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lineCount * 2} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  )
}

/* ─── Animated glowing orbs (nebula blobs) ─── */
function NebulaOrbs() {
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10 - 3,
      ],
      scale: 1.5 + Math.random() * 2.5,
      color: ['#00f5ff', '#a855f7', '#3b82f6', '#ec4899', '#10b981', '#f59e0b'][i],
      speed: 0.5 + Math.random() * 1.5,
      distort: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  return (
    <group>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.8} floatIntensity={1.5}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              color={orb.color}
              speed={2}
              distort={orb.distort}
              radius={1}
              transparent
              opacity={0.07}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ─── Floating wireframe geometries ─── */
function FloatingGeometries() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Large icosahedron */}
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[5, 2, -4]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <MeshDistortMaterial
            color="#00f5ff"
            speed={2}
            distort={0.35}
            transparent
            opacity={0.25}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Torus knot */}
      <Float speed={0.8} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-6, -2, -3]} rotation={[0.5, 0.3, 0]}>
          <torusKnotGeometry args={[1.2, 0.3, 128, 16, 2, 3]} />
          <MeshWobbleMaterial
            color="#a855f7"
            speed={0.8}
            factor={0.3}
            transparent
            opacity={0.15}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Double torus */}
      <Float speed={1.5} rotationIntensity={1.8} floatIntensity={1.2}>
        <mesh position={[4, -3, -5]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.15, 16, 80]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.2} wireframe />
        </mesh>
        <mesh position={[4, -3, -5]} rotation={[Math.PI / 3, Math.PI / 2, 0]}>
          <torusGeometry args={[1.4, 0.15, 16, 80]} />
          <meshStandardMaterial color="#ec4899" transparent opacity={0.2} wireframe />
        </mesh>
      </Float>

      {/* Dodecahedron */}
      <Float speed={1} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[-4, 3, -6]}>
          <dodecahedronGeometry args={[1.1]} />
          <MeshDistortMaterial
            color="#f59e0b"
            speed={1.5}
            distort={0.25}
            transparent
            opacity={0.2}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Octahedron */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[7, 0, -7]}>
          <octahedronGeometry args={[0.9]} />
          <meshStandardMaterial
            color="#10b981"
            transparent
            opacity={0.2}
            wireframe
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Large background sphere cage */}
      <Float speed={0.3} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh position={[0, 0, -8]}>
          <icosahedronGeometry args={[6, 1]} />
          <meshStandardMaterial
            color="#00f5ff"
            transparent
            opacity={0.03}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}

/* ─── Animated ring structures ─── */
function AnimatedRings() {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.15
      ring1.current.rotation.z = t * 0.1
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.12
      ring2.current.rotation.x = t * 0.08
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.18
      ring3.current.rotation.y = t * 0.05
    }
  })

  return (
    <group position={[0, 0, -4]}>
      <mesh ref={ring1}>
        <torusGeometry args={[3.5, 0.02, 8, 120]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[4.2, 0.015, 8, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[5, 0.01, 8, 120]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

/* ─── Flowing data streams (vertical particle lines) ─── */
function DataStreams() {
  const streamCount = 8
  const particlesPerStream = 40
  const refs = useRef([])

  const streams = useMemo(() => {
    return Array.from({ length: streamCount }, (_, s) => {
      const x = (Math.random() - 0.5) * 16
      const z = -2 - Math.random() * 8
      const pts = new Float32Array(particlesPerStream * 3)
      for (let i = 0; i < particlesPerStream; i++) {
        pts[i * 3] = x + (Math.random() - 0.5) * 0.3
        pts[i * 3 + 1] = (i / particlesPerStream) * 16 - 8
        pts[i * 3 + 2] = z + (Math.random() - 0.5) * 0.3
      }
      return { positions: pts, color: ['#00f5ff', '#a855f7', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#00f5ff', '#a855f7'][s] }
    })
  }, [])

  useFrame(({ clock }) => {
    refs.current.forEach((ref, idx) => {
      if (ref) {
        const arr = ref.geometry.attributes.position.array
        for (let i = 0; i < particlesPerStream; i++) {
          arr[i * 3 + 1] -= 0.03 + idx * 0.005
          if (arr[i * 3 + 1] < -8) arr[i * 3 + 1] = 8
        }
        ref.geometry.attributes.position.needsUpdate = true
      }
    })
  })

  return (
    <group>
      {streams.map((stream, i) => (
        <points key={i} ref={(el) => (refs.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesPerStream}
              array={stream.positions.slice()}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color={stream.color}
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  )
}

/* ─── Stunning Holographic 3D Model (centerpiece) ─── */
function HolographicModel() {
  const groupRef = useRef()
  const shell1Ref = useRef()
  const shell2Ref = useRef()
  const shell3Ref = useRef()
  const coreRef = useRef()
  const glowRef = useRef()
  const helixRef = useRef()
  const scanRef = useRef()
  const satellitesRef = useRef()

  // Orbiting satellite nodes
  const satelliteCount = 10
  const satelliteData = useMemo(() => {
    return Array.from({ length: satelliteCount }, (_, i) => ({
      orbitRadius: 2.2 + Math.random() * 1.2,
      speed: 0.3 + Math.random() * 0.6,
      phase: (i / satelliteCount) * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 2,
      size: 0.04 + Math.random() * 0.06,
      color: ['#00f5ff', '#a855f7', '#3b82f6', '#ec4899', '#10b981'][i % 5],
    }))
  }, [])

  // DNA helix points
  const helixPositions = useMemo(() => {
    const points1 = []
    const points2 = []
    const segments = 120
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 6
      const y = (i / segments) * 5 - 2.5
      const r = 1.6
      points1.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r))
      points2.push(new THREE.Vector3(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r))
    }
    return { strand1: points1, strand2: points2 }
  }, [])

  const helixCurve1 = useMemo(() => new THREE.CatmullRomCurve3(helixPositions.strand1), [helixPositions])
  const helixCurve2 = useMemo(() => new THREE.CatmullRomCurve3(helixPositions.strand2), [helixPositions])

  // Connection rungs between helix strands
  const rungData = useMemo(() => {
    const rungs = []
    for (let i = 0; i < 20; i++) {
      const t = i / 20
      const p1 = helixCurve1.getPointAt(t)
      const p2 = helixCurve2.getPointAt(t)
      rungs.push({ start: p1, end: p2 })
    }
    return rungs
  }, [helixCurve1, helixCurve2])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Whole model slow rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12
    }

    // Outer wireframe shell - slow forward rotation
    if (shell1Ref.current) {
      shell1Ref.current.rotation.x = t * 0.08
      shell1Ref.current.rotation.z = t * 0.06
      shell1Ref.current.material.opacity = 0.08 + Math.sin(t * 0.5) * 0.03
    }

    // Middle shell - reverse rotation
    if (shell2Ref.current) {
      shell2Ref.current.rotation.y = -t * 0.15
      shell2Ref.current.rotation.x = t * 0.1
      shell2Ref.current.material.opacity = 0.12 + Math.sin(t * 0.7 + 1) * 0.04
    }

    // Inner shell - fastest
    if (shell3Ref.current) {
      shell3Ref.current.rotation.z = t * 0.2
      shell3Ref.current.rotation.y = -t * 0.12
    }

    // Morphing core
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.2
      coreRef.current.scale.setScalar(s)
      coreRef.current.rotation.y = t * 0.8
      coreRef.current.rotation.x = t * 0.5
    }

    // Pulsing glow
    if (glowRef.current) {
      const gs = 2.5 + Math.sin(t * 1.2) * 0.8
      glowRef.current.scale.setScalar(gs)
      glowRef.current.material.opacity = 0.04 + Math.sin(t * 1.5) * 0.02
    }

    // DNA helix rotation
    if (helixRef.current) {
      helixRef.current.rotation.y = t * 0.15
    }

    // Holographic scan line
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(t * 0.6) * 2.5
      scanRef.current.material.opacity = 0.15 + Math.sin(t * 2) * 0.08
    }

    // Satellites orbiting
    if (satellitesRef.current) {
      satellitesRef.current.children.forEach((sat, i) => {
        const data = satelliteData[i]
        const angle = t * data.speed + data.phase
        sat.position.x = Math.cos(angle) * data.orbitRadius
        sat.position.z = Math.sin(angle) * data.orbitRadius
        sat.position.y = data.yOffset + Math.sin(t * 0.5 + data.phase) * 0.5
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* === Outer wireframe shell (icosahedron) === */}
      <mesh ref={shell1Ref}>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.08}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === Middle wireframe shell (dodecahedron) === */}
      <mesh ref={shell2Ref}>
        <dodecahedronGeometry args={[2.3, 0]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.12}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === Inner wireframe shell (octahedron) === */}
      <mesh ref={shell3Ref}>
        <octahedronGeometry args={[1.5]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === Morphing distorted core === */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 3]} />
        <MeshDistortMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={1.2}
          speed={5}
          distort={0.6}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === Pulsing glow sphere === */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === Second glow (purple) === */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === DNA Double Helix === */}
      <group ref={helixRef}>
        {/* Strand 1 */}
        <mesh>
          <tubeGeometry args={[helixCurve1, 100, 0.025, 8, false]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Strand 2 */}
        <mesh>
          <tubeGeometry args={[helixCurve2, 100, 0.025, 8, false]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Rungs connecting strands */}
        {rungData.map((rung, i) => {
          const midPoint = new THREE.Vector3().lerpVectors(rung.start, rung.end, 0.5)
          const direction = new THREE.Vector3().subVectors(rung.end, rung.start)
          const length = direction.length()
          const quaternion = new THREE.Quaternion()
          quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())

          return (
            <mesh key={i} position={midPoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.008, 0.008, length, 4]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? '#ec4899' : '#10b981'}
                transparent
                opacity={0.25}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )
        })}
      </group>

      {/* === Holographic scan ring === */}
      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.03, 4, 80]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* === Orbiting satellite nodes === */}
      <group ref={satellitesRef}>
        {satelliteData.map((sat, i) => (
          <mesh key={i}>
            <sphereGeometry args={[sat.size, 8, 8]} />
            <meshBasicMaterial
              color={sat.color}
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* === Orbit rings (faint) === */}
      {[2.2, 2.6, 3.0, 3.4].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.15, i * 0.3, 0]}>
          <torusGeometry args={[r, 0.003, 4, 100]} />
          <meshBasicMaterial
            color={['#00f5ff', '#a855f7', '#3b82f6', '#ec4899'][i]}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Grid floor ─── */
function GridFloor() {
  return (
    <group position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[40, 40, '#00f5ff', '#1a1a3e']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#0a0a1a" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

/* ─── Main Background3D export ─── */
export default function Background3D() {
  return (
    <div className="background-3d-container">
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 65 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
        <pointLight position={[-8, 5, -5]} color="#a855f7" intensity={0.4} distance={20} />
        <pointLight position={[8, -3, 3]} color="#00f5ff" intensity={0.4} distance={20} />
        <pointLight position={[0, 8, -8]} color="#3b82f6" intensity={0.2} distance={25} />
        <pointLight position={[-5, -5, 5]} color="#ec4899" intensity={0.15} distance={15} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a1a', 8, 28]} />

        <CameraRig />

        <ScrollGroup>
          <ConstellationField />
          <NebulaOrbs />
          <FloatingGeometries />
          <AnimatedRings />
          <DataStreams />
          {!isMobile && <HolographicModel />}
          <GridFloor />

          {/* Stars background */}
          <Stars
            radius={25}
            depth={60}
            count={isMobile ? 800 : 3000}
            factor={isMobile ? 1.5 : 3}
            saturation={0.5}
            fade
            speed={0.5}
          />

          {/* Sparkle layers */}
          <Sparkles count={isMobile ? 40 : 200} scale={20} size={2} speed={0.4} color="#00f5ff" opacity={0.5} />
          {!isMobile && (
            <>
              <Sparkles count={150} scale={18} size={1.5} speed={0.3} color="#a855f7" opacity={0.4} />
              <Sparkles count={100} scale={15} size={1} speed={0.6} color="#3b82f6" opacity={0.3} />
            </>
          )}
        </ScrollGroup>
      </Canvas>
    </div>
  )
}
