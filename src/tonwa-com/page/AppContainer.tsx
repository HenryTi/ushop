import { useSnapshot } from "valtio";
import { useUqAppBase } from "tonwa-com-uq";
import { StackContainer } from "./StackContainer";

export function AppContainer() {
    let uqApp = useUqAppBase();
    let { appNav } = uqApp;
    let { stack } = useSnapshot(appNav.data);
    return <StackContainer stackItems={stack} />;
}
