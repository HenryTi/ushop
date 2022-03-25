import { UPage, useNav } from "tonwa-nav";

export function AppRegister() {
    /*    return <AppPageStack>
            <Register />
        </AppPageStack>;
    }
    
    function Register() {
    */
    let nav = useNav();
    return <UPage header="register" footer={<div>footer</div>}>
        <div>register</div>
        <div>
            <button onClick={() => nav.navigate('/')}>home</button>
        </div>
        <div>
            <button onClick={() => nav.start('/login')}>login</button>
        </div>
    </UPage>
}
