import { useUqApp } from "App/UqApp";
import { useEffect } from "react";
import {
    Band, BandInt, BandString, DatePicker, FA, Form, LMR
    , Page, ruleIsRequired, Sep, Submit, TimePicker
    , useNav, renderDate
} from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-com-uq";
import { Session, Workshop } from "uqs/BzWorkshop";

export function SessionList({ workshop }: { workshop: Workshop }) {
    let nav = useNav();
    let app = useUqApp();
    let listEditContext = useIdListEdit<Session>(undefined);
    useEffect(() => {
        async function loadSessionList(): Promise<void> {
            let { BzWorkshop } = app.uqs;
            let { id } = workshop;
            let ret = await BzWorkshop.QueryID<Session>({
                IX: [BzWorkshop.IxWorkshopSession],
                IDX: [BzWorkshop.Session],
                ix: id,
            });
            listEditContext.setItems(ret);
        }
        loadSessionList();
    }, [app, workshop, listEditContext]);

    let SessionView = ({ value: item }: { value: Session; }) => {
        let { date, vice, time, span } = item;
        return <div className="d-flex px-3 py-2">
            <FA name="chevron-circle-right" className="text-info me-3 mt-1" />
            <div>
                <div>
                    {renderDate(date)} &nbsp; &nbsp;
                    start at {time} &nbsp; &nbsp;
                    for {span} minutes &nbsp; &nbsp;
                </div>
                <div><b>{vice}</b></div>
            </div>
        </div>;
    }

    function SessionForm({ session, onSubmit }: { session: Session; onSubmit: (data: Session) => Promise<void> }) {
        return <Form className="m-3" values={session}>
            <Band label="Date">
                <div className="input-group">
                    <DatePicker name="date" className="form-control w-max-12c" rule={ruleIsRequired} />
                    <TimePicker name="time" className="form-control w-max-8c" rule={ruleIsRequired} />
                </div>
            </Band>
            <BandInt label="Minutes" name="span" min={10} max={480} placeholder="in minutes" rule={ruleIsRequired} />
            <BandString label="Discription" name="vice" maxLength={200} />
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </Form>
    }

    async function saveSession(data: Session) {
        let { BzWorkshop } = app.uqs;
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxWorkshopSession,
            ID: BzWorkshop.Session,
            values: [
                {
                    ix: workshop.id,
                    xi: data,
                }
            ]
        });
        let id = ret[0];
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxSessionStaff,
            values: [
                { ix: id, xi: workshop.staff }
            ]
        })
        data.id = id;
        listEditContext.onItemChanged(data);
    }

    let onAdd = (): void => {
        function AddPage() {
            async function onSubmit(session: Session) {
                await saveSession(session);
                nav.close();
            }
            return <Page header="Add session">
                <SessionForm session={undefined} onSubmit={onSubmit} />
            </Page>;
        }
        nav.open(<AddPage />);
    }
    let onEditItem = async (session: Session): Promise<void> => {
        function EditPage() {
            async function onSubmit(session: Session) {
                await saveSession(session);
                nav.close();
            }
            return <Page header="Edit session">
                <SessionForm session={session} onSubmit={onSubmit} />
            </Page>;
        }
        nav.open(<EditPage />);
    }
    let right = <button className="btn btn-sm btn-outline-primary" onClick={onAdd}>
        <FA name="plus" fixWidth={true} /> Add
    </button>;
    return <div className="my-3">
        <LMR className="px-3 py-1 bg-light align-items-end">
            <b>Sessions</b>
            {right}
        </LMR>
        <Sep sep={2} />
        <IDListEdit context={listEditContext} className="my-1"
            ItemView={SessionView}
            onItemClick={onEditItem}
            none={<small className="d-block px-3 py-3 text-muted">No session, click {right} to add</small>} />
        <Sep sep={2} />
    </div>;
}
