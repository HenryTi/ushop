import { openPage, Page, useSnapshot, ClickSuspense } from "tonwa-controller";
import { ClearErrors, Clear, FormErrors, Form, Row, RowString, String, Submit, RowFormErrors, RowInt, RowCheck, Check, RowPick } from "tonwa-form";
import { RowRadio } from "tonwa-form/field/Radio";
import { Tick } from "./TabHome";

interface VTestProps {
    tick: Tick;
}

export function VTest({ tick }: VTestProps) {
    let promise = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(undefined);
            }, 2000);
        });
    }
    let onClick = () => {

    }
    return <>
        <TickTest tick={tick} />
        <div className="my-3">
            <ClickSuspense promise={promise}>
                <button onClick={onClick} className="btn btn-primary">button click waiting</button>
            </ClickSuspense>
        </div>
    </>;
}

function TickTest({ tick }: VTestProps) {
    let snap = useSnapshot(tick);
    return <div>
        vtest tick: {snap.count}
        <button onClick={() => openPage(<PTest tick={tick} />)}>test</button>
        <button onClick={() => tick.count++}>inc</button>
    </div>;
}

interface PTestProps {
    tick: Tick;
}
let id = 0;
function getId() {
    return ++id;
}
export function PTest({ tick }: PTestProps) {
    function Tick() {
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
        return <>
            <div>tick: {snap.count}</div>
            <div>{snap.list.map(({ id, name }) => <div key={id}>{name}</div>)}</div>
            <button onClick={onClick}>add</button>
            <button onClick={onRemoveClick}>remove 2</button>
        </>
    }
    function ruleB(v: any) {
        switch (v) {
            case 'bv1':
            case 'bv2': return;
            default: return 'val can only be bv1 or bv2';
        }
    }
    function ruleForm(v: any) {
        return;
        return [
            'err1',
            'err2',
        ]
    }
    return <Page header="PTest">
        <div>a</div>
        <div className="m-3">
            <Tick />
        </div>
        <Form onSubmit={data => alert(JSON.stringify(data))}
            className="m-3"
            rule={ruleForm}
        >
            <RowFormErrors />
            <Row label="a"><String name="a" memo={'bbbbddd dddd d'} /></Row>
            <RowString label="b" name="b" maxLength={5} placeholder="请输入b" rule={ruleB} />
            <RowInt label="int" name="c" placeholder="请输入整数" />
            <RowCheck label="确定吗？" name="d" />
            <Row>
                <Check label="确定d1" name="d1" className="form-check form-check-inline" />
                <Check label="确定d2" name="d2" className="form-check form-check-inline" />
                <Check label="确定d3" name="d3" className="form-check form-check-inline" />
            </Row>
            <RowInt label="int" name="e" placeholder="请输入整数" />
            <RowRadio label="radios" name="f" defaultValue={'2'}
                options={[{ label: 'a', value: '1' }, { label: 'b', value: '2' }]} />
            <RowPick label="点选ID" name="g" placeholder="点击选择ID" onPick={async () => { alert('a'); return 'id=3'; }} />
            <Row>
                <Submit className="btn btn-primary">Submit</Submit>
                <Clear className="ms-3 btn btn-outline-primary">Clear values</Clear>
                <ClearErrors className="ms-3 btn btn-outline-primary">Clear errors</ClearErrors>
            </Row>
        </Form>
    </Page >;
}

/*
function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
*/
