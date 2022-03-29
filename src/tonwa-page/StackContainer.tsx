import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import { Nav, PageStackContext, StackItem, TabItem, useAppNav, useTabNav } from "./nav";

export function StackContainer({ stackItems: stackItems }: { active?: string; stackItems: readonly StackItem[] }) {
    let last = stackItems.length - 1;
    let cn = 'tab-pane flex-column flex-grow-1 overflow-hidden ';
    return <div className="tab-content d-flex flex-column flex-grow-1 overflow-hidden">
        {
            stackItems.map((item, index) => {
                let { name, page } = item;
                return (<div className={cn + ((index === last ? 'active d-flex' : ''))} key={name}>
                    <PageStack>{page}</PageStack>
                </div>);
            })
        }
    </div>;
}

function PageStack({ children }: { children: React.ReactNode }) {
    let appNav = useAppNav();
    let tabNav = useTabNav();
    let nav = useRef(new Nav(appNav, tabNav, children));
    let { data } = nav.current;
    let snapshot = useSnapshot(data);
    let { stack: snapshotStack } = snapshot;
    let len = snapshotStack.length;
    let last = len - 1;
    const flexFill = 'flex-column flex-grow-1 overflow-hidden '
    return <PageStackContext.Provider value={nav.current}>
        {snapshotStack.map((v, index) => {
            let { pageId, page } = v;
            return <div key={pageId} className={flexFill + (index < last ? 'd-none' : 'd-flex')}>
                {page}
            </div>
        })}
    </PageStackContext.Provider>;
}
