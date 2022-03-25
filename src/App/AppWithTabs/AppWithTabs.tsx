import { Nav, AppTabs, Page, useNav } from 'tonwa-nav';
import { TrialPage1 } from './TrialPage1';

const tabDraft = {
    name: 'draft',
    title: "Draft",
    keep: true,
    page: <Page contentClassName="bg-success">
        <div className="p-2">
            <h4 className="text-info">Draft Tasks</h4>
            <div style={{ height: '10em' }} />
            <div>draft bottom</div>
        </div>
    </Page>
};
const tabInProgress = {
    name: "in_progress",
    title: "In Progress",
    keep: true,
    page: <div className="container-fluid">
        <div className="row p-2">
            <div className="col sm-12 p-2">
                <h4 className="text-primary">In Progress Tasks</h4>
            </div>
        </div>
    </div>
};

function TestNav() {
    let nav = useNav();
    function onClick() {
        let id = ++tabNo;
        let name = 't' + id;
        let tabItem = {
            name,
            title: 'title ' + id,
            page: <div>content {id}</div>
        }
        nav.openTab(tabItem);
    }
    return <div className="container-fluid">
        <div className="row p-2">
            <div className="col sm-12 p-2">
                <h4 className="text-success">Test Nav Completed Tasks</h4>
                <button onClick={onClick}>test</button>
            </div>
        </div>
    </div>;
}

const tabCompleted = {
    name: "completed",
    title: "Completed",
    page: <TestNav />,
};

const tabsArr = [tabDraft, tabInProgress, tabCompleted];
let tabNo = 0;

export function AppWithTabs() {
    //pages={tabsArr} active={tabDraft}
    return <div className="d-flex flex-column">
        <TopBar />
        <div className="d-flex flex-grow-1 overflow-hidden">
            <SideBar />
            <AppTabs pages={tabsArr} active={tabDraft} />
        </div>
        <BottomBar />
    </div>;
}

function onAdd(nav: Nav) {
    let id = ++tabNo;
    let name = 't' + id;
    let tabItem = {
        name,
        title: 'title ' + id,
        page: <TrialPage1 id={id} />
    }
    nav.openTab(tabItem);
}

function TopBar() {
    let nav = useNav();
    return <div className="py-3">
        <h4 className="px-3">Tabs <button onClick={() => onAdd(nav)}>+</button></h4>
    </div>;
}

function SideBar() {
    let nav = useNav();
    return <div className="border px-3">
        <div className="my-2">left side bar</div>
        <button className="my-2" onClick={() => onAdd(nav)}>新开页面</button>
    </div>;
}

function BottomBar() {
    return <div className="py-2 px-3 border text-center">
        <h5>bottom</h5>
    </div>;
}
