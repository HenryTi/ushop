import { Context, FA, Form, NumSchema, Schema, StringSchema, UiButton, UiCheckItem, UiTextItem } from "tonwa-react";
import { VPage } from "../VPage";
import { CTagBase } from "./CTagBase";

export class VAddTag extends VPage<CTagBase> {
    header(): string | boolean | JSX.Element {
        return 'Add tag';
    }

    content(): JSX.Element {
        let schema: Schema = [
            { name: 'name', type: 'string', maxLength: 50, required: true } as StringSchema,
            { name: 'vice', type: 'string', maxLength: 100 } as StringSchema,
            { name: 'single', type: 'number' } as NumSchema,
            { name: 'submit', type: 'submit' }
        ];
        let uiSchema = {
            items: {
                name: {
                    widget: 'text',
                    label: 'Name',
                } as UiTextItem,
                vice: {
                    widget: 'text',
                    label: 'Discription',
                } as UiTextItem,
                single: {
                    widget: 'checkbox',
                    label: 'Singular',
                    defaultValue: 0,
                    trueValue: 1,
                    falseValue: 0,
                } as UiCheckItem,
                submit: {
                    widget: 'button',
                    label: <><FA name="floppy-o" /> Submit</>,
                    className: 'btn btn-primary',
                } as UiButton,
            }
        }
        return <div className="p-3">
            <Form schema={schema} uiSchema={uiSchema} fieldLabelSize={2}
                onButtonClick={this.onSave}
            />
        </div>;
    }

    private onSave = async (name: string, context: Context) => {
        await this.controller.onSaveTag(context.data);
    }
}