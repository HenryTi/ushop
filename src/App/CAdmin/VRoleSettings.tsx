import { View } from "tonwa-contoller";
import { CAdmin } from "./CAdmin";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
//const cnMYLg = ' my-2 ';
const cnMYSm = ' my-1 ';
const cnSmallMuted = ' small text-muted ';

export class VRoleSettings extends View<any> {
    render(): JSX.Element {
        return <div className="mt-3">
            <div className={cnRow + cnSmallMuted}>counselor</div>
            <div className={cnRow + cnBg + cnMYSm}></div>
        </div>
    }
}
