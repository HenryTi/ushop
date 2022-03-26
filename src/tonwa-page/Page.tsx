import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { useNav } from "./nav";
import { PageProps } from "./PageProps";
import { usePageTemplate } from "./PageTemplate";
import { ScrollContext, useScroll } from "./useScroll";

// unanthorized page
export function UPage(props: PageProps) {
    let scrollContext = useContext(ScrollContext);
    let divRef = useScroll();
    let { children, header, back, right, footer, template: templateName } = props;
    let template = usePageTemplate(templateName);
    if (header || back || right) {
        let { Header } = props;
        if (!Header) {
            let { Header: TemplateHeader } = template;
            Header = TemplateHeader;
        }
        header = <Header header={header} back={back} right={right} />;
    }
    if (footer) {
        let { Footer } = props;
        if (!Footer) {
            let { Footer: TemplateFooter } = template;
            Footer = TemplateFooter;
        }
        footer = <Footer footer={footer} />;
    }
    let { Content } = props;
    if (!Content) {
        let { Content: TemplateContent } = template;
        Content = TemplateContent;
    }
    header = header && <div className="position-sticky" style={{ top: '0' }}>{header}</div>;
    let { errorPosition, Error } = template;
    switch (errorPosition) {
        case 'above-header':
            header = <>{<Error template={templateName} />}{header}</>
            break;
        case 'under-header':
            header = <>{header}{<Error template={templateName} />}</>
            break;
    }
    return <div ref={divRef} className={'flex-grow-1 ' + scrollContext ? '' : 'overflow-auto'}>
        {header}
        <Content {...props}>{children}</Content>
        {footer && <div className="position-sticky" style={{ bottom: '0' }}>{footer}</div>}
    </div>;
}

export function Page(props: PageProps) {
    let nav = useNav();
    let { user } = useSnapshot(nav.appNav.response);
    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }
    return <UPage {...props} />;
}
