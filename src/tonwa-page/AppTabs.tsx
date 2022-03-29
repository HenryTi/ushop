import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FA } from 'tonwa-react';
import { useSnapshot } from 'valtio';
import { TabNav } from './AppNav';
import { AppNavContext, TabItem, TabNavContext, useTabNav } from './nav';
import { StackContainer } from './StackContainer';
import { InScrollContext } from './useScroll';

interface AppTabsProps {
    pages?: TabItem[];
    active?: TabItem;

    Tab?: (props: { title: string; }) => JSX.Element;
    TabKept?: (props: { title: string; }) => JSX.Element;
    TabClose?: () => JSX.Element;
}
export function AppTabs(props: AppTabsProps) {
    let { pages, active, Tab, TabKept, TabClose } = props;
    if (!Tab) Tab = ({ title }) => {
        return <div className="ps-3 pe-2 py-2">
            {title}
        </div>;
    }
    if (!TabKept) TabKept = ({ title }) => {
        return <>
            <FA name="home" className="me-2" size='lg' />{title}
        </>;
    }
    if (!TabClose) TabClose = () => <div className='btn btn-sm btn-outline-primary px-1 me-1 border-0 py-0 align-self-center'>
        <FA name="times" />
    </div>;

    const { active_page } = useParams();
    let tabNav = useTabNav();
    let { appNav, defaultActive, data } = tabNav;
    let { stack } = data;
    let activePage = active_page ? active_page : defaultActive?.name;
    let tabs = useSnapshot(stack);

    useEffect(() => {
        let { defaultActive, data } = tabNav;
        let { stack } = data;
        let activePage = active_page ? active_page : defaultActive?.name;
        //nav.setNavOptions({ replace: true });
        tabNav.setInitTabs(pages, active);
        if (!activePage) return;
        let ap = activePage;
        let p = stack.findIndex(v => v.name === activePage);
        if (p < 0) ap = defaultActive?.name;
        if (ap) {
            appNav.navigate(`${ap}`);
        }
    }, []);
    function TabContainer(tab: TabItem) {
        let { name, keep, title } = tab;
        return <li key={name} className="nav-item">
            <div
                className={'nav-link d-flex align-items-center p-0 ' + (activePage === name ? "active" : "cursor-pointer")}
                role="button"
            >
                {
                    keep === true ?
                        <div className="px-3 py-2"
                            onClick={() => tabNav.activate(tab)}>
                            <TabKept title={title} />
                        </div>
                        :
                        <>
                            <div className='d-flex align-items-center'
                                onClick={() => tabNav.activate(tab)}>
                                <Tab title={title} />
                                <div onClick={evt => { tabNav.closeTab(tab); evt.stopPropagation(); }}>
                                    <TabClose />
                                </div>
                            </div>
                        </>
                }
            </div>
        </li>
    }
    return <InScrollContext.Provider value={true}>
        <div className="d-flex flex-column flex-grow-1 overflow-hidden">
            <ul className="nav nav-tabs">{tabs.map(tab => TabContainer(tab))}</ul>
            <StackContainer active={activePage} stackItems={tabs} />
        </div>
    </InScrollContext.Provider>;
}
