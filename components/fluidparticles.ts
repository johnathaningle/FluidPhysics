import * as THREE from "three";

export enum StateType {
    EDITING,
    SIMULATING
}

export class FluidParticles {
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
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        this.cameraPosition = new THREE.Vector3(0, 0, 100);
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        this.target = new THREE.Vector3(0, 0, 0);
        this.mouse = new THREE.Vector2(); 
        this.camera.lookAt(this.target);
        
        this.raycaster = new THREE.Raycaster(this.target)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
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
        //create a blue LineBasicMaterial
        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var points = [];
        points.push( new THREE.Vector3( - 10, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 10, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var line = new THREE.Line( geometry, material );
        this.scene.add( line );

        var solidMaterial = new THREE.MeshPhongMaterial( { color: 0xfafafa, side: THREE.DoubleSide } );
        var object = new THREE.Mesh( new THREE.OctahedronBufferGeometry( 10, 2 ), solidMaterial );
        object.position.set( 10, 0, 0);
        this.scene.add( object );
    }

    wireUpEventListeners() {
        window.addEventListener("resize", () => {
            document.body.innerHTML = "";
            this.renderer.setSize( window.innerWidth - 10, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.lookAt(this.target);
            document.body.appendChild(this.renderer.domElement);
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
                this.cameraPosition.set(this.cameraPosition.x + deltax, this.cameraPosition.y - deltay, this.cameraPosition.z);
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
            console.log(e);
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
        console.log(this.cameraPosition);
        this.camera.lookAt(this.target);
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}