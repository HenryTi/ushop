import { Login, Logout, Register } from "tonwa-auth";
import { LoginTop, Privacy } from "tonwa-image";
import { AppPageStackContainer, AuthProvider } from "tonwa-page";

export function AppLogin() {
    return <AppPageStackContainer>
        <Login loginTop={<LoginTop />} privacy={<Privacy />} withBack={false} />
    </AppPageStackContainer>;
}

export function AppRegister() {
    return <AppPageStackContainer>
        <Register loginTop={<LoginTop />} privacy={<Privacy />} />
    </AppPageStackContainer>;
}

export function AppLogout() {
    let onLogout = async () => {
        alert('logout');
    }
    let resetAll = () => {
        alert('reset all');
    }
    return <AppPageStackContainer>
        <Logout onLogout={onLogout} resetAll={resetAll} />
    </AppPageStackContainer>;
}
