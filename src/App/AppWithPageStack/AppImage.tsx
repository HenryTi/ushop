import { Login, Register } from "tonwa-com-uq";
import { LoginTop, Privacy } from "tonwa-image";

export function AppLogin() {
    return <Login loginTop={<LoginTop />} privacy={<Privacy />} withBack={false} />;
}

export function AppRegister() {
    return <Register loginTop={<LoginTop />} privacy={<Privacy />} />;
}
