import { VPage, VEditId } from "tonwa-contoller";
import { FA, LMR } from "tonwa-react";
import { CPerson } from "./CPerson";

export class VEditPerson<C extends CPerson = CPerson> extends VEditId<C> {
    content() {
        return <div className="py-3">
            {this.renderProps()}
            {this.renderTagInput()}
        </div>;
        //{this.renderBindUser()}
    }

    protected renderBindUser(): JSX.Element {
        return this.renderAdmin(() => {
            let rightIcon = this.controller.deepData.currentItem.user ? 'angle-right' : 'pencil-square-o';
            return <div className="container">
                <div onClick={this.controller.onBindUser}
                    className="mb-3 row bg-white align-items-center cursor-pointer">
                    <label className="col-sm-2 col-form-label">Bind user</label>
                    <div className="col-sm-10">
                        <LMR right={<FA name={rightIcon} className="text-primary" />}>
                            {this.controller.renderCurrentUser((user => {
                                let { name } = user;
                                return <>{name}</>;
                            }))}
                        </LMR>
                    </div>
                </div>
            </div>;
        });
    }
}

export class VBound extends VPage<CPerson> {
    header() { return 'User bound'; }
    content() {
        let btnRemove = <button className="btn btn-outline-secondary"
            onClick={this.onRemoveBound}>
            Remove bound
        </button>;
        return <div className="m-5 rouned-3 border bg-white w-max-30c p-5 mx-auto">
            <div className="mb-5 text-center">
                The person has bound to website user account:
                <br /><br />
                {this.controller.renderCurrentUser((user => {
                    let { name } = user;
                    return <b className="text-primary ms-3">{name}</b>;
                }))}
            </div>
            <LMR className="" right={btnRemove}>
                <button className="btn btn-primary" onClick={this.onChange}>Change user</button>
            </LMR>
        </div>
    }

    private onChange = async () => {
        if (await this.confirm('Change user account bound is not recommented. Still want to do so?') === true) {
            await this.controller.onChangeUser();
        }
    }

    private onRemoveBound = async () => {
        await this.controller.onRemoveBound();
    }
}
