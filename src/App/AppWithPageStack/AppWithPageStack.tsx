import { PMain } from "../PMain";
import { useEffect } from "react";
import { Page, useNav } from "tonwa-page";
import { useSnapshot } from "valtio";
import { tonwa } from "tonwa-core";
import { TonwaReact } from "tonwa-react";
import { app } from "../App";

function LoginedUser() {
    let nav = useNav();
    let { user } = useSnapshot(nav.appNav.response);
    if (!user) return null;
    let { name, id, nick } = user;
    return <div>{id} {name} {nick}</div>;
}

export function AppWithPageStack() {
    let nav = useNav();
    (tonwa as TonwaReact).setPageNav(nav);
    app.setNav(nav);
    /*
    let nav = useNav();
    let { appNav } = nav;
    useEffect(() => {
        nav.initPages({
            try1: <Page1 />,
            try2: <Page2 />,
        });
    }, [nav])
    return <Page header="home" right={<LoginedUser />} footer={<div>footer</div>}>
        <div>home</div>
        <div>
            <button onClick={() => nav.navigate('home')}>home</button>
        </div>
        <div>
            <button onClick={() => nav.start('login')}>login</button>
        </div>
        <div><button onClick={() => nav.open('try', <Page1 />)}>open page try</button></div>
        <div><button onClick={() => nav.open('try1')}>open page try1</button></div>
        <div><button onClick={() => nav.open('try2')}>open page try2</button></div>
        <div><button onClick={() => appNav.setError('err1', 'ddddd mmmm dd')}>set err1</button></div>
        <div><button onClick={() => appNav.clearError()}>clear error</button></div>
        <div><button onClick={() => appNav.loginChanged(undefined)}>logout</button></div>
        <div style={{ height: '180em' }}></div>
        <div><button onClick={() => nav.open('try', <Page1 />)}>open page try</button></div>
        <div><button onClick={() => nav.open('try1')}>open page try1</button></div>
        <div><button onClick={() => nav.open('try2')}>open page try2</button></div>
    </Page>
    */
    return <PMain />;
}

function Page1() {
    return <Page header="page 1" contentClassName="p-5 bg-success">
        <div>page 1</div>
    </Page>
}

function Page2() {
    return <Page header="page 2" contentClassName="p-5 bg-success">
        <div>page 2</div>
    </Page>
}