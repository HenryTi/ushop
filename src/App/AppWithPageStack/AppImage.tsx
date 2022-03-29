import { Login, Register } from "tonwa-auth";
import { LoginTop, Privacy } from "tonwa-image";

export function AppLogin() {
    return <Login loginTop={<LoginTop />} privacy={<Privacy />} withBack={false} />;
}

export function AppRegister() {
    return <Register loginTop={<LoginTop />} privacy={<Privacy />} />;
}
