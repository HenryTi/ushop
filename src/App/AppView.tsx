import React, { CSSProperties, useEffect } from "react";
import { } from "react-router-dom";
import { Link } from "react-router-dom";
//import { RoutedTabs, NavTab } from "react-router-tabs";
import { proxy, useSnapshot } from "valtio";

interface Item {
    key: string;
    value: JSX.Element;
}
const style: CSSProperties = { left: 0, top: 0, overflowX: 'hidden', overflowY: 'auto' };
function Container({ items }: { items: Item[] }) {
    let len = items.length;
    let cn = 'position-absolute w-100 h-100 ';
    return <div className="position-relative">
        {items.map((v, index) => (
            <div
                key={v.key}
                style={style}
                className={cn + (index === len - 1 ? 'visible' : 'invisible')}>
                {v.value}
            </div>
        ))}
    </div>;
}
/*
function UsersPage({ match }: { match: any }) {
    return (
        <div>
            <NavTab to="/admins">Admins</NavTab>
            <NavTab to="/moderators">Moderators</NavTab>
            <NavTab to="/users">Users</NavTab>

            <Routes>
                <Route
                    path={`${match.path}/*`}
                    element={<AppView />}
                />
                <Route path={`${match.path}/admins`} element={<AppView />} />
                <Route path={`${match.path}/moderators`} element={<View1 />} />
                <Route path={`${match.path}/users`} element={<View2 />} />
            </Routes>
        </div>
    );
};
*/
const stack = proxy<Item[]>([]);
const timer = proxy({ tick: 0 });
setInterval(() => {
    timer.tick++;
}, 2000);
//const container = <Container />;

function useContainer(key: string, el: JSX.Element) {
    let p = stack.findIndex(v => v.key === key);
    if (p >= 0) {
        stack.splice(p, 1);
    }
    stack.push({ key, value: el });
}

function AppViewR() {
    let t = useSnapshot(timer);
    useEffect(() => {
        console.log('build AppView');
    }, []);
    let arr = Array(50);
    return <div id="app">
        AppView {t.tick}
        {arr.fill(0).map((v, index) => {
            return (<br key={index} />);
        })}
        AppView {t.tick}
        AppView bootom
        <div>
            <Link to="view1">view1</Link>
        </div>
        <div>
            <Link to="view2">view2</Link>
        </div>
    </div>;
}

const appViewR = <AppViewR />;

export function AppView() {
    useContainer('app', appViewR);
    return <Container items={stack} />;
}

export function View1() {
    function onLink(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        //alert('view1');
        //evt.preventDefault();
    }
    let v = <div id="">
        View1
        <div>
            <Link to="/" onClick={onLink}>home</Link>
        </div>
    </div>;
    useContainer('view1', v);
    return <Container items={stack} />;
}

export function View2() {
    let v = <div>
        View2
        <div>
            <Link to="/">home</Link>
        </div>
    </div>;
    useContainer('view2', v);
    return <Container items={stack} />;
}

