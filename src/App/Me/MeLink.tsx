import { LMR, FA, Sep } from "tonwa-com";
import { AboutPage } from './AboutPage';
import { MeEditPage } from "./MeEditPage";
import { MeAdminLink } from "./MeAdminLink";
import { useNav, useT } from "tonwa-com";
import { appT } from '../res';
import { meT } from "./meRes";
import { useUqApp } from "App/UqApp";
import { Image } from "tonwa-com-uq";
import { useSnapshot } from "valtio";

export function MeLink() {
    const app = useUqApp();
    const nav = useNav();
    const t = useT(meT, appT);
    const { user } = useSnapshot(app.responsive);
    function MeInfo() {
        if (!user) return null;
        let { id, name, nick, icon } = user;
        return <LMR className="py-3 px-3 cursor-pointer w-100"
            onClick={() => nav.open(<MeEditPage />)}>
            <Image className="w-3c h-3c me-3" src={icon || '.user-o'} />
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substring(1)}</div>
            </div>
            <FA className="align-self-end" name="angle-right" />
        </LMR>;
    }

    function openAbout() {
        nav.open(<AboutPage />);
    }

    function AboutLink() {
        return <LMR className="w-100 py-3 px-3 align-items-center" onClick={openAbout}>
            <FA className="text-info me-3" name="smile-o" fixWidth={true} size="lg" />
            <b className="">{t('aboutTheApp')} <small>{t('version')} {app.version}</small></b>
            <FA className="align-self-center" name="angle-right" />
        </LMR>;
    }
    if (user) {
        return <div>
            <MeInfo />
            <Sep />
            <MeAdminLink />
            <Sep />
            <AboutLink />
            <Sep />
        </div>;
    }
    else {
        return <div>
            <AboutLink />
            <Sep />
            <div className="d-flex py-3">
                <button className="btn btn-success w-20c my-2 mx-auto" onClick={() => alert('please login')}>
                    <FA name="sign-out" size="lg" /> {t('pleaseLogin')}
                </button>
            </div>
            <Sep />
        </div>;
    }
}

function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
