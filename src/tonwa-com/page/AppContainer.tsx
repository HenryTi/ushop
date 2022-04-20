import { useSnapshot } from "valtio";
import { StackContainer } from "./StackContainer";
import { AppNavContext } from "./nav";
import { useRef } from "react";
import { AppNav } from "./AppNav";

export function AppContainer() {
    let { current: appNav } = useRef(new AppNav());
    let { stack } = useSnapshot(appNav.data);
    return <AppNavContext.Provider value={appNav}>
        <StackContainer stackItems={stack} />
    </AppNavContext.Provider>;
}
