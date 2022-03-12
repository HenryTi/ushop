import { Context, FA, Form, Schema, StringSchema, UiButton, UiTextItem } from "tonwa-react";
import { VPage } from "../VPage";
import { CTagBase } from "./CTagBase";

export class VAddTagItem extends VPage<CTagBase> {
    header(): string | boolean | JSX.Element {
        return 'Add tag';
    }

    content(): JSX.Element {
        let schema: Schema = [
            { name: 'name', type: 'string', maxLength: 50, required: true } as StringSchema,
            { name: 'submit', type: 'submit' }
        ];
        let uiSchema = {
            items: {
                name: {
                    widget: 'text',
                    label: 'Name',
                } as UiTextItem,
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
        await this.controller.onSaveTagItem(context.data);
    }
}