import { Context, FA, Form, Schema, StringSchema, UiButton, UiTextItem } from "tonwa-react";
import { Page } from "../Page";
import { closePage } from "../openPage";
import { UqTag, Tag } from "./UqTag";

interface Props {
    uqTag: UqTag;
}

export function PAddTagItem({ uqTag }: Props) {
    let onSave = async (name: string, context: Context) => {
        //await this.controller.onSaveTagItem(context.data);
        let tagItem: Tag = context.data;
        await uqTag.saveTagItem(tagItem);
        /*
        let ret = await this.uq.ActIX<Tag>({
            IX: this.IxTag,
            ID: this.TagItem,
            values: [{ ix: this.deep.currentTag.id, xi: tag }]
        });
        tag.id = ret[0];
        uqTag.resetGroups();
        uqTag.items.push(tag);
        */
        closePage();
    }

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
    return <Page header="Add tag">
        <div className="p-3">
            <Form schema={schema} uiSchema={uiSchema} fieldLabelSize={2}
                onButtonClick={onSave}
            />
        </div>
    </Page>;
}
