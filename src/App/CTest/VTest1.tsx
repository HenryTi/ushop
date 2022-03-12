import { VPage } from "tonwa-contoller";
import { CTest } from "./CTest";

export class VTest1 extends VPage<CTest> {
    header() { return '测试1' }
    content(): JSX.Element {
        return <div className="p-3">
            <div className="text-danger">测试1</div>
        </div>;
    }
}
