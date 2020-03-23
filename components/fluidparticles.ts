import * as THREE from "three";

export enum StateType {
    EDITING,
    SIMULATING
}

export class FluidParticles {
    renderer: THREE.Renderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    FOV: number;
    State: StateType;
    lastTime: number;
    GRID_HEIGHT: number;
    GRID_WIDTH: number;
    GRID_DEPTH: number;
    PARTICLES_PER_CELL: number;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        this.camera.position.set( 0, 0, 100 );
        this.camera.lookAt( 0, 0, 0 );
        

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        //create a blue LineBasicMaterial
        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var points = [];
        points.push( new THREE.Vector3( - 10, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 10, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );

        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var line = new THREE.Line( geometry, material );
        this.scene.add( line );
        this.wireUpEventListeners();
        this.animate();
    }

    wireUpEventListeners() {
        window.addEventListener("resize", () => {
            document.body.innerHTML = "";
            this.renderer.setSize( window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
        })
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}