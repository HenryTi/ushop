import React, { SyntheticEvent } from "react";
import { getAppBase } from '..';

interface Props {
    promise: () => Promise<any>;
    //fallback: NonNullable<React.ReactNode> | null;
    children: React.ReactNode;
}

export function ClickSuspense({ promise, children }: Props): JSX.Element {
    //let [isLoading, setIsLoading] = useState<boolean>(undefined);
    React.Children.only(children);
    let arr = React.Children.toArray(children);
    let el0 = arr[0];
    if (!el0) return null;
    let { props } = el0 as any;
    if (!props) return <>{el0}</>;
    let { onClick } = props;
    if (onClick) {
        let el = el0 as JSX.Element;
        let newOnClick = async (evt: SyntheticEvent<any>) => {
            //setIsLoading(true);
            let waiting = beforeWaiting(evt.currentTarget);
            try {
                await promise();
                await onClick();
                afterWaiting(waiting);
            }
            catch (err) {
                afterWaiting(waiting);
                let app = getAppBase();
                app.setError(err);
            }

            //setIsLoading(false);
        };
        //if (isLoading === true) {
        //    return <>{fallback}</>;
        //}
        return React.createElement(
            el.type,
            { ...el.props, onClick: newOnClick },
            //el.props.children
        );
    }
    return <>{el0}</>;
}

function beforeWaiting(element: HTMLElement): { target: HTMLElement; el: HTMLDivElement; disabled: boolean; } {
    let width = element.offsetWidth;
    let height = element.offsetHeight;
    //let v = <div style={{ position: 'relative', left: 0, top: 0, width, height }}></div>;
    let disabled = (element as any).disabled;
    let style = element.getAttribute('style');
    (element as any).disabled = true;
    element.setAttribute('style', (style ?? '') + ' position: relative;');
    let elWaiting = document.createElement('div');
    elWaiting.setAttribute('style', `display:flex; z-index:30001; position: absolute; background: rgba(0, 0, 0, 0.1); left: 0; top: 0; width:${width}px; height:${height}px;align-items:center;justify-content:center;`);
    elWaiting.innerHTML = '<i class="fa fa-spinner fa-spin" />';
    element.appendChild(elWaiting);
    return { target: element, el: elWaiting, disabled };
}

function afterWaiting(waiting: { target: HTMLElement; el: HTMLDivElement; disabled: boolean; }) {
    let { target, el, disabled } = waiting;
    (target as any).disabled = disabled;
    target.removeChild(el);
}
