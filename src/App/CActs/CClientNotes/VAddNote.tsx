import { VPage } from "tonwa-controller";
import { BoolSchema, ButtonSchema, Context, Form, Schema, StringSchema, UiButton, UiCheckItem, UiSchema, UiTextAreaItem } from "tonwa-react";
import { CClientNotes } from ".";

export class VAddNote extends VPage<CClientNotes> {
    header(): string | boolean | JSX.Element {
        let { firstName, lastName, no } = this.props;
        return <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;
    }

    content(): JSX.Element {
        let schema: Schema = [
            { name: 'note', type: 'string' } as StringSchema,
            { name: 'sensitive', type: 'boolean' } as BoolSchema,
            { name: 'submit', type: 'submit' } as ButtonSchema,
        ];
        let uiSchema: UiSchema = {
            items: {
                note: { widget: 'textarea', placeholder: 'input note here', label: 'Note', rows: 10 } as UiTextAreaItem,
                sensitive: { widget: 'checkbox', label: 'Sensitive', align: 'start' } as UiCheckItem,
                submit: { widget: 'button', className: 'btn btn-primary', label: 'Submit' } as UiButton,
            }
        };
        return <div className="p-3">
            <Form schema={schema} uiSchema={uiSchema} onButtonClick={this.onSubmit} />
        </div>
    }

    private onSubmit = async (name: string, context: Context): Promise<void> => {
        await this.controller.saveNote(this.props, context.data);
        this.controller.close();
    }
}