import { FA, LMR } from "tonwa-react";
import { useSnapshot } from "valtio";
import { useNav } from "./nav";
import { PageProps } from "./PageProps";
import { usePageTemplate } from "./PageTemplate";

export function Error(props: PageProps) {
    let nav = useNav();
    let { appNav } = nav;
    let { errorPosition } = usePageTemplate(props.template);
    let { response } = appNav;
    let responseSnapshot = useSnapshot(response);
    let { error } = responseSnapshot;
    if (error === undefined) return null;

    let left = <div className="py-2 px-3 cursor-pointer" onClick={() => appNav.clearError()}>
        <FA name="times" size="lg" />
    </div>
    function onShow() {
        alert(error.message);
    }
    let right = <div className="py-2 px-3 cursor-pointer" onClick={onShow}>
        <FA name="angle-right" />
    </div>;
    return <div className={errorPosition === 'under-header' ? 'tonwa-page-container' : ''}>
        <LMR className="bg-light align-items-center border-bottom border-info"
            left={left}
            right={right}
        >
            <FA className="text-danger me-2" name="exclamation-triangle" />
            <span className="text-info">{error.message}</span>
        </LMR>
    </div>;
}
