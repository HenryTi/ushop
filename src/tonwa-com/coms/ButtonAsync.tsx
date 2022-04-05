import React, { MouseEvent, MouseEventHandler } from "react";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
}

export function ButtonAsync(props: { onClick: (evt: MouseEvent<HTMLButtonElement>) => Promise<void> } & Props): JSX.Element {
    let { children, onClick } = props;
    let newOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
    if (onClick) {
        newOnClick = async (evt: MouseEvent<HTMLButtonElement>) => {
            let waiting = beforeWaiting(evt.currentTarget);
            try {
                await onClick(evt);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                afterWaiting(waiting);
            }
        };
    }
    return <button {...props} onClick={newOnClick}>{children}</button>;
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
    elWaiting.setAttribute('style', `display:flex; z-index:30001; position: absolute; background: rgba(0, 0, 0, 0.3); left: 0; top: 0; width:${width}px; height:${height}px;align-items:center;justify-content:center;`);
    elWaiting.innerHTML = '<i class="fa fa-spinner fa-spin" />';
    element.appendChild(elWaiting);
    return { target: element, el: elWaiting, disabled };
}

function afterWaiting(waiting: { target: HTMLElement; el: HTMLDivElement; disabled: boolean; }) {
    let { target, el, disabled } = waiting;
    (target as any).disabled = disabled;
    target.removeChild(el);
}
