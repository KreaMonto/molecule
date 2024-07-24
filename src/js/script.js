import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// Main configuration
// -------------------------

// -------------------------------------
// Renderer
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.setClearColor(0x111111)

// creating the DOM elememt
document.body.appendChild(renderer.domElement)

// creating the scene
const scene = new THREE.Scene()

// creting the camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

// setting up controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

// a grid helper (should be commented later)
// const gridHelper = new THREE.GridHelper(40)
// scene.add(gridHelper)

// camera initial position
camera.position.set(-30, 60, 45)


// Objects
// -----------

// -------------------------------------

// group
const molecula = new THREE.Object3D()
molecula.position.set(0, 13, 0)
molecula.castShadow = true
molecula.receiveShadow = true

// spheres -----------------
const spheresGeometry = new THREE.SphereGeometry(2.5, 32, 32)
const spheresMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 })

// central sphere
const centralGeometry = new THREE.SphereGeometry(4, 32, 32)
const centralMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 })
const centralSphere = new THREE.Mesh(centralGeometry, centralMaterial)
centralSphere.castShadow = true
centralSphere.receiveShadow = true
molecula.add(centralSphere)

// upper sphere
const upperSphere = new THREE.Mesh(spheresGeometry, spheresMaterial)
upperSphere.position.set(0, 13, 0)
upperSphere.castShadow = true
molecula.add(upperSphere)

// cilinders
const cilinderGeometry = new THREE.CylinderGeometry(0.6, 0.6, 10, 20)
const cilinderMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 })

// upper cilinder
const upperCilinder = new THREE.Mesh(cilinderGeometry, cilinderMaterial)
upperCilinder.position.set(0, 6, 0)
upperCilinder.castShadow = true
upperCilinder.receiveShadow = true
molecula.add(upperCilinder)

numOfCilinders = 3
radius = 7
heightOffset = -5

// center point
var target = new THREE.Vector3(0, 0, 0);

for (var i = 0; i < numOfCilinders; i++) {
    var angle = (i / numOfCilinders) * Math.PI * 2;
    var x = Math.cos(angle) * radius;
    var z = Math.sin(angle) * radius;
    var position = new THREE.Vector3(x, heightOffset, z);

    // creating the cilinder and putting it into the space
    var cylinder = new THREE.Mesh(cilinderGeometry, cilinderMaterial);
    cylinder.position.set(position.x, position.y, position.z);
    cylinder.castShadow = true
    cylinder.receiveShadow = true

    // calculating direction
    var direction = new THREE.Vector3().subVectors(target, cylinder.position).normalize();

    // calculate x rotation
    var axis = new THREE.Vector3(0, 1, 0).cross(direction).normalize();
    var angle = Math.acos(new THREE.Vector3(0, 1, 0).dot(direction));

    // creating the rotation matrix
    var quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    cylinder.setRotationFromQuaternion(quaternion);

    // adding the cilinder
    molecula.add(cylinder);

    // find the cilinder backtip
    var cylinderBackTip = new THREE.Vector3().addVectors(cylinder.position, direction.clone().multiplyScalar(-5));

    var sphere = new THREE.Mesh(spheresGeometry, spheresMaterial);
    sphere.position.set(cylinderBackTip.x, cylinderBackTip.y, cylinderBackTip.z);
    sphere.castShadow = true
    sphere.receiveShadow = true
    molecula.add(sphere);
}

scene.add(molecula)

// plane
const planeGeometry = new THREE.PlaneGeometry(40, 40)
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x005500,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true


// GUI
// -------------------------

// -------------------------------------

// creating the GUI
const gui = new dat.GUI()

// creating the options
const options = {
    ObjectSpeedRotation: 0.01,
    lightIntensity: 2,
    lightPositionX: 0,
    lightPositionZ: 0
}

gui.add(options, 'ObjectSpeedRotation', 0, 1)
gui.add(options, 'lightIntensity', 0, 5)
gui.add(options, 'lightPositionX', -30, 30)
gui.add(options, 'lightPositionZ', -30, 30)



// Lights
// -------------------------

// ----------------------------------------
const ambientLight = new THREE.AmbientLight(0x444444)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
scene.add(directionalLight)
directionalLight.position.set(0, 40, 0)
directionalLight.castShadow = true


// Configure the shadow camera
directionalLight.shadow.camera.left = -40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.top = 40;
directionalLight.shadow.camera.bottom = -40;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.mapSize.width = 400;
directionalLight.shadow.mapSize.height = 400;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)



// fog
// --------

// -------------------------------------
scene.fog = new THREE.FogExp2(0x000000, 0.007)


// animation and render
// -------------------------

// -------------------------------------
function animate() {
    molecula.rotation.y += options.ObjectSpeedRotation

    directionalLight.intensity = options.lightIntensity
    directionalLight.position.set(options.lightPositionX, 40, options.lightPositionZ)

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)