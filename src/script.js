import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()
//fog
const fog = new THREE.Fog('#262837',1,20)
scene.fog=fog



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorcolortexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphatexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusiontexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeighttexture = textureLoader.load('./textures/door/height.jpg')
const doorNormaltexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnesstexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnesstexture = textureLoader.load('./textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('./textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('./textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('./textures/bricks/roughness.jpg')

//grass
const grassColorTexture = textureLoader.load('./textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('./textures/grass/roughness.jpg')

 grassColorTexture.repeat.set(8,8) 
 grassAmbientOcclusionTexture.repeat.set(8,8) 
 grassNormalTexture .repeat.set(8,8)
 grassRoughnessTexture.repeat.set(8,8)

 grassColorTexture.wrapS= THREE.RepeatWrapping
 grassAmbientOcclusionTexture.wrapS= THREE.RepeatWrapping
 grassNormalTexture.wrapS= THREE.RepeatWrapping
 grassRoughnessTexture.wrapS= THREE.RepeatWrapping



 grassColorTexture.wrapT= THREE.RepeatWrapping
 grassAmbientOcclusionTexture.wrapT= THREE.RepeatWrapping
 grassNormalTexture.wrapT= THREE.RepeatWrapping
 grassRoughnessTexture.wrapT= THREE.RepeatWrapping
  
/**
 * House
 */
// Temporary sphere

const house =new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:bricksColorTexture,
        aoMap:bricksAmbientOcclusionTexture,
        normalMap:bricksNormalTexture,
        roughnessMap:bricksRoughnessTexture
    })
)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
)
walls.position.y = 2.5/2
house.add(walls)

//rooftop pyramid

const roof =new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({ color: '#b35f45'})
)
house.add(roof)
roof.position.y= 2.5 + (1/2)
roof.rotation.y=Math.PI/4



//dooor

const door= new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({ 
        map: doorcolortexture,
        transparent: true,
        alphaMap: doorAlphatexture,
        aoMap:doorAmbientOcclusiontexture,
        displacementMap:doorHeighttexture,
        displacementScale: 0.1,
        normalMap: doorNormaltexture,
        metalnessMap: doorMetalnesstexture,
        roughnessMap: doorRoughnesstexture
    })
)

door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
)
house.add(door)
door.position.z=2+0.01
door.position.y=1

//bushes
const bushGeometry = new THREE.SphereBufferGeometry(1,16,16,16)
const bushmaterial = new THREE.MeshStandardMaterial({ color: '#89c854'})
const bush = new THREE.Mesh(bushGeometry,bushmaterial)
house.add(bush);
bush.scale.set(0.5,0.5,0.5);
bush.position.set(0.8,0.2,2.2);


const bush2 = new THREE.Mesh(bushGeometry,bushmaterial)
house.add(bush2);
bush2.scale.set(0.25,0.25,0.25);
bush2.position.set(1.4,0.1,2.1);


const bush3 = new THREE.Mesh(bushGeometry,bushmaterial)
house.add(bush3);
bush3.scale.set(0.5,0.5,0.5);
bush3.position.set(-1.5,0.1,2.2);


const bush4 = new THREE.Mesh(bushGeometry,bushmaterial)
house.add(bush4);
bush4.scale.set(0.25,0.25,0.25);
bush4.position.set(-2.1,0.1,1.9);




const graves = new THREE.Group()
scene.add(graves)

const gravegerometry = new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const gravematerial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})


for(let i=0; i<50;i++)
{
    const angle = Math.random() * Math.PI * 2;

    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle)*radius;
    const z = Math.cos(angle)*radius;


    const grave = new THREE.Mesh(gravegerometry,gravematerial)
    grave.position.set(x,0.3,z)
    grave.rotation.y= (Math.random()-0.5)* 1
    grave.rotation.z= (Math.random()-0.5)* 1
    graves.add(grave)
    
    grave.castShadow = true
    
}





// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map:grassColorTexture,
        aoMap:grassAmbientOcclusionTexture,
        normalMap:grassNormalTexture,
        roughnessMap:grassRoughnessTexture
    })
)
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)



 //door light scene
const doorlight = new THREE.PointLight('#ff7d46',2,5)
doorlight.position.set(0,2.2,2.7)
house.add(doorlight)


const ghost1 = new THREE.PointLight('#ff00ff',2,3)
scene.add(ghost1)


const ghost2 = new THREE.PointLight('#00ffff',2,3)
scene.add(ghost2)


const ghost3 = new THREE.PointLight('#ffff00',2,3)
scene.add(ghost3)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 6
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


renderer.shadowMap.enabled=true;
moonLight.castShadow= true;
doorlight.castShadow= true;
ghost1.castShadow= true;
ghost2.castShadow= true;
ghost3.castShadow= true;
/**
 * Animate
 */


walls.castShadow=true;
bush.castShadow=true;
bush2.castShadow=true;
bush3.castShadow=true;
bush4.castShadow=true;

floor.receiveShadow=true;



doorlight.shadow.mapSize.width=256
doorlight.shadow.mapSize.height=256
doorlight.shadow.camera.far=7;

ghost1.shadow.mapSize.width=256
ghost1.shadow.mapSize.height=256
ghost1.shadow.camera.far=7;


ghost2.shadow.mapSize.width=256
ghost2.shadow.mapSize.height=256
ghost2.shadow.camera.far=7;


ghost3.shadow.mapSize.width=256
ghost3.shadow.mapSize.height=256
ghost3.shadow.camera.far=7;




const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    //ghost is moving boom boom 

    const ghostangle = elapsedTime *0.5;
    ghost1.position.x=Math.cos(ghostangle)*4
    ghost1.position.z=Math.sin(ghostangle)*4
    ghost1.position.y=Math.abs(Math.sin(elapsedTime*3))*4

    const ghostangle2 = - elapsedTime *0.32;
    ghost2.position.x=Math.cos(ghostangle2)*5
    ghost2.position.z=Math.sin(ghostangle2)*5
    ghost2.position.y=Math.abs((Math.sin(elapsedTime*3)*4)+ Math.sin(elapsedTime*25))


    const ghostangle3 = - elapsedTime * 4;
    ghost3.position.x=Math.cos(ghostangle3)*5
    ghost3.position.z=Math.sin(ghostangle3)*5
    ghost3.position.y=Math.abs((Math.sin(elapsedTime*3)*4) - Math.sin(elapsedTime*25))


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()