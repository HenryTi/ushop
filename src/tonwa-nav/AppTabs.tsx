import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FA } from 'tonwa-react';
import { useSnapshot } from 'valtio';
import { AppNavContext, AppPageItem, AppPageLayers } from './nav';

interface AppTabsProps {
    pages?: AppPageItem[];
    active?: AppPageItem;

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
    let nav = useContext(AppNavContext);
    let { defaultActive, data } = nav;
    let { stack } = data;
    let activePage = active_page ? active_page : defaultActive?.name;
    let tabs = useSnapshot(stack);

    useEffect(() => {
        let { defaultActive, data } = nav;
        let { stack } = data;
        let activePage = active_page ? active_page : defaultActive?.name;
        nav.setNavOptions({ replace: true });
        nav.setInitTabs(pages, active);
        if (!activePage) return;
        let ap = activePage;
        let p = stack.findIndex(v => v.name === activePage);
        if (p < 0) ap = defaultActive?.name;
        if (ap) {
            nav.navigate(`${ap}`);
        }
    }, [nav, active, active_page, pages]);
    function TabContainer(tab: AppPageItem) {
        let { name, keep, title } = tab;
        return <li key={name} className="nav-item">
            <a href="/#"
                className={'nav-link d-flex align-items-center p-0 ' + (activePage === name ? "active" : "")}
                role="button"
            >
                {
                    keep === true ?
                        <div className="px-3 py-2"
                            onClick={() => nav.activate(tab)}>
                            <TabKept title={title} />
                        </div>
                        :
                        <>
                            <div className='d-flex align-items-center'
                                onClick={() => nav.activate(tab)}>
                                <Tab title={title} />
                                <div onClick={evt => { nav.close(tab); evt.stopPropagation(); }}>
                                    <TabClose />
                                </div>
                            </div>
                        </>
                }
            </a>
        </li>
    }
    return <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <ul className="nav nav-tabs">{tabs.map(tab => TabContainer(tab))}</ul>
        <AppPageLayers active={activePage} appPageItems={tabs} />
    </div>;
}
