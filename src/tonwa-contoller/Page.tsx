import { ReactNode } from "react";
import { Scroller, TabsProps, Page as TonwaReactPage, LMR, FA } from "tonwa-react";
import { getAppBase } from "./AppBase";

interface PageProps {
    header?: string | boolean | JSX.Element;
    right?: JSX.Element;
    readonly children?: ReactNode | undefined;
    footer?: JSX.Element;
    back?: 'close' | 'back' | 'none';
    headerClassName?: string;
    className?: string;
    tabsProps?: TabsProps;

    logout?: boolean | (() => Promise<void>);
    onPageScroll?: (e: any) => void;
    onPageScrollTop?: (scroller: Scroller) => Promise<boolean>;
    onPageScrollBottom?: (scroller: Scroller) => Promise<void>;
}

export function Page(props: PageProps) {
    let { header, back, right, children, footer
        , headerClassName, className, tabsProps
        , logout, onPageScroll, onPageScrollTop, onPageScrollBottom } = props;
    if (!header) header = false;
    if (!back) back = 'back';
    if (children === undefined) {
        children = <div className="p-3">{header}</div>;
    }
    if (logout === undefined) {
        logout = false;
    }
    return <TonwaReactPage
        header={header} right={right} footer={footer}
        onScroll={(e: any) => onPageScroll(e)}
        onScrollTop={(scroller: Scroller) => onPageScrollTop(scroller)}
        onScrollBottom={(scroller: Scroller) => onPageScrollBottom(scroller)}
        back={back}
        headerClassName={headerClassName}
        className={className}
        tabsProps={tabsProps}
        logout={logout}
    >
        <Error />
        {children}
    </TonwaReactPage>;
}

function Error() {
    let app = getAppBase();
    let { error } = app.shallow;
    if (!error) return null;
    function openError() {
        let { error } = app.shallow;
        if (!error) return;
        app.shallow.error = null;
        app.open(<PError error={error} />);
    }
    let { name, message } = error;
    return <LMR className="border-bottom bg-light align-items-center text-muted mb-3"
        left={
            <div className="cursor-pointer px-3 py-2" onClick={() => app.setError(null)}>
                <FA name="times-circle" className="text-danger" size="lg" />
            </div>
        }
        right={<div className="cursor-pointer px-3 py-2" onClick={openError}><FA name="angle-right" /></div>}
    >
        {name} {message}
    </LMR>;
}

function PError(props: {
    error: {
        name: string;
        message: string;
        stack: string;
    }
}) {
    let { error } = props;
    let header = error.name;
    let { message, stack } = error;
    return <Page header={header}
        className="p-3" back="close" headerClassName="text-danger bg-warning bg-gradient">
        <div>{message}</div>
        <div>{stack}</div>
    </Page>
}

/*
protected internalAfterBack() {
if (!this.afterBack) return;
this.afterBack();
}
*/

    //callValue: any;
    //afterBack: () => void | Promise<void>;
/*
    protected onPageScroll(e: any) { }
    protected async onPageScrollTop(scroller: Scroller): Promise < boolean > { return false; }
    protected async onPageScrollBottom(scroller: Scroller): Promise < void> { return; }
    // protected afterBack(): void { }
    protected get back(): 'close' | 'back' | 'none' { return 'back' }
    protected get headerClassName(): string { return null; }
    protected get className(): string { return null; }
    protected get tabsProps(): TabsProps { return null; }
 }
*/
