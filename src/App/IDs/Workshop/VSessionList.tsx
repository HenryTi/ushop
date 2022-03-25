import { FA, List, LMR } from "tonwa-react";
import { renderDate } from "../../tool";

export function VSessionList() {
    let renderItem = (item: any, index: number) => {
        let { date, vice, time, span } = item;
        return <div className="px-3 py-2">
            <div>
                <div>
                    {renderDate(date)} &nbsp; &nbsp;
                    start at {time} &nbsp; &nbsp;
                    for {span} minutes &nbsp; &nbsp;
                </div>
                <div>{vice}</div>
            </div>
        </div>;
    }
    let onAdd = (): void => {
    }
    let onEditItem = (item: any): void => {
    }
    let data: any;
    let right = <span className="text-success cursor-pointer" onClick={onAdd}>
        <FA name="plus" fixWidth={true} />
    </span>;
    return <>
        <LMR right={right} className="px-3 py-1 small text-muted">
            Sessions
        </LMR>
        <List items={data.list} className="my-1"
            item={{ render: renderItem, onClick: onEditItem }}
            none={<small className=" px-3 py-2 text-muted">Click {right} to add session</small>} />
    </>;
}
