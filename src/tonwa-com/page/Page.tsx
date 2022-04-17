import { FA } from "tonwa-com";
import { useSnapshot } from "valtio";
import { useAppNav, useNav } from "./nav";
import { PageProps } from "./PageProps";
import { usePageTemplate } from "./PageTemplate";
import { useScroll } from "./useScroll";
import 'font-awesome/css/font-awesome.min.css';
//import { useContext } from "react";

// unanthorized page
export function UPage(props: PageProps) {
    let divRef = useScroll();
    let { children, header, back, right, footer, template: templateName, id } = props;
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
    header = header && <div className="position-sticky tonwa-page-header" style={{ top: 0, zIndex: 9999 }}>{header}</div>;
    let { errorPosition, Error } = template;
    switch (errorPosition) {
        case 'above-header':
            header = <>{<Error template={templateName} />}{header}</>
            break;
        case 'under-header':
            header = <>{header}{<Error template={templateName} />}</>
            break;
    }
    //let cnPage = '-inner-page d-flex flex-grow-1 flex-column';
    return <div ref={divRef} className="-inner-page" id={id}>
        {header}
        <Content {...props}>{children}</Content>
        {footer && <div className="tonwa-page-footer" style={{ position: 'sticky', bottom: '0px' }}>{footer}</div>}
    </div>;
}

export function Page(props: PageProps) {
    let appNav = useAppNav();
    let { isLogined } = useSnapshot(appNav.response);
    if (isLogined !== true) {
        return <Unanthorized />;
    }
    return <UPage {...props} />;
}

function Unanthorized() {
    let nav = useNav();
    return <div className="p-3">
        <div className="mb-3">
            <FA name="ban" className="text-danger me-3" />
            not logined, can not show a {'<Page />'}, try {'<UPage />'}.
        </div>
        <div>
            <button className="btn btn-outline-primary" onClick={() => nav.close()}><FA name="angle-left" /></button>
        </div>
    </div>;
}
