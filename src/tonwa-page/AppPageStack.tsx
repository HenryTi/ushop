import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppNavContext, AppPageLayers } from './nav';

export function AppPageStack({ children }: { children: React.ReactNode; }) {
    const { active_page } = useParams();
    let nav = useContext(AppNavContext);
    //let { stack } = data;
    //let tabs = useSnapshot(stack);

    useEffect(() => {
        let { defaultActive, data } = nav;
        let activePage = active_page ? active_page : defaultActive?.name;
        nav.setNavOptions({ replace: false });
        if (!activePage) return;
        let p = data.stack.findIndex(v => v.name === activePage);
        if (p < 0) activePage = defaultActive?.name;
        if (activePage) {
            nav.navigate(`${activePage}`);
        }
    }, [nav, active_page]);
    let p = {
        name: '',
        page: <>{children}</>,
        title: undefined as string,
    };
    return <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <AppPageLayers appPageItems={[p]} />
    </div>;
}
