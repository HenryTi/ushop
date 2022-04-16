import React, { ReactElement, ReactNode, useRef } from "react";
import { proxy, useSnapshot } from "valtio";
import { InScrollContext, useScroll } from "./useScroll";

interface TabObject {
    name: string;
    tag: string | JSX.Element;
    content: JSX.Element;
    mountable: boolean;         // 只有在点击tab之后，才初始化
}

interface TabProps {
    name: string;
    tag: string | JSX.Element;
    children: React.ReactNode;
}

export function Tab(props: TabProps): JSX.Element {
    return null;
}

function createTabsFromChildren(children: React.ReactNode, active: number) {
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
            mountable: false,
        };
        tabs.push(tab);
    });
    let tabActive = tabs[active];
    if (tabActive) {
        tabActive.mountable = true;
    }
    return tabs;
}

interface PageTabsProps {
    children: React.ReactNode;
}

export function PageTabs(props: PageTabsProps) {
    let upScroll = useScroll();
    let tabProxy = useRef(proxy({ active: 0 }));
    let { active } = useSnapshot(tabProxy.current);
    let { current: tabs } = useRef(createTabsFromChildren(props.children, active));
    function onTabClick(tabIndex: number) {
        tabProxy.current.active = tabIndex;
        let tab = tabs[tabIndex];
        if (!tab) return;
        tab.mountable = true;
    }
    function TabPane({ children, active }: { children: ReactNode; active: string; }) {
        let divRef = useScroll();
        return <div ref={divRef} className={'tab-pane ' + active}>
            {children}
        </div>
    }
    return <InScrollContext.Provider value={upScroll === undefined}>
        <div className="flex-grow-1 d-flex flex-column" style={{ overflowY: 'scroll', }}>
            <div className="tonwa-page-content tab-content flex-grow-1">
                {
                    tabs.map((v, index) => {
                        let { name, mountable, content } = v;
                        if (mountable === false) return null;
                        return <TabPane key={name} active={active === index ? 'active' : ''}>
                            {content}
                        </TabPane>;
                    })
                }
            </div>
            <ul className="nav nav-tabs position-sticky tonwa-page-container justify-content-evenly bg-light" style={{ bottom: '0' }}>
                {tabs.map((v, index) => <li key={v.name} className="nav-item flex-fill align-self-stretch">
                    <div
                        onClick={() => onTabClick(index)}
                        className={'nav-link h-100 p-0 ' + (index === active ? 'active' : 'cursor-pointer')}>
                        {v.tag}
                    </div>
                </li>)}
            </ul>
        </div>
    </InScrollContext.Provider>;
}

function invariant(condition: boolean, message: string): asserts condition {
    if (!condition) throw new Error(message);
}
