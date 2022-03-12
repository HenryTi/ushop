import { VAdmin } from "tonwa-contoller";
import { FA, LMR } from "tonwa-react";
import { UQs } from "uq-app";
import { app } from "../App";
import { t } from "./t";

export function VMeAdmin() {
    const uqs: UQs = app.uqs;

    let loadAdmins = async (): Promise<any[]> => {
        return await uqs.BzWorkshop.AdminGetList();
    }

    let setMeAdmin = async (): Promise<void> => {
        await uqs.BzWorkshop.AdminSetMe();
    }

    let setAdmin = async (user: number, role: number, assigned: string): Promise<void> => {
        await uqs.BzWorkshop.AdminSet(user, role, assigned);
    }

    return <VAdmin Content={VMeAdminContent}
        me={app.user?.id} loadAdmins={loadAdmins} setMeAdmin={setMeAdmin} setAdmin={setAdmin} />;
}

function VMeAdminContent({ onClick }: { onClick: () => void }) {
    return <LMR className="w-100 py-3" onClick={onClick}
        right={<FA className="align-self-center" name="angle-right" />}>
        <FA className="text-primary me-3" name="cogs" fixWidth={true} size="lg" />
        <b className="text-danger">{t('admin')}</b>
    </LMR>;
}
