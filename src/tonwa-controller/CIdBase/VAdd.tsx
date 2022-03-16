import { Context, Form } from "tonwa-react";
import { VPage } from "../VPage";
import { CIdBase } from "./CIdBase";

export class VAdd<C extends CIdBase = any> extends VPage<C> {
    header(): string | boolean | JSX.Element {
        return 'New ' + this.controller.caption;
    }

    protected renderForm() {
        let { schema, uiSchema } = this.controller;
        schema = [...schema, { name: 'submit', type: 'submit' }];
        return <Form schema={schema} uiSchema={uiSchema} fieldLabelSize={2}
            onButtonClick={this.onSave}
        />;
    }

    content(): JSX.Element {
        return <div className="p-3">{this.renderForm()}</div>;
    }

    private onSave = async (name: string, context: Context) => {
        let data = context.data;
        await this.controller.onSaveId(data);
        this.controller.close();
        this.controller.open(VSucceed as any);
    }
}

class VSucceed extends VPage<CIdBase> {
    header(): string | boolean | JSX.Element {
        return 'Saved'
    }
    protected get back(): "close" | "back" | "none" {
        return 'close';
    }
    content(): JSX.Element {
        return <div>
            <div className="m-5 border border-warning rounded-3 bg-white w-30c p-5 mx-auto">
                <div className="text-center">Saved OK! </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary me-3" onClick={this.onNext}>Continue Input</button>
                    <button className="btn btn-outline-primary" onClick={this.onExit}>Exit</button>
                </div>
            </div>
        </div>;
    }
    onNext = async () => {
        this.controller.close();
        await this.controller.onAdd();
    }

    onExit = async () => {
        this.controller.close();
    }
}
