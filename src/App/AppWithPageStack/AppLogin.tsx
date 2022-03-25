import { UPage, useNav } from "tonwa-nav";

export function AppLogin() {
    let nav = useNav();
    function onLogined() {
        nav.logined({} as any);
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
