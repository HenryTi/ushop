//import { Page } from "tonwa-controller";
//import { TabCaptionComponent, TabProp, TabsProps, t } from "tonwa";
//import { app } from "./App";
import { t } from "tonwa";
import { TabHome } from "./Home";
import { PIDs } from "./IDs";
//import { VMe } from "./Me/VMe";
import { PActs } from "./Acts";
import { Page, PageTabs, Tab, useNav } from "tonwa-com";
import { FA } from "tonwa-react";

/*
const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
function caption(label: string | JSX.Element, icon: string) {
    return (selected: boolean) => TabCaptionComponent(label, icon, color(selected));
}
*/
export function PMain() {
    //let { cActs } = app;
    /*
    let tabs: TabProp[] = [
        { name: 'home', caption: caption(t('dev'), 'wrench'), content: <TabHome /> },
        { name: 'acts', caption: caption(t('home'), 'home'), content: <PActs /> },
        { name: 'ids', caption: caption(t('ids'), 'file-text-o'), content: <PIDs /> },
    ]
    tabs.push(
        { name: 'me', caption: caption(t('me'), 'user-o'), content: <VMe /> },
    );
    */
    function TabTag({ caption, icon }: { caption?: string | JSX.Element; icon?: string; }) {
        return <div className="d-flex flex-column align-items-center px-2 py-1">
            <div className="align-self-center py-1"><FA name={icon} size="lg" /></div>
            <small>{caption}</small>
        </div>;
    }
    return <PageTabs>
        <Tab name="home" tag={<TabTag caption={t('dev')} icon="wrench" />}>
            <TabHome />
        </Tab>
        <Tab name="acts" tag={<TabTag caption={t('home')} icon="home" />}>
            <PActs />
        </Tab>
        <Tab name="ids" tag={<TabTag caption={t('ids')} icon="file-text-o" />}>
            <PIDs />
        </Tab >
        <Tab name="t1" tag={<TabTag caption="t1" icon="circle-o" />}>
            <P />
        </Tab>
        <Tab name="t2" tag={<TabTag caption="t2" icon="circle-o" />}>
            <Page header="ddcccc">
                <div>t2</div>
            </Page>
        </Tab>
    </PageTabs>;
}

function P() {
    let nav = useNav();
    return <Page header="TT1" footer={<div>footer</div>}>
        <div>
            t1
            <button onClick={() => nav.appNav.setError('a', 'bbb')}>error</button>
            <button onClick={() => nav.appNav.clearError()}>clear error</button>
        </div>
        <div>
            <button onClick={() => nav.open(<Page1 />)}>open page</button>
        </div>
        {Array(20).fill(2).map((v, index) => <div key={index}>{v}</div>)}
    </Page>;
}

function Page1() {
    return <Page header="page 1" contentClassName="p-5 bg-success">
        <div>page 1</div>
        {Array(50).fill(2).map((v, index) => <div key={index}>{v}</div>)}
        <div>page 1</div>
    </Page>
}
