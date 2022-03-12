import { AppBase, VPage, shallowReact } from "tonwa-contoller";
import { FieldRule, ItemSchema, Pick, UiItem } from "tonwa-react";
import { Controller } from "../Controller";
import { VEditIcon, VRef } from "./VRef";

export interface EditProps {
    readonly itemSchema: ItemSchema;
    readonly uiItem: UiItem;
    readonly onChanged: (name: string, value: any) => Promise<void>;
    readonly value: any;
    readonly pick?: Pick;
    readonly exView?: JSX.Element;      // can add extra action or message on the bottom of page
}

export abstract class CEdit extends Controller {
    readonly props: EditProps;
    readonly shallowValue: {
        value: any;
    };
    constructor(nav: AppBase, props: EditProps) {
        super(nav);
        this.props = props;
        this.shallowValue = shallowReact({ value: props.value })
    }

    renderRef(): JSX.Element { return this.render(VRef); }

    get label(): string | JSX.Element {
        let { itemSchema, uiItem } = this.props;
        return uiItem?.label ?? itemSchema.name;
    }

    renderEditIcon() { return this.render(VEditIcon); }

    verifyValue(value: any): string {
        let { uiItem } = this.props;
        if (uiItem === undefined) return;
        let { rules } = uiItem;
        if (rules === undefined) return;
        function verifyRule(rule: FieldRule, v: any): string {
            let error = rule(v);
            if (error !== undefined) {
                if (typeof error !== 'object')
                    return error;
                else
                    return JSON.stringify(error);
            }
        }
        if (Array.isArray(rules)) {
            for (let rule of rules) {
                let error = verifyRule(rule as FieldRule, value);
                if (error !== undefined) {
                    return error;
                }
            }
        }
        else {
            return verifyRule(rules as FieldRule, value);
        }
    }

    get Page(): new (c: CEdit) => VPage<CEdit> { return undefined; }

    onEdit = () => {
        this.open(this.Page);
    }
}
