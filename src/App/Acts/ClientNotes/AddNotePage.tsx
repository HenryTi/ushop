import { Band, BandCheck, BandTextArea, Form, Page, Submit, useNav } from "tonwa-com";
import { Note, Person } from "uqs/BzWorkshop";

export function AddNotePage({ client }: { client: Person; }) {
    let nav = useNav();
    let { firstName, lastName, no } = client;
    let header = <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;
    let onSubmit = async (data: Note): Promise<void> => {
        //await controller.saveNote(client, context.data);
        nav.close();
    }

    return <Page header={header}>
        <div className="p-3">
            <Form>
                <BandTextArea label='Note' name='note' rows={10} placeholder="input note here" />
                <BandCheck label="Sensitive" name="sensitive" />
                <Band>
                    <Submit onSubmit={onSubmit} />
                </Band>
            </Form>
        </div>
    </Page>;
}
