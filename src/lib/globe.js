// globe.js — Three.js globe with animated freight lanes.
// Ported from the Gridstream v2 design handoff (Variant A · Mission Control).
// Single class, no deps beyond THREE.
//
// Usage:
//   const g = new Globe(container, {
//     surface: 'graticule' | 'dots' | 'wireframe' | 'solid',
//     arcColor: 0x48d8a0,
//     accentColor: 0x48d8a0,
//     atmosphereColor: 0x48d8a0,
//     atmosphereIntensity: 1.0,
//     autoRotate: true,
//     rings: false,
//     points: [{ lat, lng, color }],
//     arcs:   [{ from: [lat, lng], to: [lat, lng], color, duration, delay }],
//   });
//   g.destroy();

import * as THREE from 'three'

export class Globe {
  constructor(container, opts) {
    this.container = container
    this.opts = Object.assign({
      surface: 'graticule',
      radius: 1,
      cameraDistance: 2.85,
      cameraFov: 28,
      rotationSpeed: 0.0007,
      tilt: 0.32,
      yaw: 0.4,
      autoRotate: true,
      rings: false,
      arcColor: 0x48d8a0,
      accentColor: 0x48d8a0,
      atmosphereColor: 0x48d8a0,
      atmosphereIntensity: 1.0,
      innerColor: 0x0b1426,
      graticuleOpacity: 0.32,
      showGraticule: true,
      points: [],
      arcs: [],
    }, opts || {})

    this._init()
    this._build()
    this._tick = this._tick.bind(this)
    this._start = performance.now()
    this._running = true
    requestAnimationFrame(this._tick)

    this._resizeObs = new ResizeObserver(() => this._resize())
    this._resizeObs.observe(this.container)
  }

  _init() {
    const w = this.container.clientWidth || 600
    const h = this.container.clientHeight || 600

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(this.opts.cameraFov, w / h, 0.1, 100)
    this.camera.position.set(0, 0, this.opts.cameraDistance)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.domElement.style.display = 'block'
    this.container.appendChild(this.renderer.domElement)

    this.root = new THREE.Group()
    this.root.rotation.z = this.opts.tilt
    this.scene.add(this.root)

    this.earth = new THREE.Group()
    this.earth.rotation.y = this.opts.yaw
    this.root.add(this.earth)
  }

  _resize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (!w || !h) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  _build() {
    this._buildSurface()
    this._buildAtmosphere()
    if (this.opts.rings) this._buildRings()
    this._buildPoints()
    this._buildArcs()
  }

