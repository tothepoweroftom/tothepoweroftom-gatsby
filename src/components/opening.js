import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useState,useRef, useEffect, useCallback, useMemo } from 'react'
import { apply as applyThree, Canvas, useRender, useThree } from 'react-three-fiber'
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring/three'
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from './postprocessing/EffectComposer'
import { RenderPass } from './postprocessing/RenderPass'
import { FilmPass } from './postprocessing/FilmPass'
applySpring({ EffectComposer, RenderPass, FilmPass })
applyThree({ EffectComposer, RenderPass, FilmPass })

/** This component loads an image and projects it onto a plane */
function Image({ url, opacity, scale, ...props }) {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url])
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const { factor } = useSpring({ factor: hovered ? 1.1 : 1 })
  return (
    <a.mesh {...props} onHover={hover} onUnhover={unhover} scale={factor.interpolate(f => [scale * f, scale * f, 1])}>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <a.meshLambertMaterial attach="material" transparent opacity={opacity}>
        <primitive attach="map" object={texture} />
      </a.meshLambertMaterial>
    </a.mesh>
  )
}

/** This renders text via canvas and projects it as a sprite */
function Text({ children, position, opacity, color = 'white', fontSize = 410, rotation=-0.02, padding }) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree()
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.style.marginTop = padding;
    canvas.width = canvas.height = 2048
    const context = canvas.getContext('2d')
    context.font = `bold ${fontSize + viewportWidth/20}px MontSerrat`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.rotate(rotation)
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

/** This component creates a fullscreen colored plane */
function Background({ color }) {
  const { viewport } = useThree()
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  )
}

/** This component rotates a bunch of stars */
function Stars({ position }) {
  let group = useRef()
  let theta = 0
  useRender(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)))
    const s = Math.cos(THREE.Math.degToRad(theta * 2))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('red'), transparent: true })
    const coords = new Array(1000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return [geo, mat, coords]
  }, [])
  return (
    <a.group ref={group} position={position}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </a.group>
  )
}

function Sun({ position }) {
  let group = useRef()
  let theta = 0
  useRender(() => {

  })
    const geo = new THREE.SphereBufferGeometry(100, 10, 10)
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color('yellow'), transparent: true })
  return (
        <mesh key={0} geometry={geo} material={mat} position={[0,4,-10]} />
  )
}

/** This component creates a glitch effect */
const Effects = React.memo(({ factor }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  // This takes over as the main render-loop (when 2nd arg is set to true)
  useRender(() => composer.current.render(), true)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <a.filmPass attachArray="passes" renderToScreen args={[scene, camera]} />
    </effectComposer>
  )
})



/** This component maintains the scene */
function Scene({ top, mouse }) {
  const { size } = useThree()
  const scrollMax = size.height * 4.5
  return (
    <>
      <a.spotLight intensity={1.2} color="white" position={mouse.interpolate((x, y) => [x / 100, -y / 100, 6.5])} />
      <Effects factor={top.interpolate([0, 150], [1, 0])} />
      <Background color={'#000000'} />
      <Sun />

      <Stars position={top.interpolate(top => [0, -1 + top / 20, 0])} />
      <Text fontSize={120}>
        Tom Power
      </Text>
      <Text fontSize={50} rotation={0.0} position={[0,-1,0]}>
        Composer & Creative Technologist
      </Text>
    </>
  )
}



export default function Opening() {
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [])
  const onScroll = useCallback(e => set({ top: e.target.scrollTop }), [])
  return (
    <>
      <Canvas className="canvas">
        <Scene top={top} mouse={mouse} />
      </Canvas>
      <div className="scroll-container" onScroll={onScroll} onMouseMove={onMouseMove}>
        <div style={{ height: '525vh' }} />
      </div>
    </>
  )
}

