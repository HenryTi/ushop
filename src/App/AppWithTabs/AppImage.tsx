import { Login, Logout, Register } from "tonwa-com-uq";
import { LoginTop, Privacy } from "tonwa-image";

export function AppLogin() {
    return <Login loginTop={<LoginTop />} privacy={<Privacy />} withBack={false} />;
}

export function AppRegister() {
    return <Register loginTop={<LoginTop />} privacy={<Privacy />} />;
}

export function AppLogout() {
    let onLogout = async () => {
        //alert('logout');
    }
    let resetAll = () => {
        alert('reset all');
    }
    return <Logout onLogout={onLogout} resetAll={resetAll} />;
}
