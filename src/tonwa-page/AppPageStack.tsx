import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppNavContext } from './nav';
import { StackContainer } from './StackContainer';

export function AppPageStack({ children }: { children: React.ReactNode; }) {
    const { active_page } = useParams();
    let appNav = useContext(AppNavContext);
    //let { stack } = data;
    //let tabs = useSnapshot(stack);
    /*
    useEffect(() => {
        let { data } = appNav;
        if (!active_page) return;
        let p = data.stack.findIndex(v => v.name === active_page);
        if (p < 0) activePage = defaultActive?.name;
        if (activePage) {
            appNav.navigate(`${activePage}`);
        }
    }, [appNav, active_page]);
    */
    let p = {
        name: '',
        page: <>{children}</>,
        title: undefined as string,
        onClose: undefined as any,
    };
    //<div className="d-flex flex-column flex-grow-1 overflow-hidden">
    return <StackContainer stackItems={[p]} />;
}
