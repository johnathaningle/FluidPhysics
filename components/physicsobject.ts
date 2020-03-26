import * as THREE from "three";

export class PhysicsObject {
    object: THREE.Object3D | THREE.Mesh;
    force: THREE.Vector3;
    isStatic: boolean;
    mass: number;
    constructor(baseObject: THREE.Object3D | THREE.Mesh) {
        this.object = baseObject;
    }
}