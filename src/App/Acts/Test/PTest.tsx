import { useState } from "react";
import { ButtonAsync, Page } from "tonwa-com";
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
                <ButtonAsync className="btn btn-primary me-3"
                    onClick={onTestSave}>
                    save
                </ButtonAsync>
                <ButtonAsync className="btn btn-primary me-3"
                    onClick={onTestLoad}>
                    load
                </ButtonAsync>
            </div>
        </div>
    </Page>;
}
