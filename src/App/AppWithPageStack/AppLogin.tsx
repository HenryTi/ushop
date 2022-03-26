import { UPage, useNav } from "tonwa-page";

export function AppLogin() {
    let nav = useNav();
    function onLogined() {
        nav.appNav.loginChanged({ name: 'henry', id: 10, nick: 'henry liao' });
        nav.start('/');
    }
    return <UPage header="login" footer={<div>footer</div>}>
        <div>login</div>
        <div>
            <button onClick={() => nav.start('/')}>home</button>
        </div>
        <div>
            <button onClick={() => nav.start('/login')}>login</button>
        </div>
        <div>
            <button onClick={() => nav.start('/register')}>register</button>
        </div>
        <div>
            <button onClick={onLogined}>logined</button>
        </div>

    </UPage>;
}
