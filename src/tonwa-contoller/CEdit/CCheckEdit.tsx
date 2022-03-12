import { ChangeEvent } from 'react';
import { CEdit } from './CEdit';
import { setReact } from '../Reactive';
import { AppBase } from 'tonwa-contoller';
import { EditProps } from '.';

export class CCheckEdit extends CEdit {
    constructor(nav: AppBase, props: EditProps) {
        super(nav, props);
        this.onEdit = undefined;
    }

    renderRef(): JSX.Element {
        return <label className="form-check-inline w-100 h-100">
            <input type="checkbox" className="ms-1"
                defaultChecked={this.shallowValue.value}
                onChange={this.onChange} />
        </label>;
    }

    renderEditIcon(): JSX.Element { return null; }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.checked;
        let { onChanged, itemSchema } = this.props;
        onChanged(itemSchema.name, value);
        setReact(() => {
            this.shallowValue.value = value;
        });
    }
}
