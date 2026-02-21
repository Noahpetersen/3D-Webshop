import { Canvas } from '@react-three/fiber'
import { Box } from '@react-three/drei'

export default function ProductViewer() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Box />
      </Canvas>
    </div>
  )
}
