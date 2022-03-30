import { PMain } from "../PMain";
import { Page, useNav } from "tonwa-page";
import { useSnapshot } from "valtio";
import { tonwa } from "tonwa-core";
import { TonwaReact } from "tonwa-react";
import { AppLogin } from "./AppImage";

function LoginedUser() {
    let nav = useNav();
    let { user } = useSnapshot(nav.appNav.response);
    if (!user) return null;
    let { name, id, nick } = user;
    return <div>{id} {name} {nick}</div>;
}

export function AppWithPageStack() {
    let nav = useNav();
    let { user } = useSnapshot(nav.appNav.response);
    if (!user) {
        return <AppLogin />;
    }
    /*
    return <Page header="home" right={<LoginedUser />} footer={<div>footer</div>}>
        <div>home</div>
        <div><button onClick={() => nav.open(<Page1 />)}>open page 1</button></div>
        <div><button onClick={() => nav.open(<Page2 />)}>open page 2</button></div>
        <div style={{ height: '180em' }}></div>
    </Page>
    */
    return <PMain />;
}

function Page1() {
    return <Page header="page 1" contentClassName="p-5 bg-success">
        <div>page 1</div>
        {Array(50).fill(0).map((v, index) => <br key={index} />)}
        <div>page 1</div>
    </Page>
}

function Page2() {
    return <Page header="page 2" contentClassName="p-5 bg-success">
        <div>page 2</div>
        {Array(50).fill(0).map((v, index) => <br key={index} />)}
        <div>page 2</div>
    </Page>
}