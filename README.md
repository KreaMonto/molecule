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
    cd threejs-molecule-visualization
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

### License

This project is licensed under the MIT License. See the LICENSE file for details.
