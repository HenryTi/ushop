import { useState } from "react";
import { ClickSuspense, Page } from "tonwa-controller";
import { CTest } from "./CTest";

export function PTest() {
    let [count, setCount] = useState(0);
    let cTest = new CTest();
    let onTestSave = async () => {
        await cTest.save();
    }

    let onTestLoad = async () => {
        await cTest.load();
    }
    return <Page header="Test">
        <div className="p-3">
            Test
            <div>
                <button onClick={() => setCount(count + 1)}>test {count}</button>
                <ClickSuspense promise={onTestSave}>
                    <button className="btn btn-primary me-3"
                        onClick={evt => { }}>
                        save
                    </button>
                </ClickSuspense>
                <ClickSuspense promise={onTestLoad}>
                    <button className="btn btn-primary me-3"
                        onClick={evt => { }}>
                        load
                    </button>
                </ClickSuspense>
            </div>
        </div>
    </Page>;
}
