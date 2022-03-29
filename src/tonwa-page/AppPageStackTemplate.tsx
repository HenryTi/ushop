import { FA } from "tonwa-react";
import { useNav } from "./nav";
import { Error } from "./Error";
import { PageBackProps, PageFooterProps, PageProps, PageTemplateProps } from "./PageProps";
import { usePageTemplate } from "./PageTemplate";
import "./tonwa-page.css";

const contentClassName = ' bg-white ';

function Back(props: PageBackProps) {
    let { back } = props;
    let pageNav = useNav();
    function onClickBack() {
        if (pageNav.data.stack.length === 1) {
            pageNav.navigate(-1 as any);
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

function Header(props: PageProps) {
    let { back, header, right, template: templateName } = props;
    let template = usePageTemplate(templateName);
    let { Back } = template;
    return <div>
        <div className="tonwa-page-container d-flex py-2 border-bottom align-items-center bg-light">
            <Back back={back} />
            <div className="flex-grow-1">{header}</div>
            <div className="mx-2">{right}</div>
        </div>
    </div>
}

function Footer(props: PageFooterProps) {
    return <div className="tonwa-page-container d-flex flex-column">
        {props.footer}
    </div>;
}

function Content(props: PageProps) {
    let { contentClassName, template: templateName } = props;
    let template = usePageTemplate(templateName);
    if (!contentClassName) {
        let { contentClassName: templateContentClassName } = template;
        contentClassName = templateContentClassName;
        if (!contentClassName) contentClassName = ' bg-white ';
    }
    return <div className={'tonwa-page-content tonwa-page-container ' + contentClassName}>
        {props.children}
    </div>;
}

export const appPageStackTemplate: PageTemplateProps = {
    Back,
    Header,
    Footer,
    Content,
    contentClassName,
    Error,
    errorPosition: 'under-header',
}
