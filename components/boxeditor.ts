import * as THREE from "three";


export enum InteractionMode {
    RESIZING,
    TRANSLATING,
    DRAWING,//whilst we're drawing a rectangle on a plane
    EXTRUDING,//whilst we're extruding that rectangle into a box
}

export class BoxEditor {
    min: THREE.Vector3;
    max: THREE.Vector3;
    STEP: number;

    public randomPoint(): THREE.Vector3 {
        var point = new THREE.Vector3();

        point.x = this.min.x + Math.random() * (this.max.x - this.min.x);
        point.y = this.min.y + Math.random() * (this.max.y - this.min.y);
        point.z = this.min.z + Math.random() * (this.max.z - this.min.z);

        return point;
    }


}