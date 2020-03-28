import * as THREE from "three";

export class PhysicsObject {
    object: THREE.Mesh;
    force: THREE.Vector3;
    isStatic: boolean;
    mass: number;
    constructor(baseObject: THREE.Mesh, force?: THREE.Vector3) {
        this.object = baseObject;
        this.object.geometry.computeBoundingBox();
        this.force = force ?? new THREE.Vector3(0, 0, 0);
    }
    calculateMovement(colliders: Array<PhysicsObject>, deltaTime: number) {
        if(this.isStatic) {
            return;
        }
        else {
            var currentPosition = this.object.position;
            var dt = this.force.clone();
            dt.multiplyScalar(deltaTime / 1100);
            var newBoundingBox = this.object.geometry.boundingBox.clone();
            newBoundingBox.translate(dt);
            if(colliders.filter(x => x.object.geometry.boundingBox.containsPoint(newBoundingBox.getCenter(this.object.position))).length > 0) {
                this.force.set(0, 0, 0);
                return;
            } 
            console.log(dt);
            this.object.position.multiply(dt);
        }
    }
}