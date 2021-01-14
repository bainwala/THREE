var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        var planet;
        var renderer = new THREE.WebGLRenderer({alpha:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', function () { 
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width/height;
            camera.updateProjectionMatrix();
         })

        //Create the Shape

        const ambient = new THREE.AmbientLight(0x404040, 3);
        scene.add(ambient);

        var loader = new THREE.GLTFLoader();

        loader.load("/jupiter/scene.gltf", function (gltf) { 
            scene.add(gltf.scene);
            planet = gltf.scene.children[0];
            animate();
         })

        var geometry = new THREE.BoxGeometry(1,1,1);

        var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});

        var cube = new THREE.Mesh(geometry, material)

        //scene.add(cube);

        camera.position.z = 6;

        var update = function() {
            planet.rotation.z += 0.001;
            planet.rotation.y += 0.0005;
        };

        var animate = function() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            update()
        }

        