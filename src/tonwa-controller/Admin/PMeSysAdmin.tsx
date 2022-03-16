import { FA, LMR } from "tonwa-react";
import { getAppBase } from "../AppBase";
import { Page } from "../Page";
import { Data } from "./VAdmin";

const cnRow = ' px-3 py-2 ';
const cnBg = ' bg-white ';
const cnMYLg = ' my-2 ';
//const cnMYSm = ' my-1 ';
const cnSmallMuted = ' small text-muted ';
const info = <FA className="text-primary me-3 mt-1" name="info-circle" size="lg" />;

interface Props {
    data: Data;
    setMeAdmin: () => Promise<void>;
}

export function PMeSysAdmin({ data, setMeAdmin }: Props) {
    let app = getAppBase();
    let { meAdmin, sysAdmins } = data;

    function content() {
        switch (meAdmin.role) {
            default: return null;
            case -1: return renderQuiting();
            case 1: return renderAm();
        }
    }
    function showMeSysAdmin() {
        app.open(<PMeSysAdmin data={data} setMeAdmin={setMeAdmin} />);
    }
    let onMeSystemAdmin = async () => {
        await setMeAdmin();
        let { role } = meAdmin;
        meAdmin.role = -role;
        meAdmin.update = Date.now() / 1000;
        app.close();
    }
    function renderQuiting() {
        let { update } = meAdmin;
        let dateUpdate = new Date(update * 1000);
        let dateUpdateNextDay = new Date((update + 24 * 3600) * 1000);
        return <div>
            <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
                onClick={showMeSysAdmin}>
                <div className="d-flex justify-content-center p-3">
                    {info}<b>I am quiting system admim</b>
                </div>
                <div className={cnSmallMuted + ' my-3 d-flex justify-content-center '}>
                    You quit at {dateUpdate.toLocaleDateString()} {dateUpdate.toLocaleTimeString()},
                    can restore before {dateUpdateNextDay.toLocaleDateString()} {dateUpdateNextDay.toLocaleTimeString()}
                </div>
            </LMR>
            <div className="pt-3">
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-outline-primary"
                        onClick={onMeSystemAdmin}>
                        Restore system admin
                    </button>
                </div>
            </div>
        </div>;
    }

    function renderAm() {
        return <div>
            <LMR className={cnRow + cnBg + cnMYLg + ' text-danger cursor-pointer'}
                onClick={showMeSysAdmin}>
                <div className="d-flex justify-content-center p-3">
                    {info}<b>I am a system admim</b>
                </div>
            </LMR>
            <div className="pt-3">
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-outline-primary"
                        disabled={sysAdmins.length === 0}
                        onClick={onMeSystemAdmin}>
                        Quit system admin
                    </button>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <div className={cnSmallMuted}>You can restore in 24 hours after quiting</div>
                </div>
            </div>
        </div>;
    }

    return <Page header="Sys admin">
        {content()}
    </Page>;
}
