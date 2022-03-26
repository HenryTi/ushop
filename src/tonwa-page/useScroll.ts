import React, { useLayoutEffect, useRef } from "react";

export function useScroll() {
    let divRef = useRef();
    useLayoutEffect(() => {
        function resize() {
            let el = divRef.current as HTMLElement;
            let els = el.getElementsByClassName('tonwa-page-content');
            let elContent = els[0];
            if (!elContent) return;
            let elContainer = elContent.parentElement;
            let h = elContainer.clientHeight;
            elContainer.childNodes.forEach(v => {
                if (v.nodeType === Node.ELEMENT_NODE) {
                    if (v === elContent) return;
                    h -= (v as HTMLElement).clientHeight;
                };
            });
            (elContent as any).style.minHeight = h + 'px';
        }
        window.addEventListener('resize', resize);
        window.addEventListener('DOMSubtreeModified', resize);
        resize();
        return function clean() {
            window.removeEventListener('resize', resize);
            window.removeEventListener('DOMSubtreeModified', resize);
        }
    }, [divRef]);
    return divRef;
}

export const ScrollContext = React.createContext<boolean>(true);