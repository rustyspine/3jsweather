let scene, camera, renderer;
let rain, rainBuffer;
const rainCount = 10000;



function init() {
    // Create scene
    scene = new THREE.Scene();

    // Set up camera
    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;

    // Black background (removed the background plane for simplicity)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000); // Black background
    document.body.appendChild(renderer.domElement);

    // Ambient light (optional)
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Create rain geometry
    rainBuffer = new THREE.BufferGeometry();
    let posRain = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount * 3; i += 3) {
        posRain[i] = Math.random() * 200 - 100; // X position
        posRain[i + 1] = Math.random() * 100 - 50; // Y position
        posRain[i + 2] = Math.random() * 300 - 150; // Z position
    }
    rainBuffer.setAttribute('position', new THREE.BufferAttribute(posRain, 3));

    // Blue rain material
    let rainMaterial = new THREE.PointsMaterial({
        color: 0x0000ff, // Blue color
        size: .4,       // Size of the raindrops
        transparent: true
    });

    // Create rain points
    rain = new THREE.Points(rainBuffer, rainMaterial);
    scene.add(rain);
}

function animate() {
    requestAnimationFrame(animate);

    const positions = rain.geometry.attributes.position.array;
    for (let i = 0; i < rainCount * 3; i += 3) {
        positions[i + 1] -= 2.0 + Math.random() * 0.1; // Y-axis movement
        if (positions[i + 1] < -50) { // Reset position to the top
            positions[i + 1] = 50;
        }
    }
    rain.geometry.attributes.position.needsUpdate = true;

    // Render scene
    renderer.render(scene, camera);
}

init();
animate();
