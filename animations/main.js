

        let scene, camera, renderer;
        let rain, rainBuffer;
        const rainCount = 10000;

        function init(){

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight , 1, 1000);
            camera.position.z = 1;
            const backgroundGeometry = new THREE.PlaneGeometry(500, 500);
            const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Gray color
            const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
            backgroundPlane.position.z = -50;   
            scene.add(backgroundPlane);

            const ambientLight = new THREE.AmbientLight(0xfafafa);
            scene.add(ambientLight);
            
            rainBuffer = new THREE.BufferGeometry();
            let posRain = new Float32Array(rainCount * 3);
            for(let i = 0; i < (rainCount * 3); i+=3){
                posRain[i] = Math.random() * 200 -100;
                posRain[i+1] = Math.random() * 100-50;
                posRain[i+2] = Math.random() * 300 -150;
            }
            rainBuffer.setAttribute('position', new THREE.BufferAttribute(posRain,3));
            let rainMaterial = new THREE.PointsMaterial({
                color: 0xfafafa,
                size: .4,
                transparent: true
            });
            rain = new THREE.Points(rainBuffer, rainMaterial);
            scene.add(rain);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        }

        function animate(){
            requestAnimationFrame( animate);

            const positions = rain.geometry.attributes.position.array;
            for(let i = 0; i < (rainCount*3); i+=3){
                positions[i+1] -= .05 + Math.random() * .02; //adjust speed here
                if (positions[i + 1] < -50) { // Reset position to the top
                    positions[i + 1] = 50;
                }
                rain.geometry.attributes.position.needsUpdate = true;
            }
            renderer.render( scene, camera);
        }

        init();
        animate();
