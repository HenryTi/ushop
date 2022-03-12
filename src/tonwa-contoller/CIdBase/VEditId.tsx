import { createEdit, setReact } from "tonwa-contoller";
import { LMR, Pick } from "tonwa-react";
import { VPage } from "../VPage";
import { CIdBase } from "./CIdBase";

//const cnRow = 'px-3 py-2 bg-white border-bottom cursor-pointer';

export class VEditId<C extends CIdBase = any> extends VPage<C> {
    header(): string | boolean | JSX.Element {
        return this.controller.caption + ' ' + this.controller.deepData.currentItem.no;
    }

    protected renderProps() {
        return this.react(() => {
            let { schema, uiSchema, deepData } = this.controller;
            let { currentItem } = deepData;
            if (!uiSchema) {
                uiSchema = { items: {} };
            }
            let vProps = schema.map((v, index) => {
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
                let cEdit = createEdit(this.controller.app, {
                    pick,
                    itemSchema: v,
                    uiItem,
                    value,
                    onChanged: this.propValueSave
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
                </div>
            });
            return <div className="container">{vProps}</div>;
        });
    }

    content() {
        return <div className="py-3">
            {this.renderProps()}
            {this.renderTagInput()}
        </div>
    }

    private propValueSave = async (name: string, value: any) => {
        let { deepData } = this.controller;
        await this.controller.savePropValue(deepData.currentItem.id, name, value);
        setReact(() => {
            deepData.currentItem[name] = value;
        });
    }

    protected renderTagInput() {
        let vTagInput = this.controller.renderTagInput();
        if (!vTagInput) return null;
        return <div className="my-3 border rounded-3 pt-2">
            <div className="px-3 pb-2 small text-muted">Tags</div>
            {vTagInput}
        </div>;
    }
}