  _buildSurface() {
    const r = this.opts.radius
    const accent = new THREE.Color(this.opts.accentColor)
    const inner = new THREE.Color(this.opts.innerColor)

    if (this.opts.surface === 'graticule') {
      // dark inner sphere + graticule lines
      const innerMesh = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.995, 64, 64),
        new THREE.MeshBasicMaterial({ color: inner })
      )
      this.earth.add(innerMesh)
      if (this.opts.showGraticule) this._addGraticule(r * 1.001, accent, this.opts.graticuleOpacity)
    } else if (this.opts.surface === 'dots') {
      // dotted-mesh sphere — no inner sphere, points only
      this._addDottedSphere(r, accent)
    } else if (this.opts.surface === 'wireframe') {
      const wf = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(r, 28, 18)),
        new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.28 })
      )
      this.earth.add(wf)
      // very faint inner sphere to give occlusion
      const innerMesh = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.98, 48, 48),
        new THREE.MeshBasicMaterial({ color: inner, transparent: true, opacity: 0.4 })
      )
      this.earth.add(innerMesh)
    } else if (this.opts.surface === 'solid') {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(r, 64, 64),
        new THREE.MeshBasicMaterial({ color: inner })
      )
      this.earth.add(sphere)
      if (this.opts.showGraticule) this._addGraticule(r * 1.001, accent, this.opts.graticuleOpacity)
    }
  }

  _addGraticule(r, color, opacity) {
    const pts = []
    // meridians every 30°
    for (let lng = 0; lng < 360; lng += 30) {
      for (let lat = -90; lat < 90; lat += 3) {
        pts.push(this._llToVec(lat, lng, r), this._llToVec(lat + 3, lng, r))
      }
    }
    // parallels every 30°, plus equator
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lng = 0; lng < 360; lng += 3) {
        pts.push(this._llToVec(lat, lng, r), this._llToVec(lat, lng + 3, r))
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    this.earth.add(new THREE.LineSegments(geo, mat))
  }

  _addDottedSphere(r, color) {
    const count = 1800
    const positions = new Float32Array(count * 3)
    const phi0 = Math.PI * (Math.sqrt(5) - 1) // golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2 // -1..1
      const rad = Math.sqrt(1 - y * y)
      const theta = phi0 * i
      positions[i * 3]     = r * rad * Math.cos(theta)
      positions[i * 3 + 1] = r * y
      positions[i * 3 + 2] = r * rad * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color,
      size: 0.013,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      depthWrite: false,
    })
    this.earth.add(new THREE.Points(geo, mat))
  }

  _buildAtmosphere() {
    const r = this.opts.radius
    const color = new THREE.Color(this.opts.atmosphereColor)
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        glowColor: { value: color },
        intensity: { value: this.opts.atmosphereIntensity },
      },
      vertexShader: [
        'varying vec3 vNormal;',
        'void main() {',
        '  vNormal = normalize(normalMatrix * normal);',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}',
      ].join('\n'),
      fragmentShader: [
        'uniform vec3 glowColor;',
        'uniform float intensity;',
        'varying vec3 vNormal;',
        'void main() {',
        '  float f = pow(0.62 - dot(vNormal, vec3(0., 0., 1.0)), 2.2);',
        '  gl_FragColor = vec4(glowColor, f * intensity);',
        '}',
      ].join('\n'),
    })
    const atm = new THREE.Mesh(new THREE.SphereGeometry(r * 1.18, 64, 64), mat)
    this.root.add(atm)
  }

  _buildRings() {
    const colors = [this.opts.accentColor, 0x4a90e2, this.opts.accentColor]
    const radii = [1.45, 1.75, 2.1]
    const tilts = [
      [0.4, 0, 0.6],
      [-0.5, 0.3, -0.3],
      [0.15, -0.4, 0.7],
    ]
    this._rings = []
    radii.forEach((rad, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(rad, 0.0035, 6, 160),
        new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0.32 })
      )
      ring.rotation.set(tilts[i][0], tilts[i][1], tilts[i][2])
      this.root.add(ring)

      // satellite dot riding the ring
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 12, 12),
        new THREE.MeshBasicMaterial({ color: colors[i] })
      )
      ring.add(sat)
      ring.userData.sat = sat
      ring.userData.radius = rad
      ring.userData.angle = i * 1.7
      ring.userData.speed = 0.0005 + i * 0.00025
      sat.position.set(rad, 0, 0)
      this._rings.push(ring)
    })
  }

  _buildPoints() {
    this._points = []
    const defaultColor = new THREE.Color(this.opts.accentColor)
    for (const p of this.opts.points) {
      const col = p.color != null ? new THREE.Color(p.color) : defaultColor
      const pos = this._llToVec(p.lat, p.lng, this.opts.radius * 1.005)
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.013, 14, 14),
        new THREE.MeshBasicMaterial({ color: col })
      )
      dot.position.copy(pos)
      this.earth.add(dot)
      // halo ring, oriented to face outward
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.022, 0.045, 32),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
      )
      halo.position.copy(pos)
      halo.lookAt(0, 0, 0)
      this.earth.add(halo)
      this._points.push({ dot, halo, phase: Math.random() * Math.PI * 2 })
    }
  }

  _buildArcs() {
    this._arcs = []
    this.opts.arcs.forEach((arc, i) => {
      const r = this.opts.radius
      const from = this._llToVec(arc.from[0], arc.from[1], r)
      const to   = this._llToVec(arc.to[0],   arc.to[1],   r)
      const dist = from.distanceTo(to)
      const lift = 0.12 + dist * 0.28
      const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(r + lift)
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to)

      const samples = 96
      const points = curve.getPoints(samples)
      const color = new THREE.Color(arc.color != null ? arc.color : this.opts.arcColor)

      // base faint trail along the full path
      const baseGeo = new THREE.BufferGeometry().setFromPoints(points)
      const baseMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 })
      this.earth.add(new THREE.Line(baseGeo, baseMat))

      // moving comet — vertex-colored line that fades head to tail
      const cometLen = 22
      const positions = new Float32Array(cometLen * 3)
      const colors = new Float32Array(cometLen * 3)
      const cometGeo = new THREE.BufferGeometry()
      cometGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      cometGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      const cometMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })
      const cometLine = new THREE.Line(cometGeo, cometMat)
      this.earth.add(cometLine)

      this._arcs.push({
        curve, samples, cometLen, color,
        positions, colors, geo: cometGeo,
        duration: arc.duration != null ? arc.duration : 4200,
        delay: arc.delay != null ? arc.delay : i * 700,
      })
    })
  }

  _llToVec(lat, lng, r) {
    const phi = (90 - lat) * Math.PI / 180
    const theta = (lng + 180) * Math.PI / 180
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    )
  }

  _tick(now) {
    if (!this._running) return
    const t = now - this._start

    if (this.opts.autoRotate) {
      this.earth.rotation.y += this.opts.rotationSpeed * 16
    }

    // pulse halos
    for (let i = 0; i < this._points.length; i++) {
      const p = this._points[i]
      const s = 1 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.002 + p.phase))
      p.halo.scale.setScalar(s)
      p.halo.material.opacity = 0.55 * (1 - (s - 1) / 0.9)
    }

    // animate arcs
    for (let i = 0; i < this._arcs.length; i++) {
      const arc = this._arcs[i]
      const cycle = arc.duration
      const localT = ((t + arc.delay) % cycle) / cycle // 0..1
      const headSample = localT * arc.samples
      for (let k = 0; k < arc.cometLen; k++) {
        const sT = (headSample - k * 0.8) / arc.samples
        const clamped = Math.max(0, Math.min(1, sT))
        const pos = arc.curve.getPoint(clamped)
        arc.positions[k * 3]     = pos.x
        arc.positions[k * 3 + 1] = pos.y
        arc.positions[k * 3 + 2] = pos.z
        const a = sT <= 0 || sT >= 1 ? 0 : (1 - k / arc.cometLen)
        arc.colors[k * 3]     = arc.color.r * a
        arc.colors[k * 3 + 1] = arc.color.g * a
        arc.colors[k * 3 + 2] = arc.color.b * a
      }
      arc.geo.attributes.position.needsUpdate = true
      arc.geo.attributes.color.needsUpdate = true
    }

    // satellites
    if (this._rings) {
      for (const ring of this._rings) {
        ring.userData.angle += ring.userData.speed * 16
        const a = ring.userData.angle
        ring.userData.sat.position.set(
          Math.cos(a) * ring.userData.radius,
          Math.sin(a) * ring.userData.radius,
          0
        )
      }
    }

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this._tick)
  }

  destroy() {
    this._running = false
    this._resizeObs.disconnect()
    this.renderer.dispose()
    const el = this.renderer.domElement
    if (el.parentNode) el.parentNode.removeChild(el)
  }
}
