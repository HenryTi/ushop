import { CControl } from "./CControl";
import { VMain } from "./VMain";

export class CMain extends CControl {
    async openMain() {
        this.open(VMain);
    }
}