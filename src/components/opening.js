import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { apply, Canvas, useRender } from 'react-three-fiber'
import * as meshline from 'three.meshline'

apply(meshline)

const numLines = 500
const lines = new Array(numLines).fill()
const colors = ['#333333', '#aa1111', '#999999', '#aaaaaa']


function Fatline() {
  const material = useRef()
  const [color] = useState(() => colors[parseInt(colors.length * Math.random())])
  const [ratio] = useState(() => 0.5 + 0.5 * Math.random())
  const [width] = useState(() => 0.05 * Math.random())
  const [opacity] = useState(() => 0.1 + 0.5 * Math.random())

  // Calculate wiggly curve
  const [curve] = useState(() => {
    let pos = new THREE.Vector3(30 - 60 * Math.random(), -5, 10 - 20 * Math.random())
    return new Array(60).fill().map(() => pos.add(new THREE.Vector3(2 - Math.random() * 4, 4 - Math.random() * 2, 20 - Math.random() * 40)).clone())
  })
  // Hook into the render loop and decrease the materials dash-offset
  useRender(() => (material.current.uniforms.dashOffset.value -= 0.00005))
  return (
    <mesh>
      {/** MeshLine and CMRCurve are a OOP factories, not scene objects, hence all the imperative code in here :-( */}
      <meshLine onUpdate={self => (self.parent.geometry = self.geometry)}>
        <geometry onUpdate={self => self.parent.setGeometry(self)}>
          <catmullRomCurve3 args={[curve]} onUpdate={self => (self.parent.vertices = self.getPoints(50))} />
        </geometry>
      </meshLine>
      {/** MeshLineMaterial on the other hand is a regular material, so we can just attach it */}
      <meshLineMaterial attach="material" ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={ratio} />
    </mesh>
  )
}

function Scene() {
  let group = useRef()
  let theta = 0
  // Hook into the render loop and rotate the scene a bit
  useRender(() => group.current.rotation.set( 0, 0,  0 + 0.5 * Math.sin(THREE.Math.degToRad((theta+=0.1)))))
  return (
    <group ref={group}>
      {lines.map((_, index) => (
        <Fatline key={index} />
      ))}
    </group>
  )
}

export default function Opening() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <Canvas style={{ background: '#ffffff' }} camera={{ position: [0, 50, 20], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

