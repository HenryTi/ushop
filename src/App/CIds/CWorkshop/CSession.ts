import { IdValue, setReact } from "tonwa-contoller";
import { Uq, ID } from "tonwa-uq";
import { Schema, UiDate, UiNumberItem, UiSchema, UiTextItem, UiTime } from "tonwa-react";
import { Session } from "uq-app/uqs/BzWorkshop";
import { CWorkshop } from "../../CIds";
import { CId } from "../CId";
import { renderSessionItem, VSessionList } from "./VSessionList";

export class CSession extends CId {
    readonly cWorkshop: CWorkshop;
    readonly tick: number;
    constructor(cWorkshop: CWorkshop) {
        super(cWorkshop.cIds);
        this.cWorkshop = cWorkshop;
        this.tick = Date.now();
        let { fields } = this.uqs.BzWorkshop.Session.ui;
        fields['date'].required = true;
        fields['time'].required = true;
        fields['span'].required = true;
    }

    get uq(): Uq {
        return this.uqs.BzWorkshop;
    }
    getID(): ID {
        return this.uqs.BzWorkshop.Session;
    }
    get caption(): string {
        return 'Session';
    }
    get schema(): Schema {
        return this.uqs.BzWorkshop.Session.ui.fieldArr;
    }
    get uiSchema(): UiSchema {
        return {
            items: {
                date: {
                    widget: 'date',
                    label: 'Date',
                } as UiDate,
                vice: {
                    widget: 'text',
                    label: 'Discription',
                } as UiTextItem,
                time: {
                    widget: 'time',
                    label: 'Time',
                } as UiTime,
                span: {
                    widget: 'number',
                    label: 'Duration',
                } as UiNumberItem,
                submit: {
                    "label": "Save Session",
                    "widget": "button",
                    "className": "btn btn-primary",
                }
            }
        };
    }
    protected async loadList(): Promise<any[]> {
        let { deepData } = this.cWorkshop;
        let { currentItem } = deepData;
        if (!currentItem) {
            debugger;
            return undefined;
        }
        let { BzWorkshop } = this.uqs;
        let { id } = currentItem;
        let ret = await BzWorkshop.QueryID<Session>({
            IX: [BzWorkshop.IxWorkshopSession],
            IDX: [BzWorkshop.Session],
            ix: id,
        });
        return ret;
    }
    protected async saveId(data: any): Promise<number> {
        let { BzWorkshop } = this.uqs;
        let { deepData } = this.cWorkshop;
        let { currentItem } = deepData;
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxWorkshopSession,
            ID: BzWorkshop.Session,
            values: [
                {
                    ix: currentItem.id,
                    xi: data,
                }
            ]
        });
        let id = ret[0];
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxSessionStaff,
            values: [
                { ix: id, xi: currentItem.staff }
            ]
        })
        setReact(() => {
            data.id = id;
            let { list } = this.deepData;
            list.push(data);
        });
        return id;
    }

    renderItemInList(item: Session): JSX.Element {
        return renderSessionItem(item);
    }

    renderList(): JSX.Element {
        return this.render(VSessionList);
    }

    renderIdValue(idValue: IdValue): JSX.Element {
        return renderSessionItem(idValue as Session);
    }
}
