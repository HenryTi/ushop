import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { Controller } from "./Controller";

export class View<C extends Controller = any, P = any> {
    protected readonly controller: C;
    protected readonly props: P;

    constructor(controller: C, props: P = undefined) {
        this.controller = controller;
        this.props = props;
    }

    render(): JSX.Element {
        return null
    }

    protected react(func: () => JSX.Element): JSX.Element {
        let V = observer(func);
        return <V />;
    }

    protected res(t: string): string | JSX.Element {
        return t;
    }

    async confirm(msg: string): Promise<boolean> {
        return window.confirm(msg);
    }

    renderAdmin(el: JSX.Element | (() => JSX.Element)): JSX.Element {
        if (typeof (el) === 'function') el = el();
        return this.controller.app.renderAdmin(el);
    }
    renderRole(el: JSX.Element | (() => JSX.Element), ...roles: number[]): JSX.Element {
        if (typeof (el) === 'function') el = el();
        return this.controller.app.renderRole(el, ...roles);
    }
    renderAdminOrRole(el: JSX.Element | (() => JSX.Element), ...roles: number[]): JSX.Element {
        if (typeof (el) === 'function') el = el();
        return this.controller.app.renderAdminOrRole(el, ...roles);
    }

    waitingEvent<P, E extends SyntheticEvent<any>>(evt: E, handler: (params?: P) => Promise<void>, params?: P) {
        let waiting = this.beforeWaiting(evt.currentTarget);
        try {
            handler(params).then(() => {
                this.afterWaiting(waiting);
            }).catch(reason => {
                this.afterWaiting(waiting);
                this.controller.app.setError(reason);
            });
        }
        catch (err) {
            this.controller.app.setError(err as any);
        }
    }

    private beforeWaiting(element: HTMLElement): { target: HTMLElement; el: HTMLDivElement; disabled: boolean; } {
        let width = element.offsetWidth;
        let height = element.offsetHeight;
        //let v = <div style={{ position: 'relative', left: 0, top: 0, width, height }}></div>;
        let disabled = (element as any).disabled;
        let style = element.getAttribute('style');
        (element as any).disabled = true;
        element.setAttribute('style', (style ?? '') + ' position: relative;');
        let elWaiting = document.createElement('div');
        elWaiting.setAttribute('style', `display:flex; position: absolute; opacity:0.5; left: 0; top: 0; width:${width}px; height:${height}px;align-items:center;justify-content:center;`);
        elWaiting.innerHTML = '<i class="fa fa-spinner fa-spin" />';
        element.appendChild(elWaiting);
        return { target: element, el: elWaiting, disabled };
    }

    private afterWaiting(waiting: { target: HTMLElement; el: HTMLDivElement; disabled: boolean; }) {
        let { target, el, disabled } = waiting;
        (target as any).disabled = disabled;
        target.removeChild(el);
    }
}
