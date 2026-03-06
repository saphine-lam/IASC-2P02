import * as THREE from 'three';
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

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

const sphereLowPoly = new THREE.SphereGeometry(2,7,7)
const sphereLowPoly2 = new THREE.SphereGeometry(1,7,7)
const sphereHighPoly = new THREE.SphereGeometry(2,32,32)
const sphereHighPoly2 = new THREE.SphereGeometry(1,32,32)
const sphereMat = new THREE.MeshNormalMaterial()
const sphere1 = new THREE.Mesh(sphereLowPoly,sphereMat)
const sphere01 = new THREE.Mesh(sphereLowPoly2,sphereMat)
const sphere2 = new THREE.Mesh(sphereHighPoly,sphereMat)
const sphere02 = new THREE.Mesh(sphereHighPoly2,sphereMat)
sphere1.position.set(10.5,2.25,0)
sphere01.position.set(10.5,2.25, 3)
sphere2.position.set(10.5,2.25,0)
sphere02.position.set(10.5,2.25,3)
sphere1.castShadow = true
sphere01.castShadow = true
sphere2.castShadow = true
sphere02.castShadow = true
scene.add(sphere1)
scene.add(sphere01)
scene.add(sphere2)
scene.add(sphere02)
sphere2.visible = false
sphere02.visible = false
//Dice
/*const IcosahedronGeometry = new THREE.IcosahedronGeometry();
const IcosahedronMaterial = new THREE.MeshNormalMaterial()
const dice = new THREE.Mesh(IcosahedronGeometry, IcosahedronMaterial)
dice.position.set(10.5, 2.25, 0)
dice.castShadow = true 
scene.add(dice)*/

//Slinky
/*class CustomSinCurve extends THREE.Curve {
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set( tx, ty, tz );
	}
}

const path = new CustomSinCurve( 10 )
const TubeGeometry = new THREE.TubeGeometry(path, 20, 0.2, 8, true)

const TubeMaterial = new THREE.MeshNormalMaterial()
const legOne = new THREE.Mesh(TubeGeometry, TubeMaterial)
legOne.position.set(9,2,0)
legOne.castShadow = true 
scene.add(legOne) */

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
    domObject.part = 2
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
    //console.log(elapsedTime)

    //console.log(camera.position)

   //part-one
    if(domObject.part === 1)
    {
        camera.position.set(9,0,2.5)
        camera.lookAt(0,0,0)
        
       
    }

   //part-two
   if(domObject.part === 2)
    {
        camera.position.set(15,0,2.5)
        camera.lookAt(0,0,0)

    }

    //first change 
    if(domObject.firstChange) 
    {  
        sphere1.visible = true
        sphere01.visible = true
        sphere2.visible = false
        sphere02.visible = false
        camera.position.set(10,2,2.5)
        camera.lookAt(0,0,0)
        sphere1.position.set(10.5,2.25,0)
        sphere01.position.set(10.5,2.25, 3)
        sphere2.position.set(10.5,2.25,0)
        sphere02.position.set(10.5,2.25,3)
        
    }

    //second change 
    if (domObject.secondChange) 
    {
        directionalLight.position.z = Math.sin(elapsedTime) * 2;
        sphere1.position.set(10.5,2.25,0)
        sphere01.position.set(10.5,2.25, 3)
        sphere2.position.set(10.5,2.25,0)
        sphere02.position.set(10.5,2.25,3)
    }

    //third change 
    if(domObject.thirdChange)
    {
        sphere1.visible = false
        sphere01.visible = false
        sphere2.visible = true
        sphere02.visible = true
        sphere1.position.set(10.5,2.25,0)
        sphere01.position.set(10.5,2.25, 3)
        sphere2.position.set(10.5,2.25,0)
        sphere02.position.set(10.5,2.25,3)
    }

    //fourth change
    if(domObject.fourthChange)
    {
        sphere1.visible = false
        sphere01.visible = false
        sphere2.visible = true
        sphere02.visible = true
        sphere2.position.set(3.5,0,0)
        sphere02.position.set(3.5,0,3)
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