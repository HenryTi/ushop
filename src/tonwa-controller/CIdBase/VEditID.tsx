import { createEdit } from "../CEdit";
// import { VTagInput } from "tonwa-controller/CTagBase/VTagInput";
import { LMR, Pick } from "tonwa-react";
import { UqID } from "./UqID";

//const cnRow = 'px-3 py-2 bg-white border-bottom cursor-pointer';

export interface VEditIDProps<UQ extends UqID = UqID> {
    uqID: UQ;
    schema: any[];
    uiSchema: any;
}

export function VEditID(props: VEditIDProps) {
    let { uqID, schema, uiSchema } = props;
    let { currentItem } = uqID.state;
    if (!uiSchema) {
        uiSchema = { items: {} };
    }
    let propValueSave = async (propName: string, value: any) => {
        await uqID.savePropValue(propName, value);
    }
    return <>{schema.map((v: any, index: number) => {
        let { name } = v;
        let uiItem = uiSchema.items[name];
        let label: string | JSX.Element;
        let readOnly: boolean;
        let pick: Pick;
        if (uiItem) {
            label = uiItem.label ?? name;
            readOnly = uiItem.readOnly;
            pick = (uiItem as any).pick;
        }
        else {
            label = name;
            readOnly = false;
        }
        let value = currentItem[name];
        let cEdit = createEdit({
            pick,
            itemSchema: v,
            uiItem,
            value,
            onChanged: propValueSave
        });
        let right = cEdit.renderEditIcon();
        let onEdit: any;
        let cn = 'mb-3 row bg-white align-items-center ';
        if (readOnly === true) {
            onEdit = undefined;
        }
        else {
            onEdit = cEdit.onEdit;
            cn += 'cursor-pointer ';
        }
        return <div key={index} onClick={onEdit}
            className={cn}>
            <label className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                <LMR right={readOnly !== true && right}>
                    {cEdit.renderRef()}
                </LMR>
            </div>
        </div>;
    })}</>;
    /*
    protected renderTagInput() {
        //let vTagInput = this.controller.tagGroupName .renderTagInput();
        //if (!vTagInput) return null;
        let { tagGroupName } = this.controller;
        if (!tagGroupName) return null;
        return <div className="my-3 border rounded-3 pt-2">
            <div className="px-3 pb-2 small text-muted">Tags</div>
            <VTagInput tagGroupName={tagGroupName} tagId={undefined} />
        </div>;
    }
    */
}
