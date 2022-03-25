import { CControl } from "../CControl";
import { CActs } from "./CActs";

export abstract class CAct extends CControl {
    readonly cActs: CActs;
    constructor(cActs: CActs) {
        super(cActs.app);
        this.cActs = cActs;
    }
    abstract openMain(): Promise<void>;
}