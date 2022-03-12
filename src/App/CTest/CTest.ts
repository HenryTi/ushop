import { CControl } from "../CControl";
import { VTest } from "./VTest";
import { VTest1 } from "./VTest1";

export class CTest extends CControl {
    main(): JSX.Element {
        return this.render(VTest);
    }

    showTest1 = () => {
        this.open(VTest1)
    }
}
