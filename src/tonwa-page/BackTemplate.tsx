import { FA } from "tonwa-react";
import { useNav } from "./nav";
import { PageBackProps } from "./PageProps";

export function Back(props: PageBackProps) {
    let { back } = props;
    let pageNav = useNav();
    function onClickBack() {
        if (pageNav.data.stack.length === 1) {
            pageNav.appNav.close(); //.navigate(-1 as any);
        }
        else {
            pageNav.close();
        }
    }
    function renderBack(iconName: string) {
        return <div className="px-3 cursor-pointer" onClick={onClickBack}>
            <FA name={iconName} />
        </div>;
    }
    switch (back) {
        default:
            if (pageNav.data.stack.length === 1) {
                return <div className="pe-3" />;
            }
            return renderBack('angle-left');
        case 'back': return renderBack('angle-left');
        case 'close': return renderBack('close');
        case 'none': return null;
    }
}
