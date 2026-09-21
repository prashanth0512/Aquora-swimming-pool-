

(function () {
  'use strict';

  
  function initWhenReady() {
    if (typeof THREE === 'undefined') {
      setTimeout(initWhenReady, 50);
      return;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHeroPool3D);
    } else {
      initHeroPool3D();
    }
  }

  initWhenReady();

  function initHeroPool3D() {
    const canvas = document.getElementById('pool-3d-canvas');
    const container = document.getElementById('pool-canvas-stage');
    const fallbackEl = document.getElementById('pool-3d-fallback');

    if (!canvas || !container) return;

    
    function isWebGLAvailable() {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    if (!isWebGLAvailable()) {
      if (fallbackEl) fallbackEl.style.display = 'block';
      if (canvas) canvas.style.display = 'none';
      return;
    }

    
    
    
    const scene = new THREE.Scene();

    const initialWidth = container.clientWidth || 560;
    const initialHeight = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(38, initialWidth / initialHeight, 0.1, 120);
    
    
    const defaultRadius = 22.5;
    const defaultPhi = 1.02; 
    const defaultTheta = 0.85; 

    let targetRadius = defaultRadius;
    let targetPhi = defaultPhi;
    let targetTheta = defaultTheta;

    let currentRadius = defaultRadius;
    let currentPhi = defaultPhi;
    let currentTheta = defaultTheta;

    const lookTarget = new THREE.Vector3(0, -0.3, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      if (fallbackEl) fallbackEl.style.display = 'block';
      return;
    }

    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    
    
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x00e5ff, 0x07111e, 0.4);
    hemiLight.position.set(0, 30, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 1.4);
    sunLight.position.set(16, 26, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    
    const poolLed1 = new THREE.PointLight(0x00e5ff, 0, 14, 2);
    poolLed1.position.set(-3.5, -1.0, 0);
    scene.add(poolLed1);

    const poolLed2 = new THREE.PointLight(0x00e5ff, 0, 14, 2);
    poolLed2.position.set(1.5, -1.0, 0);
    scene.add(poolLed2);

    const spaLed = new THREE.PointLight(0x00b4d8, 0, 8, 2);
    spaLed.position.set(5.5, 0.0, -3.2);
    scene.add(spaLed);

    
    const villaWashLight = new THREE.DirectionalLight(0xffecd2, 0);
    villaWashLight.position.set(0, 12, -8);
    scene.add(villaWashLight);

    
    
    
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    
    const phase1Group = new THREE.Group(); 
    const phase2Group = new THREE.Group(); 
    const phase3Group = new THREE.Group(); 
    const phase4Group = new THREE.Group(); 
    rootGroup.add(phase1Group, phase2Group, phase3Group, phase4Group);

    
    
    
    const gridHelper = new THREE.GridHelper(28, 28, 0x00e5ff, 0x1e293b);
    gridHelper.position.y = -1.9;
    phase1Group.add(gridHelper);

    
    function createWireframeEdges(geometry, color = 0x00e5ff, opacity = 0.95) {
      const edges = new THREE.EdgesGeometry(geometry, 25);
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        linewidth: 1.5
      });
      return new THREE.LineSegments(edges, material);
    }

    
    function createDimensionMarker(start, end, textLabel, axis = 'x') {
      const group = new THREE.Group();
      const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0x00e5ff,
        dashSize: 0.35,
        gapSize: 0.15,
        transparent: true,
        opacity: 0.85
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      group.add(line);

      
      const tickMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
      const t1 = 0.3;
      const tick1Geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(start.x - (axis === 'z' ? t1 : 0), start.y, start.z - (axis === 'x' ? t1 : 0)),
        new THREE.Vector3(start.x + (axis === 'z' ? t1 : 0), start.y, start.z + (axis === 'x' ? t1 : 0))
      ]);
      const tick2Geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(end.x - (axis === 'z' ? t1 : 0), end.y, end.z - (axis === 'x' ? t1 : 0)),
        new THREE.Vector3(end.x + (axis === 'z' ? t1 : 0), end.y, end.z + (axis === 'x' ? t1 : 0))
      ]);
      group.add(new THREE.Line(tick1Geo, tickMat), new THREE.Line(tick2Geo, tickMat));

      return group;
    }

    
    const dimLength = createDimensionMarker(new THREE.Vector3(-7.2, 0.4, 4.8), new THREE.Vector3(7.2, 0.4, 4.8), '14.40m LENGTH', 'x');
    const dimWidth = createDimensionMarker(new THREE.Vector3(7.8, 0.4, -3.2), new THREE.Vector3(7.8, 0.4, 3.2), '6.40m WIDTH', 'z');
    const dimDepth = createDimensionMarker(new THREE.Vector3(-7.8, 0.0, 0), new THREE.Vector3(-7.8, -1.8, 0), '1.80m DEPTH', 'y');
    phase1Group.add(dimLength, dimWidth, dimDepth);

    
    
    
    
    const basinLength = 14.0;
    const basinWidth = 6.0;
    const basinDepth = 1.8;
    const wallThick = 0.35;

    
    
    const floorGeo = new THREE.BoxGeometry(basinLength, 0.25, basinWidth);
    
    const wallLongGeo = new THREE.BoxGeometry(basinLength + wallThick * 2, basinDepth, wallThick);
    
    const wallShortGeo = new THREE.BoxGeometry(wallThick, basinDepth, basinWidth);

    
    const p1FloorWire = createWireframeEdges(floorGeo);
    p1FloorWire.position.set(0, -basinDepth, 0);
    const p1WallNWire = createWireframeEdges(wallLongGeo);
    p1WallNWire.position.set(0, -basinDepth / 2, -(basinWidth / 2 + wallThick / 2));
    const p1WallSWire = createWireframeEdges(wallLongGeo);
    p1WallSWire.position.set(0, -basinDepth / 2, (basinWidth / 2 + wallThick / 2));
    const p1WallEWire = createWireframeEdges(wallShortGeo);
    p1WallEWire.position.set((basinLength / 2 + wallThick / 2), -basinDepth / 2, 0);
    const p1WallWWire = createWireframeEdges(wallShortGeo);
    p1WallWWire.position.set(-(basinLength / 2 + wallThick / 2), -basinDepth / 2, 0);

    
    const bajaGeo = new THREE.BoxGeometry(3.6, 1.4, basinWidth - 0.1);
    const p1BajaWire = createWireframeEdges(bajaGeo);
    p1BajaWire.position.set(-basinLength / 2 + 1.8, -basinDepth + 0.7, 0);

    
    const step1Geo = new THREE.BoxGeometry(1.2, 0.3, 2.4);
    const p1Step1Wire = createWireframeEdges(step1Geo);
    p1Step1Wire.position.set(-basinLength / 2 + 4.2, -0.6, 1.5);
    const p1Step2Wire = createWireframeEdges(step1Geo);
    p1Step2Wire.position.set(-basinLength / 2 + 4.2, -1.0, 1.5);
    const p1Step3Wire = createWireframeEdges(step1Geo);
    p1Step3Wire.position.set(-basinLength / 2 + 4.2, -1.4, 1.5);

    
    const spaGeo = new THREE.BoxGeometry(3.2, 1.6, 3.2);
    const p1SpaWire = createWireframeEdges(spaGeo);
    p1SpaWire.position.set(5.2, -0.6, -4.6);

    phase1Group.add(
      p1FloorWire, p1WallNWire, p1WallSWire, p1WallEWire, p1WallWWire,
      p1BajaWire, p1Step1Wire, p1Step2Wire, p1Step3Wire, p1SpaWire
    );

    
    const holoMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.08,
      wireframe: false
    });
    const p1HoloFloor = new THREE.Mesh(floorGeo, holoMat);
    p1HoloFloor.position.copy(p1FloorWire.position);
    const p1HoloBaja = new THREE.Mesh(bajaGeo, holoMat);
    p1HoloBaja.position.copy(p1BajaWire.position);
    phase1Group.add(p1HoloFloor, p1HoloBaja);

    
    
    
    
    const guniteMat = new THREE.MeshStandardMaterial({
      color: 0x2e3846,
      roughness: 0.92,
      metalness: 0.08,
      transparent: true,
      opacity: 0.0
    });

    const p2Floor = new THREE.Mesh(floorGeo, guniteMat);
    p2Floor.position.copy(p1FloorWire.position);
    p2Floor.receiveShadow = true;

    const p2WallN = new THREE.Mesh(wallLongGeo, guniteMat);
    p2WallN.position.copy(p1WallNWire.position);
    p2WallN.castShadow = true;
    p2WallN.receiveShadow = true;

    const p2WallS = new THREE.Mesh(wallLongGeo, guniteMat);
    p2WallS.position.copy(p1WallSWire.position);
    p2WallS.castShadow = true;
    p2WallS.receiveShadow = true;

    const p2WallE = new THREE.Mesh(wallShortGeo, guniteMat);
    p2WallE.position.copy(p1WallEWire.position);
    p2WallE.castShadow = true;
    p2WallE.receiveShadow = true;

    const p2WallW = new THREE.Mesh(wallShortGeo, guniteMat);
    p2WallW.position.copy(p1WallWWire.position);
    p2WallW.castShadow = true;
    p2WallW.receiveShadow = true;

    const p2Baja = new THREE.Mesh(bajaGeo, guniteMat);
    p2Baja.position.copy(p1BajaWire.position);
    p2Baja.receiveShadow = true;

    const p2Step1 = new THREE.Mesh(step1Geo, guniteMat);
    p2Step1.position.copy(p1Step1Wire.position);
    const p2Step2 = new THREE.Mesh(step1Geo, guniteMat);
    p2Step2.position.copy(p1Step2Wire.position);
    const p2Step3 = new THREE.Mesh(step1Geo, guniteMat);
    p2Step3.position.copy(p1Step3Wire.position);

    const p2Spa = new THREE.Mesh(spaGeo, guniteMat);
    p2Spa.position.copy(p1SpaWire.position);
    p2Spa.castShadow = true;

    
    const rebarMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.0,
      linewidth: 1
    });

    
    const rebarPoints = [];
    for (let x = -basinLength / 2; x <= basinLength / 2; x += 0.8) {
      rebarPoints.push(new THREE.Vector3(x, 0.05, -basinWidth / 2));
      rebarPoints.push(new THREE.Vector3(x, -basinDepth + 0.05, -basinWidth / 2));
      rebarPoints.push(new THREE.Vector3(x, -basinDepth + 0.05, basinWidth / 2));
      rebarPoints.push(new THREE.Vector3(x, 0.05, basinWidth / 2));
    }
    for (let z = -basinWidth / 2; z <= basinWidth / 2; z += 0.8) {
      rebarPoints.push(new THREE.Vector3(-basinLength / 2, 0.05, z));
      rebarPoints.push(new THREE.Vector3(-basinLength / 2, -basinDepth + 0.05, z));
      rebarPoints.push(new THREE.Vector3(basinLength / 2, -basinDepth + 0.05, z));
      rebarPoints.push(new THREE.Vector3(basinLength / 2, 0.05, z));
    }
    const rebarGeo = new THREE.BufferGeometry().setFromPoints(rebarPoints);
    const rebarMesh = new THREE.LineSegments(rebarGeo, rebarMat);

    
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      roughness: 0.4,
      metalness: 0.3,
      transparent: true,
      opacity: 0.0
    });
    const pipe1Geo = new THREE.CylinderGeometry(0.08, 0.08, 14.5, 12);
    const pipe1 = new THREE.Mesh(pipe1Geo, pipeMat);
    pipe1.rotation.z = Math.PI / 2;
    pipe1.position.set(0, -basinDepth - 0.25, 3.4);

    const pipe2Geo = new THREE.CylinderGeometry(0.08, 0.08, 14.5, 12);
    const pipe2 = new THREE.Mesh(pipe2Geo, pipeMat);
    pipe2.rotation.z = Math.PI / 2;
    pipe2.position.set(0, -basinDepth - 0.4, -3.4);

    phase2Group.add(
      p2Floor, p2WallN, p2WallS, p2WallE, p2WallW,
      p2Baja, p2Step1, p2Step2, p2Step3, p2Spa,
      rebarMesh, pipe1, pipe2
    );

    
    
    
    
    const travertineMat = new THREE.MeshStandardMaterial({
      color: 0xe8e0d5,
      roughness: 0.65,
      metalness: 0.05,
      transparent: true,
      opacity: 0.0
    });

    
    
    const deckNGeo = new THREE.BoxGeometry(22, 0.25, 5.0);
    const deckN = new THREE.Mesh(deckNGeo, travertineMat);
    deckN.position.set(0, -0.125, -6.0);
    deckN.receiveShadow = true;

    
    const deckSGeo = new THREE.BoxGeometry(22, 0.25, 6.0);
    const deckS = new THREE.Mesh(deckSGeo, travertineMat);
    deckS.position.set(0, -0.125, 6.5);
    deckS.receiveShadow = true;

    
    const deckWGeo = new THREE.BoxGeometry(4.0, 0.25, basinWidth + 1.0);
    const deckW = new THREE.Mesh(deckWGeo, travertineMat);
    deckW.position.set(-9.2, -0.125, 0);
    deckW.receiveShadow = true;

    
    const deckEGeo = new THREE.BoxGeometry(4.0, 0.25, basinWidth + 1.0);
    const deckE = new THREE.Mesh(deckEGeo, travertineMat);
    deckE.position.set(9.2, -0.125, 0);
    deckE.receiveShadow = true;

    
    const mosaicMat = new THREE.MeshStandardMaterial({
      color: 0x00a8cc,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.0
    });
    const mosaicN = new THREE.Mesh(new THREE.BoxGeometry(basinLength, 0.35, 0.05), mosaicMat);
    mosaicN.position.set(0, -0.18, -basinWidth / 2 + 0.03);
    const mosaicS = new THREE.Mesh(new THREE.BoxGeometry(basinLength, 0.35, 0.05), mosaicMat);
    mosaicS.position.set(0, -0.18, basinWidth / 2 - 0.03);
    const mosaicW = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, basinWidth), mosaicMat);
    mosaicW.position.set(-basinLength / 2 + 0.03, -0.18, 0);
    const mosaicE = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, basinWidth), mosaicMat);
    mosaicE.position.set(basinLength / 2 - 0.03, -0.18, 0);

    
    const slotMat = new THREE.MeshBasicMaterial({ color: 0x0a101a, transparent: true, opacity: 0.0 });
    const slotN = new THREE.Mesh(new THREE.BoxGeometry(basinLength + 0.6, 0.05, 0.08), slotMat);
    slotN.position.set(0, 0.01, -basinWidth / 2 - 0.05);
    const slotS = new THREE.Mesh(new THREE.BoxGeometry(basinLength + 0.6, 0.05, 0.08), slotMat);
    slotS.position.set(0, 0.01, basinWidth / 2 + 0.05);

    
    const plasterMat = new THREE.MeshStandardMaterial({
      color: 0x0a3d62,
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.0
    });
    const finishFloor = new THREE.Mesh(floorGeo, plasterMat);
    finishFloor.position.copy(p1FloorWire.position);
    finishFloor.receiveShadow = true;

    
    const acrylicMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      transmission: 0.88,
      opacity: 0.0,
      transparent: true,
      roughness: 0.05,
      ior: 1.49,
      reflectivity: 0.8
    });
    const acrylicView = new THREE.Mesh(new THREE.BoxGeometry(6.0, 1.2, 0.12), acrylicMat);
    acrylicView.position.set(0, -0.6, basinWidth / 2 + wallThick / 2);

    
    const villaMat = new THREE.MeshStandardMaterial({
      color: 0x182230,
      roughness: 0.7,
      metalness: 0.1,
      transparent: true,
      opacity: 0.0
    });
    const villaWall = new THREE.Mesh(new THREE.BoxGeometry(22, 6.5, 0.8), villaMat);
    villaWall.position.set(0, 3.12, -8.6);
    villaWall.castShadow = true;
    villaWall.receiveShadow = true;

    
    const pergolaMat = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.6,
      transparent: true,
      opacity: 0.0
    });
    const pergolaGroup = new THREE.Group();
    for (let x = -9; x <= 9; x += 1.8) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.35, 4.2), pergolaMat);
      slat.position.set(x, 5.8, -6.6);
      slat.castShadow = true;
      pergolaGroup.add(slat);
    }

    
    const loungerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      transparent: true,
      opacity: 0.0
    });
    const loungerFrameMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      transparent: true,
      opacity: 0.0
    });
    const loungersGroup = new THREE.Group();
    [-4.5, -1.8, 1.8, 4.5].forEach(lx => {
      const lounger = new THREE.Group();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.15, 3.2), loungerFrameMat);
      frame.position.y = 0.12;
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.12, 3.0), loungerMat);
      cushion.position.y = 0.22;
      lounger.add(frame, cushion);
      lounger.position.set(lx, 0.0, 6.2);
      loungersGroup.add(lounger);
    });

    
    const planterMat = new THREE.MeshStandardMaterial({
      color: 0x2b3442,
      roughness: 0.8,
      transparent: true,
      opacity: 0.0
    });
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.9,
      transparent: true,
      opacity: 0.0
    });
    const planter1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.8, 0.8), planterMat);
    planter1.position.set(-6.5, 0.4, -7.8);
    const plant1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 0.6), foliageMat);
    plant1.position.set(-6.5, 1.2, -7.8);

    const planter2 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.8, 0.8), planterMat);
    planter2.position.set(6.5, 0.4, -7.8);
    const plant2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 0.6), foliageMat);
    plant2.position.set(6.5, 1.2, -7.8);

    phase3Group.add(
      deckN, deckS, deckW, deckE,
      mosaicN, mosaicS, mosaicW, mosaicE,
      slotN, slotS, finishFloor, acrylicView,
      villaWall, pergolaGroup, loungersGroup,
      planter1, plant1, planter2, plant2
    );

    
    
    
    
    const waterWidth = basinLength - 0.08;
    const waterDepth = basinWidth - 0.08;
    const waterSegmentsX = 48;
    const waterSegmentsZ = 28;
    const waterGeo = new THREE.PlaneGeometry(waterWidth, waterDepth, waterSegmentsX, waterSegmentsZ);
    waterGeo.rotateX(-Math.PI / 2);

    
    const posAttribute = waterGeo.attributes.position;
    const originalPositions = new Float32Array(posAttribute.array);

    
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x00c4d8,
      emissive: 0x003d52,
      emissiveIntensity: 0.25,
      roughness: 0.04,
      metalness: 0.1,
      transmission: 0.82,
      ior: 1.333,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(0, -0.06, 0);
    waterMesh.receiveShadow = true;

    
    const spaWaterGeo = new THREE.PlaneGeometry(2.9, 2.9, 16, 16);
    spaWaterGeo.rotateX(-Math.PI / 2);
    const spaWaterMesh = new THREE.Mesh(spaWaterGeo, waterMat);
    spaWaterMesh.position.set(5.2, 0.12, -4.6);

    
    const causticsMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    const causticsPlane = new THREE.Mesh(new THREE.PlaneGeometry(basinLength - 0.4, basinWidth - 0.4), causticsMat);
    causticsPlane.rotateX(-Math.PI / 2);
    causticsPlane.position.set(0, -basinDepth + 0.14, 0);

    phase4Group.add(waterMesh, spaWaterMesh, causticsPlane);

    
    const phase2Materials = [guniteMat, rebarMat, pipeMat];
    const phase3Materials = [
      travertineMat, mosaicMat, slotMat, plasterMat, acrylicMat,
      villaMat, pergolaMat, loungerMat, loungerFrameMat, planterMat, foliageMat
    ];
    const phase4Materials = [waterMat, causticsMat];

    
    
    
    function updateThemeColors() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      if (isLight) {
        gridHelper.material.color.setHex(0x0066ff);
        ambientLight.color.setHex(0xffffff);
        ambientLight.intensity = 0.75;
        hemiLight.color.setHex(0x80d8ff);
        hemiLight.groundColor.setHex(0xf1f5f9);
        sunLight.intensity = 1.6;
        villaMat.color.setHex(0xf1f5f9);
        deckN.material.color.setHex(0xf5ede4);
        dimLength.children[0].material.color.setHex(0x0066ff);
        dimWidth.children[0].material.color.setHex(0x0066ff);
        dimDepth.children[0].material.color.setHex(0x0066ff);
      } else {
        gridHelper.material.color.setHex(0x00e5ff);
        ambientLight.color.setHex(0xffffff);
        ambientLight.intensity = 0.45;
        hemiLight.color.setHex(0x00e5ff);
        hemiLight.groundColor.setHex(0x07111e);
        sunLight.intensity = 1.35;
        villaMat.color.setHex(0x182230);
        deckN.material.color.setHex(0xe8e0d5);
        dimLength.children[0].material.color.setHex(0x00e5ff);
        dimWidth.children[0].material.color.setHex(0x00e5ff);
        dimDepth.children[0].material.color.setHex(0x00e5ff);
      }
    }

    updateThemeColors();

    const themeObserver = new MutationObserver(() => updateThemeColors());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    
    
    
    
    const STAGE_COUNT = 4;
    const STAGE_NAMES = [
      { id: '01', code: 'IDEA', title: 'ARCHITECTURAL BLUEPRINT', sub: 'Sub-millimeter LIDAR survey & CAD geometry. Every master pool begins with an idea.' },
      { id: '02', code: 'ENGINEERING', title: 'MONOLITHIC ENGINEERING', sub: '4,500 PSI pneumatically placed monolithic gunite shell with Grade 60 tensile steel cage.' },
      { id: '03', code: 'CRAFTSMANSHIP', title: 'CURATED MATERIALS & LIVING', sub: 'Navona travertine limestone coping, Italian Bisazza mosaic waterline tile, and villa architecture.' },
      { id: '04', code: 'REALITY', title: 'PHOTOREALISTIC RESORT REALITY', sub: 'Crystalline water caustics, automated hydraulic filtration, and underwater optical LED illumination.' }
    ];

    let currentPhaseFloat = 0.0;
    let targetPhaseFloat = 0.0;
    let isAutoAdvancing = true;
    let autoOrbitActive = true;
    let lastTime = performance.now();
    let stageCycleTimer = 0;
    const totalAnimationDuration = 5.5; 
    const stageDurationSeconds = totalAnimationDuration / STAGE_COUNT; 

    
    const hudStageNum = document.getElementById('hud-stage-num');
    const hudStageTitle = document.getElementById('hud-stage-title');
    const hudStageSub = document.getElementById('hud-stage-sub');
    const hudProgressFill = document.getElementById('hud-progress-fill');
    const stagePills = document.querySelectorAll('.stage-pill-btn');
    const orbitToggleBtn = document.getElementById('orbit-toggle-btn');
    const resetViewBtn = document.getElementById('reset-view-btn');

    function updateHud(phaseIndex, progressWithinPhase) {
      const safeIndex = Math.min(Math.floor(phaseIndex), STAGE_COUNT - 1);
      const stageData = STAGE_NAMES[safeIndex];

      if (hudStageNum) hudStageNum.textContent = `PHASE 0${safeIndex + 1} // ${stageData.code}`;
      if (hudStageTitle) hudStageTitle.textContent = stageData.title;
      if (hudStageSub) hudStageSub.textContent = stageData.sub;

      if (hudProgressFill) {
        const totalProgress = ((phaseIndex % STAGE_COUNT) / STAGE_COUNT) * 100;
        hudProgressFill.style.width = `${totalProgress}%`;
      }

      stagePills.forEach((pill, idx) => {
        if (idx === safeIndex) {
          pill.classList.add('active');
          pill.setAttribute('aria-pressed', 'true');
        } else {
          pill.classList.remove('active');
          pill.setAttribute('aria-pressed', 'false');
        }
      });
    }

    
    window.setHeroPoolStage = function (stageIndex) {
      targetPhaseFloat = stageIndex;
      isAutoAdvancing = false;
      stageCycleTimer = stageIndex * stageDurationSeconds;
      updateHud(stageIndex, 0);

      
      clearTimeout(window._autoAdvanceTimeout);
      window._autoAdvanceTimeout = setTimeout(() => {
        isAutoAdvancing = true;
      }, 6000);
    };

    stagePills.forEach((pill, index) => {
      pill.addEventListener('click', () => {
        window.setHeroPoolStage(index);
      });
    });

    if (resetViewBtn) {
      resetViewBtn.addEventListener('click', () => {
        targetRadius = defaultRadius;
        targetPhi = defaultPhi;
        targetTheta = defaultTheta;
        autoOrbitActive = true;
        if (orbitToggleBtn) orbitToggleBtn.classList.add('active');
      });
    }

    if (orbitToggleBtn) {
      orbitToggleBtn.addEventListener('click', () => {
        autoOrbitActive = !autoOrbitActive;
        orbitToggleBtn.classList.toggle('active', autoOrbitActive);
        orbitToggleBtn.setAttribute('aria-pressed', autoOrbitActive ? 'true' : 'false');
      });
    }

    
    
    
    function applyPhaseTransitions(p) {
      
      const pMod = p % 4;

      
      function weight(center) {
        const dist = Math.abs(pMod - center);
        const wrappedDist = Math.min(dist, 4 - dist);
        return Math.max(0, 1 - wrappedDist * 1.15);
      }

      const w1 = weight(0.0); 
      const w2 = weight(1.0); 
      const w3 = weight(2.0); 
      const w4 = weight(3.0); 

      
      gridHelper.material.opacity = THREE.MathUtils.lerp(0.08, 0.85, w1);
      dimLength.visible = w1 > 0.05;
      dimWidth.visible = w1 > 0.05;
      dimDepth.visible = w1 > 0.05;
      p1FloorWire.material.opacity = w1 * 0.95;
      p1WallNWire.material.opacity = w1 * 0.95;
      p1HoloFloor.material.opacity = w1 * 0.08;

      
      const guniteVis = Math.max(w2, w3 * 0.2);
      guniteMat.opacity = THREE.MathUtils.clamp(guniteVis, 0, 1);
      rebarMat.opacity = THREE.MathUtils.clamp(w2 * 0.85, 0, 0.85);
      pipeMat.opacity = THREE.MathUtils.clamp(w2 * 0.9, 0, 0.9);

      
      const matVis = THREE.MathUtils.clamp(w3 + w4, 0, 1);
      travertineMat.opacity = matVis;
      mosaicMat.opacity = matVis;
      slotMat.opacity = matVis;
      plasterMat.opacity = matVis;
      acrylicMat.opacity = matVis * 0.88;
      villaMat.opacity = matVis;
      pergolaMat.opacity = matVis;
      loungerMat.opacity = matVis;
      loungerFrameMat.opacity = matVis;
      planterMat.opacity = matVis;
      foliageMat.opacity = matVis;

      
      const waterVis = THREE.MathUtils.clamp(w4 * 1.3, 0, 1);
      waterMat.opacity = waterVis * 0.88;
      causticsMat.opacity = waterVis * 0.45;

      
      const ledPower = THREE.MathUtils.lerp(0.0, 3.2, w4);
      poolLed1.intensity = ledPower;
      poolLed2.intensity = ledPower;
      spaLed.intensity = ledPower * 0.8;
      villaWashLight.intensity = THREE.MathUtils.lerp(0.0, 0.65, w4);
    }

    
    
    
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let resumeOrbitTimer = null;

    function onPointerDown(e) {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      clearTimeout(resumeOrbitTimer);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = x - prevMouseX;
      const deltaY = y - prevMouseY;
      prevMouseX = x;
      prevMouseY = y;

      targetTheta -= deltaX * 0.007;
      targetPhi -= deltaY * 0.007;

      
      targetPhi = THREE.MathUtils.clamp(targetPhi, 0.35, 1.45);
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      
      clearTimeout(resumeOrbitTimer);
      resumeOrbitTimer = setTimeout(() => {
        if (orbitToggleBtn && orbitToggleBtn.classList.contains('active')) {
          autoOrbitActive = true;
        }
      }, 4000);
    }

    function onWheel(e) {
      e.preventDefault();
      targetRadius += e.deltaY * 0.015;
      targetRadius = THREE.MathUtils.clamp(targetRadius, 14.0, 30.0);
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    container.addEventListener('wheel', onWheel, { passive: false });

    
    
    
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    intersectionObserver.observe(container);

    
    let waveTime = 0;

    function animate(now) {
      requestAnimationFrame(animate);

      if (!isVisible) return; 

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      
      if (isAutoAdvancing) {
        stageCycleTimer += dt;
        currentPhaseFloat = (stageCycleTimer / stageDurationSeconds) % STAGE_COUNT;
        targetPhaseFloat = currentPhaseFloat;
      } else {
        
        currentPhaseFloat = THREE.MathUtils.lerp(currentPhaseFloat, targetPhaseFloat, 0.16);
      }

      applyPhaseTransitions(currentPhaseFloat);
      updateHud(currentPhaseFloat, 0);

      
      if (autoOrbitActive && !isDragging) {
        targetTheta += dt * (Math.PI * 2 / totalAnimationDuration);
      }

      currentRadius = THREE.MathUtils.lerp(currentRadius, targetRadius, 0.12);
      currentPhi = THREE.MathUtils.lerp(currentPhi, targetPhi, 0.12);
      currentTheta = THREE.MathUtils.lerp(currentTheta, targetTheta, 0.14);

      
      camera.position.x = currentRadius * Math.sin(currentPhi) * Math.sin(currentTheta);
      camera.position.y = currentRadius * Math.cos(currentPhi);
      camera.position.z = currentRadius * Math.sin(currentPhi) * Math.cos(currentTheta);
      camera.lookAt(lookTarget);

      
      if (waterMat.opacity > 0.05) {
        waveTime += dt * 3.2;
        const positions = waterGeo.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const u = originalPositions[i];
          const v = originalPositions[i + 2];
          
          const wave1 = Math.sin(u * 1.2 + waveTime * 1.4) * 0.025;
          const wave2 = Math.cos(v * 1.6 + waveTime * 1.1) * 0.02;
          const wave3 = Math.sin((u + v) * 0.8 + waveTime * 0.9) * 0.015;
          positions[i + 1] = wave1 + wave2 + wave3;
        }
        waterGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);

    
    
    
    function handleResize() {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      autoOrbitActive = false;
      if (orbitToggleBtn) orbitToggleBtn.classList.remove('active');
    }
  }
})();
