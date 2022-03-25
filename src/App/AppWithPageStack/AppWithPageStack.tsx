import { Page, useNav } from "tonwa-nav";

export function AppWithPageStack() {
    /*    return <AppPageStack>
            <Home />
        </AppPageStack>;
    }
    
    function Home() {
        */
    let nav = useNav();
    nav.initPages({
        try1: <Page1 />,
        try2: <Page2 />,
    });
    return <Page header="home" footer={<div>footer</div>}>
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
        <div><button onClick={() => nav.setError('err1', 'ddddd mmmm dd')}>set err1</button></div>
        <div><button onClick={() => nav.clearError()}>clear error</button></div>
        <div><button onClick={() => nav.logout()}>logout</button></div>
        <div style={{ height: '180em' }}></div>
        <div><button onClick={() => nav.open('try', <Page1 />)}>open page try</button></div>
        <div><button onClick={() => nav.open('try1')}>open page try1</button></div>
        <div><button onClick={() => nav.open('try2')}>open page try2</button></div>
    </Page>
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