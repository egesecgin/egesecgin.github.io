// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(8, 0.8712, 20, 3, 6.283185307179586);
const material = new THREE.MeshLambertMaterial ({ color: 0x454003 });
const torus = new THREE.Mesh(geometry, material);



scene.add(torus);
torus.position.z = -5;
torus.position.x = 2;


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const zhdk = new THREE.TextureLoader().load('./starzhdk.jpg');
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    map: zhdk,
    
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
scene.background = spaceTexture;

// Avatar

const egeTexture = new THREE.TextureLoader().load('./ege.jpg');

const ege = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: egeTexture }));

scene.add(ege);

const sonTexture = new THREE.TextureLoader().load('./anahtar.jpg');

const son = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: sonTexture }));

scene.add(son);

// Moon

const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 27,5;
moon.position.setX(-10);

ege.position.z = -5;
ege.position.x = 2;

son.position.z = 35;
son.position.setX(0);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
 
  moon.rotation.y += -0.07;
 

  ege.rotation.y += 0.03;
  ege.rotation.z += 0.03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  moon.rotation.y += -0.008;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
