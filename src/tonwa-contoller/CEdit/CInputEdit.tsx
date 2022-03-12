import * as React from 'react';
import { CEdit } from './CEdit';
import { setReact, shallowReact } from '../Reactive';
import { VPage } from '../VPage';
import { UiInputItem } from 'tonwa-react';

export interface InputOptions {
    type: string;
    min?: number;
    max?: number;
    step?: number;
}

abstract class CEditWithPage extends CEdit {
    abstract get Page(): new (c: CEdit) => VPage<CEdit>;
}

abstract class VEditPage<C extends CEditWithPage> extends VPage<C> {
    shallowData: {
        isChanged: boolean;
        error: string;
    } = shallowReact({
        isChanged: false,
        error: null,
    });
    value: any;

    header(): string | boolean | JSX.Element {
        return this.controller.label;
    }

    right() {
        return this.react(() => <button
            className="btn btn-sm btn-success align-self-center me-2"
            disabled={!this.shallowData.isChanged}
            onClick={this.onSave}>{this.res('Save')}</button>
        );
    }

    private onSave = async () => {
        let { onChanged, itemSchema } = this.controller.props;
        onChanged(itemSchema.name, this.value);
        this.controller.close();
    }

    abstract get InputType(): string;

    content() {
        let { error } = this.shallowData;
        let { uiItem, exView } = this.controller.props;
        let onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
            if (this.shallowData.isChanged === false) return;
            if (evt.key === 'Enter') this.onSave();
        }
        return <div className="m-3">
            <input type={this.InputType}
                onChange={this.onChange}
                onKeyDown={onKeyDown}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                className="form-control"
                defaultValue={this.controller.shallowValue.value} />
            {
                <div className="small muted m-2">{(uiItem as UiInputItem)?.placeholder}</div>
            }
            {error && <div className="text-danger">{error}</div>}
            {exView}
        </div>;
    }

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setReact(() => {
            this.value = evt.target.value;
            this.shallowData.isChanged = (this.value !== this.controller.shallowValue.value);
        });
    }

    private onBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setReact(() => {
            this.shallowData.error = this.controller.verifyValue(this.value);
        })
    }

    private onFocus = () => {
        setReact(() => {
            this.shallowData.error = undefined;
        })
    }
}

export class CStringEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => VPage<CEdit> {
        return VStringPage;
    }
}

class VStringPage extends VEditPage<CStringEdit> {
    get InputType(): string { return 'text' }
}

export class CDateEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => VPage<CEdit> {
        return VDatePage;
    }
}

class VDatePage extends VEditPage<CDateEdit> {
    get InputType(): string { return 'date' }
}

export class CDateTimeEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => VPage<CEdit> {
        return VDateTimePage;
    }
}

class VDateTimePage extends VEditPage<CDateTimeEdit> {
    get InputType(): string { return 'datetime' }
}

export class CTimeEdit extends CEditWithPage {
    get Page(): new (c: CEdit) => VPage<CEdit> {
        return VTimePage;
    }
}

class VTimePage extends VEditPage<CTimeEdit> {
    get InputType(): string { return 'time' }
}

