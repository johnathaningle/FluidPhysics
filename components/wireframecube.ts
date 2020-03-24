import * as THREE from "three";

export class WireframeCube {
    height: number;
    width: number;
    depth: number;
    origin: THREE.Vector3;
    constructor(height?:number, width?:number, depth?:number, origin?: THREE.Vector3) {
        this.height = height ?? 10;
        this.depth = depth ?? 10;
        this.width = width ?? 20;
        this.origin = origin ?? new THREE.Vector3(0, 0, 0);
    }

    getWireFrame() {
            var lines = [];
    
            //create a blue LineBasicMaterial
            var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
            var points = [];
            //vertical lines
            points.push(new THREE.Vector3( 0, 0, 10 ) );
            points.push(new THREE.Vector3( 0, 0, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 0, 10, 0 ) );
            points.push(new THREE.Vector3( 0, 0, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 0, 0 ) );
            points.push(new THREE.Vector3( 0, 0, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 10 ) );
            points.push(new THREE.Vector3( 10, 10, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 10 ) );
            points.push(new THREE.Vector3( 10, 0, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 10 ) );
            points.push(new THREE.Vector3( 0, 10, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 0, 10, 10 ) );
            points.push(new THREE.Vector3( 0, 10, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 0, 10, 10 ) );
            points.push(new THREE.Vector3( 0, 0, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 0 ) );
            points.push(new THREE.Vector3( 0, 10, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 0, 10, 10 ) );
            points.push(new THREE.Vector3( 0, 0, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 0 ) );
            points.push(new THREE.Vector3(10, 10, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 0 ) );
            points.push(new THREE.Vector3(10, 10, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 0, 0, 10 ) );
            points.push(new THREE.Vector3( 10, 0, 10 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 0, 10 ) );
            points.push(new THREE.Vector3( 10, 0, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
    
            var points = [];
            points.push(new THREE.Vector3( 10, 10, 0 ) );
            points.push(new THREE.Vector3( 10, 0, 0 ) );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            var line = new THREE.Line( geometry, material );
            lines.push(line);
            return lines;
        
    }

}