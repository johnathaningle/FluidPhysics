import * as THREE from "three";
import { WireframeCube } from "./wireframecube";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';


//the main application!!!
export class FluidParticles {
    currentTime: Date;
    editorCube: WireframeCube;
    rootElement: HTMLElement;
    renderer: THREE.Renderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    target: THREE.Vector3;
    cameraPosition: THREE.Vector3;
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
        this.currentTime = new Date();
        this.editorCube = new WireframeCube(80, 80, 140);
        this.rootElement = document.getElementById("root");
        this.isSimulating = false;
        this.scene = new THREE.Scene();
        this.mouse = new THREE.Vector2(); 
        this.cameraPosition = new THREE.Vector3(0, 0, 100);
        this.target = new THREE.Vector3(0, 0, 0);

        this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.addScaledVector(this.cameraPosition, 1);
        this.camera.lookAt(this.target);
        
        this.raycaster = new THREE.Raycaster(this.target);
        
        var renderer = new THREE.WebGLRenderer();
        var composer = new EffectComposer(renderer);
        var ssaoPass = new SSAOPass( this.scene, this.camera, window.innerWidth, window.innerHeight );

        this.renderer = renderer;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
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
        var cube = new THREE.BoxGeometry(10, 10, 10);
        var mesh = new THREE.Mesh(cube, new THREE.MeshPhongMaterial({color: 0x3ABACE }));
        this.scene.add(mesh);
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
                this.cameraPosition.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z + 2);
            }
            else {
                this.cameraPosition.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z - 2);
            }
            this.update();
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
            
            this.update();
        });
        window.addEventListener("mousedown", (e) => {
            this.isMouseDown = true;
        });

        window.addEventListener("mouseup", () => {
            this.isMouseDown = false;
        });
      
        window.addEventListener("keydown", (e) => {
            if(e.key == "ArrowLeft") {
                this.target.x += 1;
            }
            else if(e.key == "ArrowRight") {
                this.target.x -= 1;
            }
            else if(e.key == "ArrowUp") {
                this.target.y += 1;
            }
            else if(e.key == "ArrowDown") {
                this.target.y -= 1;
            }
            this.update();
        });
    }

    update() {
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        this.camera.lookAt(this.target);
    }
    animate() {
        this.currentTime = new Date();
        this.raycaster.setFromCamera( this.mouse, this.camera );
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}