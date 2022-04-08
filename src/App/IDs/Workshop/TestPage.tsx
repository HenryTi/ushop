import { useUqApp } from "App/App";
import { Form, Page, Pick, PickFromQuery, useNav } from "tonwa-com";
import { IDValue } from "tonwa-com-uq";
import { Person, Role } from "uq-app/uqs/BzWorkshop";

export function TestPage() {
    let app = useUqApp();
    let nav = useNav();
    async function onPick(value: any) {
        async function query() {
            let result = await app.uqs.BzWorkshop.GetPersonList.query({ role: Role.staff })
            return result.ret;
        }
        return await nav.call(
            <PickFromQuery header="please click return"
                //items={[{ id: 1, name: 'a' }, { id: 2, name: 'b' }]}
                query={query}
                ItemView={PersonView} />
        );
    }
    return <Page header="Test page">
        <IDValue ID={app.uqs.BzWorkshop.Person} id={78905349} Value={PersonView} />
        <Form className="m-3">
            <Pick name="a" onPick={onPick} />
        </Form>
    </Page>;
}

function PersonView({ value }: { value: Person; }) {
    let { id, name, no, firstName, lastName, vice } = value;
    return <div className="px-3 py-2">
        {id} {no} {name} {lastName} {firstName} {vice}
    </div>;
}
