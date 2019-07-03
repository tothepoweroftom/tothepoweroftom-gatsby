import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { apply as applyThree, Canvas, useRender, useThree } from 'react-three-fiber'
// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring/three'
import * as meshline from 'three.meshline'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'


applyThree(meshline)

const numLines = 500
const lines = new Array(numLines).fill()
const colors = ['#333333', '#aa1111', '#999999', '#aaaaaa']


function Fatline() {
  const material = useRef()
  const [color] = useState(() => colors[parseInt(colors.length * Math.random())])
  const [ratio] = useState(() => 0.5 + 0.5 * Math.random())
  const [width] = useState(() => 0.1 * Math.random())
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

function Text({ children, position, opacity, color = 'white', fontSize = 410 }) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree()
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 2048
    const context = canvas.getContext('2d')
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = color
    context.fillText(children, 1024, 1024 - 410 / 2)
    return canvas
  }, [children, width, height])
  return (
    <a.sprite scale={[scale, scale, 1]} position={position}>
      <a.spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture attach="map" image={canvas} premultiplyAlpha onUpdate={s => (s.needsUpdate = true)} />
      </a.spriteMaterial>
    </a.sprite>
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
      <Canvas style={{ background: '#000'}} camera={{ position: [0, 50, 20], fov: 75 }} pixelRatio = {2} >
        <Scene />
      </Canvas>

      <div className="main-name">
        <h1>Tom Power</h1>
        <h3>Composer & Creative Technologist</h3>
        <div className="container " style={{margin: '20px auto'}}>
            <div className="columns">
              
              
              <div className="column is-12 social">
                <a title="twitter" href="https://twitter.com/tothepoweroftom">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

