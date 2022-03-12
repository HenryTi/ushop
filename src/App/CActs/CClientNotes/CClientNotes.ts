import { CClient } from "../../CIds";
import { deepReact, setReact } from "tonwa-contoller";
import { Note, Person, SessionPerson } from "uq-app/uqs/BzWorkshop";
import { CAct } from "../CAct";
import { VAddNote } from "./VAddNote";
import { VClient } from "./VClient";
import { VStart } from "./VStart";

export class CClientNotes extends CAct {
    readonly deepData: {
        notes: (Note | SessionPerson)[];
        clients: Person[];
    } = deepReact({
        notes: null,
        clients: null,
    });
    cClient: CClient;

    async openMain(): Promise<void> {
        let { cClient } = this.app.cIds;
        this.cClient = cClient;
        await this.loadClients();
        this.open(VStart);
    }

    private async loadClients() {
        let { BzWorkshop } = this.uqs;
        //let { UserObject, IxStaffClient, Person } = BzWorkshop;
        let ret = await BzWorkshop.MyClients.query({});
        /*
        let ret = await BzWorkshop.QueryID<Person>({
            IX: [UserObject, IxStaffClient],
            IDX: [Person],
        });*/
        setReact(() => {
            this.deepData.clients = ret.ret;
        });
    }

    showClient = async (client: Person) => {
        let { BzWorkshop } = this.uqs;
        /*
        let ret = await BzWorkshop.QueryID<Note>({
            IX: [BzWorkshop.IxPersonLog],
            ix: client.id,
            IDX: [BzWorkshop.Note],
            order: 'desc'
        });
        */
        //let ret = await BzWorkshop.GetPersonLog.query({ person: client.id });
        let ret = await BzWorkshop.IXValues({
            IX: BzWorkshop.IxPersonLog,
            ix: client.id,
            order: 'desc',
        })
        let notes: any[] = [];
        for (let row of ret) {
            let { type, value } = row;
            let obj: any = BzWorkshop.IDValue(type, value);
            if (obj !== undefined) {
                obj['$type'] = type;
                notes.push(obj);
            }
        }
        setReact(() => {
            this.deepData.notes = notes;
        });
        this.open(VClient, client);
    }

    showAddNote = (client: Person) => {
        this.open(VAddNote, client);
    }

    saveNote = async (client: Person, data: any) => {
        let note: Note = {
            id: undefined,
            staff: 10,
            client: client.id,
            note: data.note,
            sensitive: data.sensitive === true ? 1 : 0,
        };
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.SaveNote.submitReturns(note as any);
        note.id = ret.ret[0].id;
        (note as any)['$type'] = 'note';
        setReact(() => {
            let { notes, clients } = this.deepData;
            notes.unshift(note);
            let index = clients.findIndex(v => v.id === client.id);
            if (index >= 0) {
                clients.splice(index, 1);
            }
            clients.unshift(client);
        });
    }
}
