import { useUqApp } from "App/App";
import { SelectUser, UserView } from "tonwa-com-uq";
import { LMR, Page, useNav } from "tonwa-com";
import { User } from "tonwa-uq";
import { MPerson } from "../UqPerson";

export function BoundUserPage({ person, onUserChanged }: { person: MPerson; onUserChanged: (user: number) => void }) {
    let { uqs } = useUqApp();
    let nav = useNav();
    let onChange = async () => {
        if (await nav.confirm('Change user account bound is not recommented. Still want to do so?') === false) {
            return;
        }
        let ret = await nav.call<User>(<SelectUser header="Select user" />);
        if (!ret) return;
        let userId = ret.id;
        let { BzWorkshop } = uqs;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: userId, xi: person.id }
            ]
        })
        onUserChanged(userId);
    }

    let onRemoveBound = async () => {
        let { BzWorkshop } = uqs;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: person.user, xi: -person.id }
            ]
        })
        onUserChanged(undefined);
        nav.close();
    }

    return <Page header="User bound">
        <div className="m-5 rouned-3 border bg-white w-max-30c p-5 mx-auto">
            <div className="mb-5 text-center">
                The person has bound to website user account:
                <br /><br />
                <UserView id={person.user} className="text-primary fw-bold fs-big" />
            </div>
            <LMR className="">
                <button className="btn btn-primary me-3" onClick={onChange}>Change user</button>
                <button className="btn btn-outline-secondary"
                    onClick={onRemoveBound}>
                    Remove bound
                </button>
            </LMR>
        </div>
    </Page>;
}
