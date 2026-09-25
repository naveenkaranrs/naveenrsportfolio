/**
 * Three.js Multi-Section Gyroscopic Background
 * Renders a vertically scrolling 3D space with unique ECE environments
 * for each section of the portfolio.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded.');
        return;
    }

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.0012); // Smooth fade into the dark background
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
    // Base camera starts at Z=450 looking at the Z=0 plane.
    camera.position.set(0, 0, 450);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Global group to hold all environments so we can tilt the entire world at once
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Invisible plane covering the entire vertical scrolling area for mouse raycasting
    const planeGeo = new THREE.PlaneGeometry(10000, 20000);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false });
    const intersectionPlane = new THREE.Mesh(planeGeo, planeMat);
    intersectionPlane.position.y = -2500; // Center the plane vertically
    worldGroup.add(intersectionPlane);

    // --- Shared Flashlight Shader ---
    const sharedShader = new THREE.ShaderMaterial({
        uniforms: {
            u_mouse: { value: new THREE.Vector3(0, 0, 0) },
            u_radius: { value: window.innerWidth < 768 ? 200.0 : 400.0 },
            u_color_base: { value: new THREE.Color('#0a1515') }, // Very dark teal
            u_color_highlight: { value: new THREE.Color('#00ff66') } // PCB Green
        },
        vertexShader: `
            uniform vec3 u_mouse;
            varying float v_dist;
            
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                v_dist = distance(worldPosition.xyz, u_mouse.xyz);
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
                gl_PointSize = 3.0;
            }
        `,
        fragmentShader: `
            uniform vec3 u_color_base;
            uniform vec3 u_color_highlight;
            uniform float u_radius;
            varying float v_dist;
            
            void main() {
                // Highlight intensity based on distance to mouse
                float highlight = 1.0 - smoothstep(0.0, u_radius, v_dist);
                
                float baseAlpha = 0.08; 
                float finalAlpha = baseAlpha + (highlight * 0.8);
                
                vec3 finalColor = mix(u_color_base, u_color_highlight, pow(highlight, 1.5));
                
                gl_FragColor = vec4(finalColor, finalAlpha);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    // --- Environment Builder Functions ---
    const sectionSpacing = 1200; // Distance between each 3D environment

    // 0. Hero: Ultra-Premium Schematic
    function createSchematic() {
        const group = new THREE.Group();
        group.position.y = 0;
        
        const extents = 1500;
        const spacing = 20;
        const pts = [];
        const nodePts = [];

        for (let x = -extents; x <= extents; x += spacing) {
            for (let y = -extents; y <= extents; y += spacing) {
                if (Math.random() > 0.7 && x < extents) { pts.push(x, y, 0); pts.push(x + spacing, y, 0); }
                if (Math.random() > 0.7 && y < extents) { pts.push(x, y, 0); pts.push(x, y + spacing, 0); }
                if (Math.random() > 0.96) nodePts.push(x, y, 0);
            }
        }
        
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.LineSegments(lineGeo, sharedShader));
        
        const nodeGeo = new THREE.BufferGeometry();
        nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePts, 3));
        group.add(new THREE.Points(nodeGeo, sharedShader));
        
        return group;
    }

    // 1. About: Silicon Wafer Topology (Concentric Rings)
    function createWafer() {
        const group = new THREE.Group();
        group.position.y = -sectionSpacing * 1;
        
        const rings = 25;
        const pts = [];
        
        for (let i = 1; i <= rings; i++) {
            const radius = i * 40;
            // Draw broken circles
            for (let a = 0; a < Math.PI * 2; a += 0.05) {
                if (Math.random() > 0.15) { // 15% gaps in the rings
                    pts.push(Math.cos(a) * radius, Math.sin(a) * radius, (Math.random()-0.5)*10);
                }
            }
        }
        
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.Points(geo, sharedShader));
        
        return group;
    }

    // 2. Expertise: Logic Gate Network
    function createLogicNetwork() {
        const group = new THREE.Group();
        group.position.y = -sectionSpacing * 2;
        
        const nodeCount = 300;
        const nodes = [];
        const pts = [];
        const linePts = [];
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: (Math.random() - 0.5) * 2000,
                y: (Math.random() - 0.5) * 1000,
                z: (Math.random() - 0.5) * 200
            });
            pts.push(nodes[i].x, nodes[i].y, nodes[i].z);
        }
        
        // Connect nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                if (Math.sqrt(dx*dx + dy*dy + dz*dz) < 180) {
                    if (Math.random() > 0.3) {
                        linePts.push(nodes[i].x, nodes[i].y, nodes[i].z);
                        linePts.push(nodes[j].x, nodes[j].y, nodes[j].z);
                    }
                }
            }
        }
        
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
        group.add(new THREE.LineSegments(lineGeo, sharedShader));
        
        const nodeGeo = new THREE.BufferGeometry();
        nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.Points(nodeGeo, sharedShader));
        
        return group;
    }

    // 3. Portfolio: Fast Data Bus Highway
    function createDataBus() {
        const group = new THREE.Group();
        group.position.y = -sectionSpacing * 3;
        
        const busLines = 40;
        const pts = [];
        
        for (let i = 0; i < busLines; i++) {
            const yOffset = (i - busLines/2) * 25;
            const zOffset = (Math.random() - 0.5) * 50;
            for (let x = -1500; x < 1500; x += 30) {
                if (Math.random() > 0.2) { // dashed effect
                    pts.push(x, yOffset, zOffset);
                    pts.push(x + 20, yOffset, zOffset);
                }
            }
        }
        
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.LineSegments(geo, sharedShader));
        
        return group;
    }

    // 4. Career: Oscilloscope Waveform (Animated in render loop)
    const waveGeo = new THREE.BufferGeometry();
    const wavePointsCount = 800;
    const wavePositions = new Float32Array(wavePointsCount * 3);
    
    function createOscilloscope() {
        const group = new THREE.Group();
        group.position.y = -sectionSpacing * 4;
        
        for (let i = 0; i < wavePointsCount; i++) {
            wavePositions[i*3] = (i - wavePointsCount/2) * 4; // X
            wavePositions[i*3+1] = 0; // Y
            wavePositions[i*3+2] = 0; // Z
        }
        
        waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
        // Need a thicker line or points for visibility
        group.add(new THREE.Points(waveGeo, sharedShader));
        
        // Add a grid behind it
        const gridPts = [];
        for(let x = -1500; x <= 1500; x += 100) { gridPts.push(x, -500, -50, x, 500, -50); }
        for(let y = -500; y <= 500; y += 100) { gridPts.push(-1500, y, -50, 1500, y, -50); }
        const gridGeo = new THREE.BufferGeometry();
        gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridPts, 3));
        group.add(new THREE.LineSegments(gridGeo, sharedShader));
        
        return group;
    }

    // 5. Contact: Magnetic Particles
    function createMagneticField() {
        const group = new THREE.Group();
        group.position.y = -sectionSpacing * 5;
        
        const count = 3000;
        const pts = [];
        for (let i = 0; i < count; i++) {
            pts.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 400
            );
        }
        
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.Points(geo, sharedShader));
        
        return group;
    }

    // Add all environments to the world
    worldGroup.add(createSchematic());
    worldGroup.add(createWafer());
    worldGroup.add(createLogicNetwork());
    worldGroup.add(createDataBus());
    worldGroup.add(createOscilloscope());
    worldGroup.add(createMagneticField());


    // --- Interaction & Scroll Tracking ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(0, 0); 
    let targetCameraY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Update target camera Y based on scroll percentage
    function updateScroll() {
        // Total scrollable distance
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        
        const scrollPercent = window.scrollY / maxScroll;
        
        // Map scroll percentage to the physical vertical distance of the 3D world
        // There are 6 sections (0 to 5), so max distance is sectionSpacing * 5
        const maxWorldY = -(sectionSpacing * 5);
        targetCameraY = scrollPercent * maxWorldY;
    }

    window.addEventListener('scroll', updateScroll);
    updateScroll(); // Initialize

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // 1. Smooth Camera Scrolling (Travel through the environments)
        camera.position.y += (targetCameraY - camera.position.y) * 0.05;

        // 2. Gyroscopic World Tilt
        const targetRotX = mouse.y * 0.15; 
        const targetRotY = mouse.x * 0.15;
        worldGroup.rotation.x += (targetRotX - worldGroup.rotation.x) * 0.05;
        worldGroup.rotation.y += (targetRotY - worldGroup.rotation.y) * 0.05;

        // 3. Flashlight Raycast
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(intersectionPlane);
        
        if (intersects.length > 0) {
            sharedShader.uniforms.u_mouse.value.copy(intersects[0].point);
        }

        // 4. Animate Oscilloscope Waveform (Career Section)
        // Only update if camera is near section 4 (Y = -4800) to save CPU
        if (Math.abs(camera.position.y - (-sectionSpacing * 4)) < 1500) {
            const waveArray = waveGeo.attributes.position.array;
            for (let i = 0; i < wavePointsCount; i++) {
                const x = waveArray[i*3];
                // Complex waveform mixing multiple sines
                const y = Math.sin(x * 0.02 + elapsedTime * 5) * 80 + 
                          Math.sin(x * 0.05 - elapsedTime * 3) * 40;
                waveArray[i*3+1] = y;
            }
            waveGeo.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
    }

    animate();

    // --- Resize ---
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        
        sharedShader.uniforms.u_radius.value = window.innerWidth < 768 ? 200.0 : 400.0;
        updateScroll();
    });
});
