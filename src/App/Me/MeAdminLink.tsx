import { AdminLink } from "tonwa-com-uq";
import { FA, LMR, useT } from "tonwa-com";
import { useUqApp } from "../UqApp";
import { appT } from '../res';
import { meT } from "./meRes";
import { useSnapshot } from "valtio";

export function MeAdminLink() {
    let uqApp = useUqApp();
    let { user } = useSnapshot(uqApp.responsive);
    const { uqs } = uqApp;

    let loadAdmins = async (): Promise<any[]> => {
        return await uqs.BzWorkshop.AdminGetList();
    }

    let setMeAdmin = async (): Promise<void> => {
        await uqs.BzWorkshop.AdminSetMe();
    }

    let setAdmin = async (user: number, role: number, assigned: string): Promise<void> => {
        await uqs.BzWorkshop.AdminSet(user, role, assigned);
    }

    function MeAdminLinkContent({ onClick }: { onClick: () => void }) {
        let t = useT(meT, appT);
        return <LMR className="w-100 py-3 px-3" onClick={onClick}>
            <FA className="text-primary me-3" name="cogs" fixWidth={true} size="lg" />
            <b className="text-danger">{t('admin')}</b>
            <FA className="align-self-center" name="angle-right" />
        </LMR>;
    }

    return <AdminLink LinkContent={MeAdminLinkContent}
        me={user?.id} loadAdmins={loadAdmins} setMeAdmin={setMeAdmin} setAdmin={setAdmin} />;
}
