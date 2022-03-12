import { openPage, Page, useSnapshot } from "tonwa-contoller";
import { Tick } from "./CHome";

interface VTestProps {
    tick: Tick;
}

export function VTest({ tick }: VTestProps) {
    let snap = useSnapshot(tick);
    return <div>
        vtest tick: {snap.count}
        <button onClick={() => openPage(<PTest tick={tick} />)}>test</button>
        <button onClick={() => tick.count++}>inc</button>
    </div>
}

interface PTestProps {
    tick: Tick;
}
let id = 0;
function getId() {
    return ++id;
}
export function PTest({ tick }: PTestProps) {
    let snap = useSnapshot(tick);
    function onClick() {
        ++tick.count;
        let id = getId();
        tick.list.push({ id, name: 'a' + id });
    }
    function onRemoveClick() {
        let { list } = tick;
        list.splice(2, 1);
    }
    return <Page header="PTest">
        <div>
            <div>tick: {snap.count}</div>
            <div>{snap.list.map(({ id, name }) => <div key={id}>{name}</div>)}</div>
            <button onClick={onClick}>add</button>
            <button onClick={onRemoveClick}>remove 2</button>
        </div>
    </Page>;
}

/*
function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
*/
