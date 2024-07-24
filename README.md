# Three.js Molecule Visualization Project

This project is a 3D visualization of a molecule using Three.js. It features interactive elements such as sliders to control the rotation speed of the molecule and dynamically adjust the scene. This README provides instructions on how to set up and run the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Controls](#controls)
- [Code Explanation](#code-explanation)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/KreaMonto/molecule.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd your-directory
    ```

3. **Install the dependencies:**

    Ensure you have Node.js and npm installed. Then run:

    ```bash
    npm install
    ```

## Usage

To run the project locally, follow these steps:

1. **Start the development server:**

    ```bash
    npm run start
    ```

2. **Open your web browser:**

    Navigate to `http://localhost:1234` to view the project.

## Features

- **Interactive 3D Molecule:**
  - The molecule is composed of a central sphere, upper spheres, and connecting cylinders.
  - The molecule rotates automatically.

- **Adjustable Rotation Speed:**
  - Use the slider in the GUI to adjust the rotation speed of the molecule.

- **Shadow Casting and Lighting:**
  - The project uses directional light to cast realistic shadows.
  - The light and shadow settings can be visualized using helpers.

## Controls

- **Rotation Speed:**
  - Adjust the rotation speed of the molecule using the provided slider in the GUI.
  
## Code Explanation

Here are the main parts of the project structure:

- **`src/`:** The directory containing the JavaScript code.
  - **`script.js`:** The main JavaScript file where the Three.js scene is set up and animated.
- **`index.html`:** The main HTML file that includes as poit of execution.
- **`package.json`:** The Node.js project configuration file.

### Setting Up the Light

The directional light is set up to cast shadows and illuminate the scene from above:

```javascript
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
directionalLight.position.set(0, 50, 0);
directionalLight.castShadow = true;

directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

scene.add(directionalLight);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);
```

### Setting Up the GUI

The GUI allows users to control the rotation speed of the molecule:

```javascript
const gui = new dat.GUI();
const options = {
    rotationSpeed: 0.01
};
gui.add(options, 'rotationSpeed', 0, 0.1);

function animate() {
    molecula.rotation.y += options.rotationSpeed;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

```

### Interactive Molecule Rotation

This project allows you to interactively rotate a molecule when clicking on it while maintaining the ability to control the camera when clicking elsewhere. This is achieved using a Raycaster to detect mouse clicks on the molecule and handle the interaction accordingly.

- **Raycasting for Molecule Interaction**
    - To enable interactive rotation of the molecule, the following steps are implemented:

- **Setting Up the Raycaster:**
    - A Raycaster is created to detect intersections between the mouse click and the molecule.

- **Detecting Mouse Clicks:**
     - The onMouseDown event is used to determine if the mouse click intersects with the molecule.
     - If an intersection is detected, controls for the camera are disabled, and mouse events for mousemove and mouseup are enabled to handle the rotation of the molecule.

- **Rotating the Molecule:**
    - During the mousemove event, the rotation of the molecule is updated based on the mouse movement.
    - The molecule's rotation is adjusted along the x and y axes to follow the mouse movement.

- **Restoring Camera Controls:**
    - Once the mouse button is released (mouseup event), the mouse events for mousemove and mouseup are removed, and the camera controls are re-enabled.
 
Below is the implementation code for the raytracing and interactive rotation:

```javascript
// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

function onMouseDown(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(molecula, true);

    if (intersects.length > 0) {
        // Intersected object found
        intersectedObject = intersects[0].object;
        controls.enabled = false;
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);
    } else {
        controls.enabled = true;
        intersectedObject = null;
    }
}

function onMouseMove(event) {
    if (intersectedObject) {
        // Calculate mouse movement
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        // Update the rotation of the molecule based on mouse movement
        const rotationSpeed = 0.005;
        molecula.rotation.y += movementX * rotationSpeed;
        molecula.rotation.x += movementY * rotationSpeed;
    }
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    intersectedObject = null;
    controls.enabled = true;
}

// Add event listeners for mouse actions
window.addEventListener('mousedown', onMouseDown, false);
```

#### How to Use

- **Click on the Molecule:**
    - When you click on the molecule, you can rotate it by moving the mouse while holding down the mouse button.

- **Click Elsewhere:**
    - When you click elsewhere on the scene, you can control the camera using the usual orbit controls.


### License

This project is licensed under the MIT License. See the LICENSE file for details.
