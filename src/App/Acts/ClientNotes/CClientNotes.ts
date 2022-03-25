import { Note, Person, SessionPerson } from "uq-app/uqs/BzWorkshop";
import { proxy } from "valtio";
import { Controller } from "../../Controller";

export class CClientNotes extends Controller {
    readonly deepData: {
        notes: (Note | SessionPerson)[];
        clients: Person[];
    } = proxy({
        notes: null,
        clients: null,
    });

    async openMain(): Promise<void> {
        //let { cClient } = this.app.cIds;
        //this.cClient = cClient;
        await this.loadClients();
        //this.open(VStart);
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
        this.deepData.clients = ret.ret;
    }

    loadClientLog = async (client: Person) => {
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
        this.deepData.notes = notes;
        //this.open(PClient, client);
    }

    showAddNote = (client: Person) => {
        //this.open(PAddNote, client);
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
        let { notes, clients } = this.deepData;
        notes.unshift(note);
        let index = clients.findIndex(v => v.id === client.id);
        if (index >= 0) {
            clients.splice(index, 1);
        }
        clients.unshift(client);
    }
}

export function useCClientNotes() {
    return new CClientNotes();
}
