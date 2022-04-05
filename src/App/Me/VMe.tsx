import { Image, PropGrid, LMR, FA, Prop } from "tonwa";
import { appConfig } from '../../uq-app/appConfig';
import { PAbout } from './PAbout';
import { tonwa } from "tonwa-core";
import { PEditMe } from "./PEditMe";
import { t } from "./t";
import { VMeAdmin } from "./VMeAdmin";
import { useNav } from "tonwa-com";

export function VMe() {
    let nav = useNav();
    function MeInfo() {
        let { user } = tonwa;
        if (!user) return null;
        let { id, name, nick, icon } = user;
        return <LMR className="py-2 cursor-pointer w-100"
            left={<Image className="w-3c h-3c me-3" src={icon || '.user-o'} />}
            right={<FA className="align-self-end" name="angle-right" />}
            onClick={() => nav.open(<PEditMe />)}>
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substring(1)}</div>
            </div>
        </LMR>;
    }

    function openAbout() {
        nav.open(<PAbout />);
    }

    const { user } = tonwa;
    let aboutRows: Prop[] = [
        '',
        {
            type: 'component',
            component: <LMR className="w-100 py-2" onClick={openAbout}
                right={<FA className="align-self-center" name="angle-right" />}>
                <FA className="text-info me-3" name="smile-o" fixWidth={true} size="lg" />
                <b className="">{t('aboutTheApp')} <small>{t('version')} {appConfig.version}</small></b>
            </LMR>,
        },
    ];

    let rows: Prop[];
    if (user === undefined) {
        rows = aboutRows;
        rows.push(
            {
                type: 'component',
                component: <button className="btn btn-success w-100 my-2" onClick={() => tonwa.logout()}>
                    <FA name="sign-out" size="lg" /> {t('pleaseLogin')}
                </button>
            },
        );
    }
    else {
        let logOutRows: Prop[] = [
        ];

        rows = [
            '',
            {
                type: 'component',
                component: <MeInfo />
            },
        ]

        rows.push('');
        rows.push({
            type: 'component',
            component: <VMeAdmin />
        })

        rows.push(...aboutRows, ...logOutRows);
    }
    return <PropGrid rows={[...rows]} values={{}} />;
}

function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
