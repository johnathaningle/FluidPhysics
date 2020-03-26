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
    calculateMovement(colliders: Array<PhysicsObject>, deltaTime: number): THREE.Vector3 {
        if(this.isStatic) {
            return null;
        }
        else {
            var currentPosition = this.object.position;
            var dt = this.force.clone();
            dt.multiplyScalar(deltaTime / 200);
            console.log(dt);
            var newLocationBasedOnForce = currentPosition.add(dt);
            colliders.forEach(x => {
                if(x.object.geometry.boundingBox.containsPoint(newLocationBasedOnForce)) {
                    this.force.set(0, 0, 0);
                    return currentPosition;
                } else {
                    return newLocationBasedOnForce;
                }
            });
        }
    }
}