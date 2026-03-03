import * as THREE from 'three';
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(THREE)
console.log(dat)
console.log(OrbitControls)

/*********
**SET UP**
*********/
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}


/***********
 ** SCENE **
 ***********/

 //Canvas 
const canvas = document.querySelector('.webgl')

 //Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

 //Camera
const camera = new THREE.PerspectiveCamera(
    75, 
    sizes.aspectRatio,
    0.1, 
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true,
    alpha: true
 })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls (camera, canvas)
controls.enableDamping = true

/*************
 * * MESHES **
 ************/
//Cave 
const caveGeometry = new THREE.PlaneGeometry(15, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial ({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

//Objects 

//Dice
const IcosahedronGeometry = new THREE.IcosahedronGeometry();
const IcosahedronMaterial = new THREE.MeshNormalMaterial()
const dice = new THREE.Mesh(IcosahedronGeometry, IcosahedronMaterial)
dice.position.set(10.5, 2.25, 0)
dice.castShadow = true 
scene.add(dice)

//Slinky
const TubeGeometry = new THREE.TubeGeometry();
const TubeMaterial = new THREE.MeshNormalMaterial()
const legOne = new THREE.Mesh(TubeGeometry, TubeMaterial)
legOne.position.set(9,2,0)
legOne.castShadow = true 
scene.add(legOne)

//Left Sphere
/* const leftSphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
const leftSphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(leftSphereGeometry, leftSphereMaterial)
sphere.position.set(9, 4, 1.5)
sphere.castShadow = true
scene.add(sphere) */

//Right Sphere
/* const rightSphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
const rightSphereMaterial = new THREE.MeshNormalMaterial()
const spheree = new THREE.Mesh(rightSphereGeometry, rightSphereMaterial)
spheree.position.set(9, 4, -1.5)
spheree.castShadow = true
scene.add(spheree) */

//Smile
/* const torusGeometry = new THREE.TorusGeometry(2, 0.2, 12, 48, Math.PI*1)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(9, 2, 0)
torus.castShadow = true
torus.rotation.y = Math.PI * 0.5
torus.rotation.z = Math.PI * 1
scene.add(torus) */

/**********
 **LIGHTS**
 *********/
//Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color ('white')
//)

//scene.add(ambientLight)

//Directional Lighgt
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color ('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/**********************
 ** DOM INTERACTIONS **
 **********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

//part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

//part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 1
}

//first-change 
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange=true
}

document.querySelector('#second-change').onclick = function() {
    domObject.secondChange=true
}

document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange=true
}

document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange=true
}

/********
 ** UI **
 *******/
// UI
/*
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')
*/

 /******************* 
 ** ANIMATION LOOP **
 *******************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    console.log(camera.position)

   //part-one
    if(domObject.part === 1)
    {
        //camera.position.set(9,0,2.5)
        //camera.lookAt(0,0,0)
        
       
    }

   //part-two
   if(domObject.part === 2)
    {
        camera.position.set(9,0,2.5)
        camera.lookAt(0,0,0)

    }

    //first change 
    if(domObject.firstChange) 
    {  
        //camera.position.set(9,2,2.5)
        //camera.lookAt(0,0,0)
        dice.position.set(12.5, 4.25, 2)
        legOne.position.set(11,4,2)
        directionalLight.shadow.mapSize.width = 512
        directionalLight.shadow.mapSize.height = 512
    }

    //second change 
    if (domObject.secondChange) 
    {
        directionalLight.position.set(20, 4.1, 10)
    }

    //third change 
    if(domObject.thirdChange)
    {

    }

    //fourth change
    if(domObject.fourthChange)
    {
        
    }

    //Update directionalLightHelper
    directionalLightHelper.update()

    //Update OrbitControls
    controls.update()

    

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()