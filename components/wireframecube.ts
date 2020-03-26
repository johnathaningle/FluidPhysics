import * as THREE from "three";

export class WireframeCube {
    width: number;
    height: number;
    depth: number;
    origin: THREE.Vector3;
    constructor(height?:number, depth?:number, width?:number, origin?: THREE.Vector3) {
        this.origin = origin ?? new THREE.Vector3(0 - (width / 2), 0 - (height / 2), 0 - (depth / 2));
        this.width = (width ?? 10) + this.origin.x;
        this.depth = (depth ?? 10) + this.origin.z;
        this.height = (height ?? 20) + this.origin.y;
    }

    getWireFrame() {
            var lines = [];
            //create a blue LineBasicMaterial
            var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

            //top right
            var points = [];
            points.push(new THREE.Vector3(this.width, this.height, this.depth ) );
            points.push(new THREE.Vector3(this.width, this.height, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //top front
            var points = [];
            points.push(new THREE.Vector3(this.width, this.height, this.depth ) );
            points.push(new THREE.Vector3(this.origin.x, this.height, this.depth ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //top left
            var points = [];
            points.push(new THREE.Vector3(this.origin.x, this.height, this.depth ) );
            points.push(new THREE.Vector3(this.origin.x, this.height, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
            
            //top back
            var points = [];
            points.push(new THREE.Vector3(this.width, this.height, this.origin.z ) );
            points.push(new THREE.Vector3(this.origin.x, this.height, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            //bottom front
            var points = [];
            points.push(new THREE.Vector3(this.origin.x, this.origin.y, this.depth ) );
            points.push(new THREE.Vector3(this.width, this.origin.y, this.depth ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //bottom back
            var points = [];
            points.push(new THREE.Vector3(this.width, this.origin.y, this.origin.z ) );
            points.push(new THREE.Vector3(this.origin.x, this.origin.y, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //bottom right
            var points = [];
            points.push(new THREE.Vector3(this.width, this.origin.y, this.depth ) );
            points.push(new THREE.Vector3(this.width, this.origin.y, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //bottom left
            var points = [];
            points.push(new THREE.Vector3(this.origin.x, this.origin.y, this.depth ) );
            points.push(new THREE.Vector3(this.origin.x, this.origin.y, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
            
            //vertical lines
            var points = [];
            points.push(new THREE.Vector3(this.width, this.height, this.origin.z ) );
            points.push(new THREE.Vector3(this.width, this.origin.y, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            var points = [];
            points.push(new THREE.Vector3(this.origin.x, this.height, this.depth ) );
            points.push(new THREE.Vector3(this.origin.x, this.origin.y, this.depth ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //right front vertical
            var points = [];
            points.push(new THREE.Vector3(this.width, this.height, this.depth ) );
            points.push(new THREE.Vector3(this.width, this.origin.y, this.depth ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);

            //vertical rear left
            var points = [];
            points.push(new THREE.Vector3(this.origin.x, this.height, this.origin.z ) );
            points.push(new THREE.Vector3(this.origin.x, this.origin.y, this.origin.z ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
            
            return lines;
        
    }

}