import { closePage, Page, VPage } from "tonwa-controller";
import { BoolSchema, ButtonSchema, Context, Form, Schema, StringSchema, UiButton, UiCheckItem, UiSchema, UiTextAreaItem } from "tonwa-react";
import { Note, Person } from "uq-app/uqs/BzWorkshop";
import { CClientNotes } from "./CClientNotes";

export function PAddNote({ controller, client }: { controller: CClientNotes; client: Person; }) {
    let { firstName, lastName, no } = client;
    let header = <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;
    let onSubmit = async (name: string, context: Context): Promise<void> => {
        await controller.saveNote(client, context.data);
        closePage();
    }

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
    return <Page header={header}>
        <div className="p-3">
            <Form schema={schema} uiSchema={uiSchema} onButtonClick={onSubmit} />
        </div>
    </Page>;
}
