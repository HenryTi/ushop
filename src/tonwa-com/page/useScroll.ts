import React, { useContext, useEffect, useRef } from "react";

export function useScroll() {
    let divRef = useRef();
    let inScroll = useContext(InScrollContext);
    useEffect(() => {
        if (inScroll !== true) return;
        let resize = () => {
            let el = divRef.current as HTMLElement;
            if (!el) { return; }
            let els = el.getElementsByClassName('tonwa-page-content');
            if (els.length === 0) return;
            let elContent = els[0];
            let elContainer = getTabContentElement(elContent); // elContent.parentElement;
            if (!elContainer) return;
            let h = elContainer.parentElement.clientHeight;
            if (h < 1) return;
            elContent.parentElement.childNodes.forEach(v => {
                if (v.nodeType === Node.ELEMENT_NODE) {
                    if (v === elContent) return;
                    h -= (v as HTMLElement).clientHeight;
                };
            });
            h -= (((el as Element)?.parentElement?.nextSibling as Element)?.clientHeight ?? 0);
            if (h < 10) return;
            (elContent as any).style.minHeight = (h - 2) + 'px';
        }
        window.addEventListener('resize', resize);
        window.addEventListener('DOMSubtreeModified', resize);
        resize();
        return function clean() {
            window.removeEventListener('resize', resize);
            window.removeEventListener('DOMSubtreeModified', resize);
        }
    }, [inScroll]);
    if (inScroll !== true) return;
    return divRef;
}

function getTabContentElement(el: Element) {
    for (let p = el; p; p = p.parentElement) {
        if ((p?.className ?? '').indexOf('tab-content') >= 0) {
            return p;
        }
    }
}

export const InScrollContext = React.createContext<boolean>(undefined);
