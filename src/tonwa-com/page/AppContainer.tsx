import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { AppNavContext } from "./nav";
import { StackContainer } from "./StackContainer";
import { useUqApp } from "App";

interface Props {
    children: React.ReactNode;
}

export function AppContainer({ children }: Props) {
    let uqApp = useUqApp();
    let navigate = useNavigate();
    uqApp.initAppNav(children, navigate);
    let { appNav } = uqApp;
    //let auth = useAuth();
    //auth.subscribeOnLoginChanged(appNav.onLoginChanged);
    //appNav.onLoginChanged(auth.user);
    let { stack } = useSnapshot(appNav.data);
    return <AppNavContext.Provider value={appNav}>
        <StackContainer stackItems={stack} />
    </AppNavContext.Provider>;
}
