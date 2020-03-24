import * as THREE from "three";
import { WireframeCube } from "./wireframecube";

export enum StateType {
    EDITING,
    SIMULATING
}
//the main application!!!
export class FluidParticles {
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
    State: StateType;
    lastTime: number;
    GRID_HEIGHT: number;
    GRID_WIDTH: number;
    GRID_DEPTH: number;
    PARTICLES_PER_CELL: number;

    constructor() {
        this.editorCube = new WireframeCube(100, 200, 200);
        this.rootElement = document.getElementById("root");
        this.State = StateType.EDITING;
        this.scene = new THREE.Scene();
        this.mouse = new THREE.Vector2(); 
        this.cameraPosition = new THREE.Vector3(0, 0, 100);
        this.target = new THREE.Vector3(0, 0, 0);

        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 500 );
        this.camera.position.addScaledVector(this.cameraPosition, 1);
        this.camera.lookAt(this.target);
        
        this.raycaster = new THREE.Raycaster(this.target);

        this.renderer = new THREE.WebGLRenderer({ antialias: true});
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.rootElement.appendChild( this.renderer.domElement );

        this.constructLighting();
        this.constructScene();
        this.wireUpEventListeners();
        this.animate();
    }
    constructLighting() {
        var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        this.camera.add( pointLight );
        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
        this.scene.add( ambientLight );
    }
    constructScene() {
        this.scene.background = new THREE.Color(0xcecece);
        
        this.editorCube.getWireFrame().forEach(x => this.scene.add(x));

        // var solidMaterial = new THREE.MeshPhongMaterial( { color: 0xfafafa, side: THREE.DoubleSide } );
        // var object = new THREE.Mesh( new THREE.OctahedronBufferGeometry( 10, 2 ), solidMaterial );
        // object.position.set( 10, 0, 0);
        // this.scene.add( object );
        // var box = this.editorCube.getWireFrame();
        // this.scene.add(box);
    }

    

    startSimulation() {

    }

    wireUpEventListeners() {
        document.getElementById("reset-scene").addEventListener("click", () => {
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
                this.scene.rotateY(deltax / 300);
                this.scene.rotateX(deltay / 300);
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
        console.log(this.scene);
        
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        this.camera.lookAt(this.target);
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}