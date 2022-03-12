import { Uq } from "tonwa-uq";

export abstract class Model {
    protected readonly uq: Uq;

    constructor(uq: Uq) {
        this.uq = uq;
    }
}
