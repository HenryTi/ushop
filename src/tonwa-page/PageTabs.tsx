import React, { ReactElement, useRef } from "react";
import { proxy, useSnapshot } from "valtio";
import { ScrollContext, useScroll } from "./useScroll";

interface TabObject {
    name: string;
    tag: string | JSX.Element;
    content: JSX.Element;
}

interface TabProps {
    name: string;
    tag: string | JSX.Element;
    children: React.ReactNode;
}

export function Tab(props: TabProps): JSX.Element {
    return null;
}

function createTabsFromChildren(children: React.ReactNode) {
    let tabs: TabObject[] = [];
    React.Children.forEach(children, (element) => {
        if (React.isValidElement(element) === false) return;
        let elType = (element as any).type;
        if (elType === React.Fragment) return;
        if (elType !== Tab) return;
        invariant(elType === Tab,
            `[${typeof elType === "string" ? elType : elType.name
            }] is not a <Tab> component. All component children of <PageTabs> must be a <Tab>`
        );
        let { props } = element as ReactElement;
        let tab: TabObject = {
            name: props.name,
            tag: props.tag,
            content: <>{props.children}</>,
        };
        tabs.push(tab);
    });
    return tabs;
}

interface PageTabsProps {
    children: React.ReactNode;
}

export function PageTabs(props: PageTabsProps) {
    let divRef = useScroll();
    let { current: tabs } = useRef(createTabsFromChildren(props.children));
    let tabProxy = useRef(proxy({ active: 0 }));
    let { active } = useSnapshot(tabProxy.current);
    return <ScrollContext.Provider value={true}>
        <div className="flex-grow-1 d-flex flex-column" style={{ overflowY: 'scroll' }}>
            <div ref={divRef} className="tonwa-page-content tab-content flex-grow-1">
                {tabs.map((v, index) => <div key={v.name}
                    className={'tab-pane ' + (active === index ? 'active' : '')}>
                    {v.content}
                </div>)}
            </div>
            <ul className="nav nav-tabs position-sticky tonwa-page-container justify-content-evenly bg-light" style={{ bottom: '0' }}>
                {tabs.map((v, index) => <li key={v.name} className="nav-item flex-fill align-self-stretch">
                    <div
                        onClick={() => tabProxy.current.active = index}
                        className={'nav-link h-100 p-0 ' + (index === active ? 'active' : 'cursor-pointer')}>
                        {v.tag}
                    </div>
                </li>)}
            </ul>
        </div>
    </ScrollContext.Provider>;
}

function invariant(condition: boolean, message: string): asserts condition {
    if (!condition) throw new Error(message);
}
