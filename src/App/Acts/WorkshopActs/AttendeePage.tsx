import { useUqApp } from "App/UqApp";
import { ClientView } from "App/IDs";
import { LMR, Page, Sep, useNav } from "tonwa-com";
import { FA } from "tonwa-com";
import { IDValue } from "tonwa-com-uq";

interface Props {
    attendee: any;
    onAttendeeChanged: (attendee: any) => void;
}

export function AttendeePage({ attendee, onAttendeeChanged }: Props) {
    let nav = useNav();
    let { uqs } = useUqApp();
    let { deleted } = attendee;
    async function changeSessionClient() {
        let { BzWorkshop } = uqs;
        let { ix, xi, deleted } = attendee;
        deleted = 1 - deleted;
        /*
        await BzWorkshop.Acts({
            ixSessionClient: [{
                ix, xi, deleted,
            }],
        });
        */
        await BzWorkshop.SaveSessionAttendee.submit({
            session: ix,
            client: xi,
            deleted,
        });
        onAttendeeChanged({ ...attendee, deleted });
        //let ixVal = this.deep.list.find(v => v.xi === xi);
        //ixVal.deleted = deleted;
        nav.close();
    }
    let cn = 'btn me-3 mt-3';
    let content: any;
    if (deleted === 0) {
        cn += ' btn-outline-primary ';
        content = <><FA name="trash" /> Delete</>;
    }
    else {
        cn += ' btn-outline-info ';
        content = <><FA name="repeat" /> Restore</>;
    }
    return <Page header="Attendee">
        <div className="p-3">
            <IDValue id={attendee.xi} ID={uqs.BzWorkshop.Person} Template={ClientView} />
        </div>
        <Sep />
        <LMR>
            <div />
            <button className={cn} onClick={changeSessionClient}>
                {content}
            </button>
        </LMR>
    </Page>;
}