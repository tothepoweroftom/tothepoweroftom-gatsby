import {
    DataTexture,
    FloatType,
    Math as _Math,
    Mesh,
    OrthographicCamera,
    PlaneBufferGeometry,
    RGBFormat,
    Scene,
    ShaderMaterial,
    UniformsUtils
  } from 'three/src/Three'
  import { FilmShader } from '../shaders/FilmShader.js'
  import { Pass } from './Pass.js'
  /**
   * @author alteredq / http://alteredqualia.com/
   */
  
  var FilmPass = function() {
    Pass.call(this)
    if (FilmShader === undefined) console.error('THREE.FilmPass relies on THREE.FilmShader')
    var shader = FilmShader
    this.uniforms = UniformsUtils.clone(shader.uniforms)
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    })
  
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene = new Scene()
    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null)
    this.quad.frustumCulled = false // Avoid getting clipped
    this.scene.add(this.quad)
    this.factor = 0
  
    this.uniforms.grayscale.value = 0.1
    this.uniforms.nIntensity.value = 1000.0
    this.uniforms.sIntensity.value = 0.2
    this.uniforms.sCount.value = 500
  
    this.enabled = true
    this.renderToScreen = true
    this.needsSwap = true
  }
  
  FilmPass.prototype = Object.assign(Object.create(Pass.prototype), {
    constructor: FilmPass,
    render: function(renderer, writeBuffer, readBuffer, delta) {
      this.uniforms['tDiffuse'].value = readBuffer
      this.uniforms['time'].value += delta
  
      this.quad.material = this.material
      if (this.renderToScreen) {
        renderer.setRenderTarget(null)
        renderer.render(this.scene, this.camera)
      } else {
        renderer.setRenderTarget(writeBuffer)
        if (this.clear) renderer.clear()
        renderer.render(this.scene, this.camera)
      }
    }
  })
  
  export { FilmPass }
  