import React, { useEffect, useRef } from "react";

export function useScroll() {
    //return undefined;
    let divRef = useRef();
    //let inScroll = useContext(ScrollContext);
    useEffect(() => {
        //if (inScroll !== true) return;
        let resize = () => {
            let el = divRef.current as HTMLElement;
            if (!el) return;
            if (el.offsetParent === null) return;
            let els = el.getElementsByClassName('tonwa-page-content');
            if (els.length === 0) return;
            let elContent = els[0];
            let elContainer = getScrollContainer(elContent);
            if (!elContainer) return;
            let h = elContainer.clientHeight;
            if (h < 1) return;
            elContent.parentElement.childNodes.forEach(v => {
                if (v.nodeType === Node.ELEMENT_NODE) {
                    if (v === elContent) return;
                    h -= (v as HTMLElement).offsetHeight;
                };
            });
            let tabs = getPageTabsContainerFromScrollContainer(elContainer);
            if (tabs) h -= tabs.clientHeight;
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
    }, [/*inScroll*/]);
    //if (inScroll !== true) return;
    return divRef;
}

function getScrollContainer(el: Element) {
    for (let p = el; p; p = p.parentElement) {
        let { overflowY } = (p as HTMLElement).style;
        if (overflowY) return p;
    }
}

function getPageTabsContainerFromScrollContainer(scrollContainer: Element) {
    let el = scrollContainer.getElementsByClassName('nav nav-tabs position-sticky');
    if (el && el.length > 0) return el[0];
}

export const ScrollContext = React.createContext<'app-tabs' | 'page-tabs'>(undefined);
