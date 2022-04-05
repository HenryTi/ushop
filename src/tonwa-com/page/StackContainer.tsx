import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import { Nav, PageStackContext, StackItem, useAppNav, useTabNav } from "./nav";

export function StackContainer({ active, stackItems }: { active?: string; stackItems: readonly StackItem[] }) {
    let last = stackItems.length - 1;
    return <>
        {
            stackItems.map((item, index) => {
                let { key: name, page } = item;
                let display: boolean;
                if (active) {
                    display = active === name;
                }
                else {
                    display = index === last;
                }
                return <Stack key={name} display={display}>{page}</Stack>;
            })
        }
    </>;
}

function Stack({ display, children }: { display: boolean; children: React.ReactNode; }) {
    let appNav = useAppNav();
    let tabNav = useTabNav();
    let nav = useRef(new Nav(appNav, tabNav, children));
    let { data } = nav.current;
    let snapshot = useSnapshot(data);
    let { stack: snapshotStack } = snapshot;
    let len = snapshotStack.length;
    let last = len - 1;
    const flexFill = '-page-stack-layer flex-column flex-grow-1 overflow-hidden '
    return <PageStackContext.Provider value={nav.current}>
        {snapshotStack.map((v, index) => {
            let { key: pageKey, page } = v;
            return <div key={pageKey} className={flexFill + (display === true && index === last ? 'd-flex' : 'd-none')}>
                {page}
            </div>
        })}
    </PageStackContext.Provider>;
}
