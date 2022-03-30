import { Error } from "./Error";
import { PageFooterProps, PageHeaderProps, PageProps, PageTemplateProps } from "./PageProps";
import { usePageTemplate } from "./PageTemplate";
import { Back } from "./BackTemplate";

const contentClassName = ' bg-white ';

function Header(props: PageHeaderProps) {
    let { back, header, right } = props;
    let { Back } = appTabsTemplate;
    return <div>
        <div className="d-flex py-2 border-bottom align-items-center bg-light">
            <Back back={back} />
            <div className="">{header}</div>
            <div className="ms-3">{right}</div>
        </div>
    </div>
}

function Footer(props: PageFooterProps) {
    return <div className="d-flex flex-column">
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
    return <div className={'tonwa-page-content ' + contentClassName}>
        {props.children}
    </div>;
}

export const appTabsTemplate: PageTemplateProps = {
    Back: Back,
    Header,
    Footer,
    Content,
    contentClassName,
    Error,
    errorPosition: 'above-header',
}
