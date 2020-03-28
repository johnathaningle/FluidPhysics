import * as THREE from "three";
import { WireframeCube } from "./wireframecube";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { PhysicsObject } from "./physicsobject";


//the main application!!!
export class FluidParticles {
    gravityObjects: Array<PhysicsObject>;
    currentTime: number;
    editorCube: WireframeCube;
    rootElement: HTMLElement;
    renderer: THREE.Renderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    target: THREE.Vector3;
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;
    isMouseDown: boolean;
    FOV: number;
    isSimulating: boolean;
    lastTime: number;
    GRID_HEIGHT: number;
    GRID_WIDTH: number;
    GRID_DEPTH: number;
    PARTICLES_PER_CELL: number;

    constructor() {
        this.gravityObjects = new Array<PhysicsObject>();
        this.currentTime = Date.now();
        this.isSimulating = false;
        this.scene = new THREE.Scene();
        this.mouse = new THREE.Vector2(); 

        this.editorCube = new WireframeCube(80, 80, 140);
        var cameraPosition = new THREE.Vector3(0, 0, 100);
        this.target = new THREE.Vector3(0, 0, 0);
        this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.addScaledVector(cameraPosition, 1);
        this.camera.lookAt(this.target);
        this.raycaster = new THREE.Raycaster(this.target);
        
        var renderer = new THREE.WebGLRenderer({antialias: true});
        var composer = new EffectComposer(renderer);
        var ssaoPass = new SSAOPass( this.scene, this.camera, window.innerWidth, window.innerHeight );

        this.renderer = renderer;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.rootElement = document.getElementById("root");
        this.rootElement.appendChild( this.renderer.domElement );

        this.constructLighting();
        this.constructScene();
        this.wireUpEventListeners();
        this.animate();
    }
    constructLighting() {
        this.scene.add( new THREE.DirectionalLight() );
        this.scene.add( new THREE.HemisphereLight() );
        var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        this.camera.add( pointLight );
        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
        this.scene.add( ambientLight );
    }
    constructScene() {
        this.scene.background = new THREE.Color(0xcecece);
        this.editorCube.getWireFrame().forEach(x => this.scene.add(x));
        this.editorCube.getCollisionObjects().forEach(x => this.gravityObjects.push(x));
        var cube = new THREE.BoxGeometry(10, 10, 10);
        var mesh = new THREE.Mesh(cube, new THREE.MeshPhongMaterial({color: 0x3ABACE }));
        var physicsMesh = new PhysicsObject(mesh, new THREE.Vector3(0, -10, 0));
        this.gravityObjects.push(physicsMesh);
        this.gravityObjects.forEach(x => this.scene.add(x.object));
    }

    

    toggleSimulation() {
        if(this.isSimulating) {
            this.endSimulation();
            this.isSimulating = false;
            document.getElementById("simulate").innerText= "Simulate";
        }
        else {
            this.startSimulation();
            this.isSimulating = true;
            document.getElementById("simulate").innerText= "Stop Simulation";
        }
    }

    startSimulation() {

    }

    endSimulation() {

    }

    wireUpEventListeners() {
        document.getElementById("simulate").addEventListener("click", () => this.toggleSimulation());

        document.getElementById("reset-orientation").addEventListener("click", () => {
            this.scene.rotation.set(0, 0, 0);
            this.scene.position.set(0, 0, 0);
            this.camera.position.set(0, 0, 100);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        });
        window.addEventListener("resize", () => {
            this.rootElement.innerHTML = "";
            this.renderer.setSize( window.innerWidth - 10, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.lookAt(this.target);
            this.rootElement.appendChild(this.renderer.domElement);
        });
        window.addEventListener("mousewheel", (e) => {
            var event = e as WheelEvent;
            if(event.deltaY > 0) {
                this.scene.scale.set(this.scene.scale.x + 0.2, this.scene.scale.y + 0.2, this.scene.scale.z + 0.2);
            }
            else {
                this.scene.scale.set(this.scene.scale.x * 0.9, this.scene.scale.y * 0.9, this.scene.scale.z * 0.9);
            }
        });
        window.addEventListener("mousemove", (e) => {
            var deltax = this.mouse.x - e.clientX;
            var deltay = this.mouse.y - e.clientY;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            if(this.isMouseDown) {
                this.scene.rotateY(-deltax / 300);
                this.scene.rotateX(-deltay / 300);
            }
            
        });
        window.addEventListener("mousedown", (e) => {
            this.isMouseDown = true;
        });

        window.addEventListener("mouseup", () => {
            this.isMouseDown = false;
        });
      
        window.addEventListener("keydown", (e) => {
            if(e.key == "ArrowLeft") {
                this.scene.position.setX(this.scene.position.x + 1);
            }
            else if(e.key == "ArrowRight") {
                this.scene.position.setX(this.scene.position.x - 1);
            }
            else if(e.key == "ArrowUp") {
                this.scene.position.setY(this.scene.position.y - 1);
            }
            else if(e.key == "ArrowDown") {
                this.scene.position.setY(this.scene.position.y + 1);
            }
        });
    }

    private update(deltaTime: number) {
        this.gravityObjects.map(x => {
            if(!x.isStatic) {
                x.calculateMovement(this.gravityObjects.filter(x => x.isStatic), deltaTime);
            }
        });
    }
    private animate() {
        var timeDelta = Date.now() - this.currentTime;
        this.currentTime = Date.now();
        this.update(timeDelta);
        this.raycaster.setFromCamera( this.mouse, this.camera );
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}