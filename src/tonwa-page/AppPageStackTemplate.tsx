import { FA } from "tonwa-react";
import { useNav } from "./nav";
import { Error } from "./Error";
import { PageBackProps, PageFooterProps, PageProps, PageTemplateProps } from "./PageProps";
import { usePageTemplate } from "./PageTemplate";
import "./tonwa-page.css";
import { Back } from "./BackTemplate";

const contentClassName = ' bg-white ';

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
    Back: Back,
    Header,
    Footer,
    Content,
    contentClassName,
    Error,
    errorPosition: 'under-header',
}
