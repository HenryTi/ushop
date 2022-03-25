import { FA, LMR, Page as TonwaReactPage, Scroller, TabsProps } from "tonwa-react";
import { Controller } from "./Controller";
import { View } from "./View";

export abstract class VPage<C extends Controller = Controller, P = any> extends View<C, P> {
    header(): string | boolean | JSX.Element { return null; }
    right(): JSX.Element { return null; }
    content(): JSX.Element { return <div className="p-3">{this.header}</div>; }
    footer(): JSX.Element { return null; }
    logout(): boolean | (() => Promise<void>) { return false; }
    render(): JSX.Element {
        let header = this.header();
        if (!header) header = false;
        let logout = this.logout();
        return <TonwaReactPage
            header={header} right={this.right()} footer={this.footer()}
            onScroll={(e: any) => this.onPageScroll(e)}
            onScrollTop={(scroller: Scroller) => this.onPageScrollTop(scroller)}
            onScrollBottom={(scroller: Scroller) => this.onPageScrollBottom(scroller)}
            back={this.back}
            headerClassName={this.headerClassName}
            className={this.className}
            tabsProps={this.tabsProps}
            logout={logout}
        >
            {this.renderError()}
            {this.content()}
        </TonwaReactPage>;
        //afterBack={() => this.internalAfterBack()}
    }

    private renderError() {
        return this.react(() => {
            let { app } = this.controller;
            let { error } = app;
            if (!error) return null;
            let { name, message } = error;
            return <LMR className="border-bottom bg-light align-items-center text-muted mb-3"
                left={
                    <div className="cursor-pointer px-3 py-2" onClick={() => app.setError(null)}>
                        <FA name="times-circle" className="text-danger" size="lg" />
                    </div>
                }
                right={<div className="cursor-pointer px-3 py-2" onClick={this.controller.openError}><FA name="angle-right" /></div>}
            >
                {name} {message}
            </LMR>;
        });
    }
    /*
    protected internalAfterBack() {
        if (!this.afterBack) return;
        this.afterBack();
    }
    */

    callValue: any;
    //afterBack: () => void | Promise<void>;

    protected onPageScroll(e: any) { }
    protected async onPageScrollTop(scroller: Scroller): Promise<boolean> { return false; }
    protected async onPageScrollBottom(scroller: Scroller): Promise<void> { return; }
    // protected afterBack(): void { }
    protected get back(): 'close' | 'back' | 'none' { return 'back' }
    protected get headerClassName(): string { return null; }
    protected get className(): string { return null; }
    protected get tabsProps(): TabsProps { return null; }
}
