import { ChangeEvent, useEffect, useRef } from "react";
import { Band, BandProps, useBand } from '../band';
import { useForm } from "../form";
import { FieldProps, FieldItem } from '../fields';

type CheckInputProps = {
    indeterminate?: boolean;
    checkedValue?: string | number | boolean;
    uncheckedValue?: string | number | boolean;
} & FieldProps;

class CheckFieldItem implements FieldItem {
    readonly name: string;
    private input: HTMLInputElement;
    private indeterminate: boolean;
    private initChecked: boolean;
    constructor(name: string, input: HTMLInputElement, indeterminate: boolean, initChecked: boolean) {
        this.name = name;
        this.input = input;
        this.indeterminate = indeterminate;
        this.initChecked = initChecked;
    }
    reset(): void {
        if (!this.input) return;
        this.input.indeterminate = this.indeterminate;
        this.input.checked = this.initChecked;
    }
}

function CheckInput({ name, id, readOnly, indeterminate, checkedValue, uncheckedValue }: CheckInputProps & { id: string; }) {
    let input = useRef<HTMLInputElement>();
    let band = useBand();
    let form = useForm();
    useEffect(() => {
        if (indeterminate === true) {
            input.current.indeterminate = true;
        }
        if (band) {
            let { fields } = band;
            fields[name] = true;
        }
        let { props, fields } = form;
        let initChecked = props.values?.[name] === (checkedValue ?? true)
        fields[name] = new CheckFieldItem(name, input.current, indeterminate, initChecked);
    }, [band, form, name, indeterminate, checkedValue]);
    let { props } = form;
    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        let val: any;
        let t = evt.currentTarget;
        if (t.indeterminate === true) val = undefined;
        else {
            val = t.checked ? (checkedValue ?? true) : (uncheckedValue ?? false);
        }
        form.setValue(name, val);
    }
    let initChecked = props.values?.[name] === (checkedValue ?? true)
    return <input ref={input} name={name} type="checkbox" id={id}
        className={props.checkClassName ?? form.defaultCheckClassName}
        disabled={readOnly ?? props.readOnly ?? false}
        onChange={onChange}
        defaultChecked={initChecked} />;
}

interface CheckProps extends CheckInputProps {
    label?: JSX.Element | string;
}

export function Check(props: CheckProps) {
    let { label } = props;
    let id = `_${props.name}_${Date.now()}`
    return <div className={props.className ?? 'form-check'}>
        <CheckInput {...props} id={id} />
        <label className="form-check-label" htmlFor={id}>{label}</label>
    </div>;
}

export function BandCheck(props: BandProps & CheckProps) {
    let { label } = props;
    return <Band {...props} label={undefined} >
        <Check {...props} label={label} />
    </Band>;
}
