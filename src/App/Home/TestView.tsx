//import { openPage, Page, useSnapshot, ClickSuspense } from "tonwa-controller";
import {
    ClearErrorsButton, ClearButton, Form
    , Band, BandString, String, SubmitButton, BandFormErrors, BandInt
    , BandCheck, Check, BandPick, BandSelect, BandDecimal
    , BandDatePicker, DatePicker, TimePicker, BandTextArea
    , LMR, List, wait, useNav, Page, ButtonAsync
} from "tonwa-com";
import { BandRadio } from "tonwa-com";
import { BandRange } from "tonwa-com";
import { Tick } from "./TabHome";
import { useRef } from "react";
import { proxy, ref, useSnapshot } from 'valtio';

interface VTestProps {
    tick: Tick;
}

export function TestView({ tick }: VTestProps) {
    let onClick = () => wait(2000);
    return <>
        <TickTest tick={tick} />
        <div className="my-3">
            <ButtonAsync onClick={onClick} className="btn btn-primary">
                button click waiting
            </ButtonAsync>
        </div>
    </>;
}

function TickTest({ tick }: VTestProps) {
    let nav = useNav();
    let snap = useSnapshot(tick);
    return <div>
        vtest tick: {snap.count}
        <button onClick={() => nav.open(<TestPage tick={tick} />)}>test</button>
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

export function TestPage({ tick }: PTestProps) {
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
        return [
            'err1',
            'err2',
        ]
    }
    let initValues = {
        a: 'ttt',
        f: 2,
        d0: 2,
        h: 5,
    }
    let options = [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 }
    ];
    function OptionItemView({ item }: { item: any; }) {
        let { label, value } = item;
        return <div className="d-flex px-2 py-2">
            <div className="bg-light me-5">{label}</div>
            <div>{value}</div>
        </div>
    }
    let { current: selectedItems } = useRef(proxy(ref([])));
    let selectedItemsSnapshot = useSnapshot(selectedItems);
    return <Page header="Test page">
        <div className="m-3">
            <Tick />
        </div>
        <LMR className="m-3 border p-3">
            <span>a</span>
            <div className="mx-3">2</div>
            <div className="text-center">b</div>
            <label>bbb</label>
        </LMR>
        <List items={options} keyName="value"
            ItemView={OptionItemView}
            onItemClick={async (item) => alert(JSON.stringify(item))}
            onItemSelect={(item, isSelected) => {
                if (isSelected === true)
                    selectedItems.push(ref(item));
                else {
                    let i = selectedItems.findIndex(v => v.value === item.value);
                    if (i >= 0) selectedItems.splice(i, 1);
                }
            }} />
        <div>
            <div>selectedItemsSnapshot</div>
            <List items={selectedItemsSnapshot} keyName="value" />
        </div>
        <Form className="m-3"
            rule={ruleForm}
            values={initValues}
        >
            <BandFormErrors />
            <Band label="a"><String name="a" memo={'bbbbddd dddd d'} readOnly={true} /></Band>
            <BandString label="b" name="b" maxLength={5} placeholder="请输入b" rule={ruleB} />
            <BandInt label="int" name="c" placeholder="请输入整数" max={5} />
            <BandCheck label="确定吗？" name="d" />
            <BandSelect label="确定Select" name="d0" options={options} />
            <Band>
                <Check label="确定d1" name="d1" className="form-check form-check-inline" />
                <Check label="确定d2" name="d2" className="form-check form-check-inline" />
                <Check label="确定d3" name="d3" className="form-check form-check-inline" />
            </Band>
            <BandDecimal label="decimal" name="e" placeholder="请输入数字" min={-30} />
            <BandRadio label="radios" name="f"
                options={options} />
            <BandPick label="点选ID" name="g" placeholder="点击选择ID" onPick={async () => { alert('a'); return 'id=3'; }} />
            <BandRange label="1-99" name="h" min={1} max={99} />
            <BandDatePicker label="日期" name="i" />
            <Band label="日期时间">
                <div className="input-group">
                    <DatePicker name="j" className="form-control w-max-12c" />
                    <TimePicker name="k" className="form-control w-max-8c" />
                </div>
            </Band>
            <BandTextArea label="文本" name="l" maxLength={20} rows={6} placeholder="输入不超过20字" />
            <Band>
                <SubmitButton className="btn btn-primary" onSubmit={async data => alert(JSON.stringify(data))}>Submit</SubmitButton>
                <ClearButton className="ms-3 btn btn-outline-primary">Clear values</ClearButton>
                <ClearErrorsButton className="ms-3 btn btn-outline-primary">Clear errors</ClearErrorsButton>
            </Band>
        </Form>
    </Page >;
}
