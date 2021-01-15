var scene = new THREE.Scene();

//Create a new perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,0,13);

//Create the WebGL renderer and set its size to the full dimensions of the screen.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer canvas to the DOM.
document.body.appendChild(renderer.domElement);

//Add Orbit Controls
var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);


//Create a new ambient light
var light = new THREE.AmbientLight( 0x888888 )
scene.add( light )

//Create a new directional light
var light = new THREE.DirectionalLight( 0xfdfcf0, 1 )
light.position.set(20,10,20)
scene.add( light )

//Create geometry and material
var earthGeometry = new THREE.SphereGeometry( 5, 50, 50 );
var earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("./Images/2k_neptune.jpg"),
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 25
});

//Build earth mesh using our geometry and material
var earth = new THREE.Mesh(earthGeometry, earthMaterial);

//add the earth mesh to the scene
scene.add(earth);

//Stars
var starGeometry = new THREE.SphereGeometry(500, 50, 50);
var starMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/Images/2k_stars.jpg"),
    side: THREE.DoubleSide,
    shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);


//Camera vector
var earthVec = new THREE.Vector3(0,0,0);

var r = 35;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;

var dx = .01;
var dy = -.01;
var dz = -.05;



//Render loop
var render = function() {
  earth.rotation.y += .0009;
  
  //Flyby
  if (camera.position.z < 0) {
    dx *= -1;
  }
  camera.position.x += dx;
  camera.position.y += dy;
  camera.position.z += dz;

  camera.lookAt(earthVec);

  //Flyby reset
  if (camera.position.z < -100) {
    camera.position.set(0,35,70);
  }

  camera.lookAt(earthVec);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
