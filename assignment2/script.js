import * as THREE from 'three';
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/*********
**SET UP**
*********/
//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

//Resizing
window.addEventListener('resize',() =>
{
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //Update Camera 
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/***********
 ** SCENE **
 ***********/

 //Canvas 
const canvas = document.querySelector('.webgl')

 //Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

 //Camera
const camera = new THREE.PerspectiveCamera(
    75, 
    sizes.aspectRatio,
    0.1, 
    100
)
scene.add(camera)
camera.position.set(0, 12, -20)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
 })
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls (camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
***********/ 
// Directional Light 
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/*************
 * * MESHES **
 ************/
//Cube Geometry
const cubeGeometry = new THREE. BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, params) => 
{
    //Create cube material 
    let material
    if(params.emissive)
    {
        material = new THREE.MeshLambertMaterial ({
            emissive: new THREE.Color(params.color),
            emissiveIntensity: height * 0.05
    })
    } else {
        material = new THREE.MeshStandardMaterial ({
        color: new THREE.Color(params.color)
        })
    }

    //Wireframe
    if(params.wireframe)
    {
        material.wireframe = true
    }

    //Create cube 
    const cube = new THREE.Mesh(cubeGeometry, material)

    //Position Cube 
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height - 10

    //Scale Cube 
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    //Randomize cube rotation 
    if(params.randomized){
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
    }
    
    //Add cube to group
    params.group.add(cube)

}

    const drawSphere = (height,params) => {
        const sphereGeometry = new THREE.SphereGeometry(0.3)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(params.color)
        })

    //Create sphere
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    //Position sphere 
    sphere.position.x = (Math.random() - 0.5) * params.diameter
    sphere.position.z = (Math.random() - 0.5) * params.diameter
    sphere.position.y = height - 10

    //Scale Sphere
    sphere.scale.x = params.scale
    sphere.scale.y = params.scale
    sphere.scale.z = params.scale

    //Randomize cube rotation 
    if(params.randomized){
        sphere.rotation.x = Math.random() * 2 * Math.PI
        sphere.rotation.z = Math.random() * 2 * Math.PI
        sphere.rotation.y = Math.random() * 2 * Math.PI
    }
    
    //Add sphere to group
    params.group.add(sphere)
    } 

 const drawTetrahedron = (height,params) => {
        const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5)
        const tetrahedronMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(params.color)
        })

    //Create sphere
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial)

    //Position sphere 
    tetrahedron.position.x = (Math.random() - 0.5) * params.diameter
    tetrahedron.position.z = (Math.random() - 0.5) * params.diameter
    tetrahedron.position.y = height - 10

    //Scale Sphere
    tetrahedron.scale.x = params.scale
    tetrahedron.scale.y = params.scale
    tetrahedron.scale.z = params.scale

    //Randomize cube rotation 
    if(params.randomized){
        tetrahedron.rotation.x = Math.random() * 2 * Math.PI
        tetrahedron.rotation.z = Math.random() * 2 * Math.PI
        tetrahedron.rotation.y = Math.random() * 2 * Math.PI
    }
    
    //Add tetrahedron to group
    params.group.add(tetrahedron)
    } 

//drawCube('pink')

/********
 ** UI **
 *******/
// UI
const ui = new dat.GUI()

let preset = {}

//Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
    sourceText: "",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term:'crowley',
        color: '#ff0000',
        group: group1,
        diameter: 10,
        emissive: true,
        nCubes: 1,
        randomized: true,
        scale: 1,
        wireframe: false,
        shape: 3
    },
     term2: {
        term:'aziraphale',
        color: '#ffffff',
        group: group2,
        diameter: 10,
        emissive: false,
        randomized: true,
        nCubes: 1,
        scale: 1,
        wireframe: false,
        shape: 2
    },
     term3: {
        term:'adam',
        color: '#009dff',
        group: group3,
        diameter: 10,
        emissive: false,
        randomized: true,
        nCubes: 1,
        scale: 1,
        wireframe: true,
        shape: 1
    },
    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
}

//UI Functions 
const saveSourceText = () =>
{
    //UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()


    //Text Analysis 
    tokenizeSourceText (uiObj.sourceText)
    //console.log(uiObj.sourceText)
}

const saveTerms = () =>
{
    //UI
    preset = ui.save()
    visualizeFolder.hide()
    cameraFolder.show()
    
    //Testing 
    //console.log(uiObj.term1)
    //console.log(uiObj.color1)
    //console.log(uiObj.term2)
    //console.log(uiObj.color2)
    //console.log(uiObj.term3)
    //console.log(uiObj.color3)

    //Text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
}

//Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder  
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder 
    .add(uiObj, 'saveSourceText')
    .name("Save")

//Terms, Visualize and Camera Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Color")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Color")


termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Color")

termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")


visualizeFolder
    .add(uiObj,'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable")

//Terms and Visualize folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

/******************
** TEXT ANALYSIS **
******************/
//Variables
let parsedText, tokenizedText

//Parse and Tokenize sourceText 
const tokenizeSourceText = (sourceText) =>  
{
    //Strip Periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    //Tokenize Text 
    tokenizedText = parsedText.split(/[^\w']+/)
}

//find searchTerm in tokenizeText
const findSearchTermInTokenizedText = (params) =>
{
    //Use a for loop to go through the tokenizedText array 
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === params.term){
            //convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2

            //call drawCube functon nCubes times using converted height value
            if(1===params.shape)
            {
            for(let a = 0; a < params.nCubes; a++)
            {
            drawCube(height, params)
            }
            }
             if(2===params.shape)
            {
            for(let a = 0; a < params.nCubes; a++)
            {
            drawSphere(height, params)
            }
            }
            if(3===params.shape)
            {
            for(let a = 0; a < params.nCubes; a++)
            {
            drawTetrahedron(height, params)
            }
            }
        }
    }
}

//findSearchTermInTokenizedText("cat", "white")
//findSearchTermInTokenizedText("cayde", "orange")
//findSearchTermInTokenizedText("home", "red")

 /******************* 
 ** ANIMATION LOOP **
 *******************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    //console.log(elapsedTime)

    //Update OrbitControls
    controls.update()

    // Rotate Camera 
    if(uiObj.rotateCamera)
    {
       camera.position.x = Math.sin(elapsedTime * 0.1) * 20
       camera.position.z = Math.cos(elapsedTime * 0.1) * 20
       camera.position.y = 5
       camera.lookAt(0, 0, 0)
    }

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()