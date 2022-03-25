import { closePage, openPage, Page, selectUser, UqID, User, VUser } from "tonwa-controller";
import { FA, LMR } from "tonwa-react";
import { UqExt } from "uq-app/uqs/BzWorkshop";
import { app } from "../../App";
import { UqPerson } from "./UqPerson";

export interface VBindUserProps {
    uqID: UqPerson;
}

export function VBindUser(props: VBindUserProps) {
    let { uqID } = props;
    let { currentItem } = uqID.state;
    let onChangeUser = async () => {
        let ret = await selectUser('Bind user');
        if (!ret) return;
        let userId = ret.id;
        let BzWorkshop = uqID.uq as UqExt;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: userId, xi: currentItem.id }
            ]
        })
        currentItem.user = userId;
    }

    let onBindUser = async () => {
        if (currentItem.user) {
            openPage(<VBound uqID={uqID} onChangeUser={onChangeUser} />);
            return;
        }
        await onChangeUser();
    }

    let rightIcon = currentItem.user ? 'angle-right' : 'pencil-square-o';
    return <div className="container">
        <div onClick={onBindUser}
            className="mb-3 row bg-white align-items-center cursor-pointer">
            <label className="col-sm-2 col-form-label">Bind user</label>
            <div className="col-sm-10">
                <LMR right={<FA name={rightIcon} className="text-primary" />}>
                    <VCurrentUser uqID={uqID} render={user => {
                        let { name } = user;
                        return <>{name}</>;
                    }} />
                    {/*this.controller.renderCurrentUser((user => {
                        let { name } = user;
                        return <>{name}</>;
                    }))*/}
                </LMR>
            </div>
        </div>
    </div>;
}

function VCurrentUser({ uqID, render }: { uqID: UqID; render: (user: User) => JSX.Element; }) {
    let { currentItem } = uqID.state;
    if (!currentItem) return null;
    let { user } = currentItem;
    return <VUser id={user} render={render} />;
}

interface VBoundProps {
    uqID: UqPerson;
    onChangeUser: () => Promise<void>;
}

function VBound(props: VBoundProps) {
    let { uqID, onChangeUser } = props;
    let onChange = async () => {
        if (await app.confirm('Change user account bound is not recommented. Still want to do so?') === true) {
            await onChangeUser();
        }
    }

    let onRemoveBound = async () => {
        await uqID.removeBoundUser();
        /*
        let { currentItem } = this.deepData;
        let { BzWorkshop } = this.uqs;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: currentItem.user, xi: -currentItem.id }
            ]
        })
        currentItem.user = undefined;
        */
        closePage();
    }

    let btnRemove = <button className="btn btn-outline-secondary"
        onClick={onRemoveBound}>
        Remove bound
    </button>;

    return <Page header="User bound">
        <div className="m-5 rouned-3 border bg-white w-max-30c p-5 mx-auto">
            <div className="mb-5 text-center">
                The person has bound to website user account:
                <br /><br />
                <VCurrentUser uqID={uqID} render={user => {
                    let { name } = user;
                    return <b className="text-primary ms-3">{name}</b>;
                }} />
            </div>
            <LMR className="" right={btnRemove}>
                <button className="btn btn-primary" onClick={onChange}>Change user</button>
            </LMR>
        </div>
    </Page>
}
