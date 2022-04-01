import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { Row, RowProps } from "../Row";
import { FieldProps } from "../Form";
import { VFormRowContext } from "../Context";

type CheckInputProps = {
    indeterminate?: boolean;
    checkedValue?: string | number | boolean;
    uncheckedValue?: string | number | boolean;
} & FieldProps;

function CheckInput({ name, id, readOnly, indeterminate, checkedValue, uncheckedValue }: CheckInputProps & { id: string; }) {
    let input = useRef<HTMLInputElement>();
    let row = useContext(VFormRowContext);
    let { form } = row;
    let { props } = form;
    useEffect(() => {
        if (indeterminate === true) {
            input.current.indeterminate = true;
        }
        row.fields[name] = {
            name,
            input: input.current,
        };
    }, [row, name]);
    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        let val: any;
        let t = evt.currentTarget;
        if (t.indeterminate === true) val = undefined;
        else {
            val = t.checked ? (checkedValue ?? true) : (uncheckedValue ?? false);
        }
        form.setValue(name, val);
    }
    return <input ref={input} name={name} type="checkbox" id={id}
        className={props.checkClassName ?? form.defaultCheckClassName}
        readOnly={readOnly ?? props.readOnly ?? false}
        onChange={onChange}
        defaultChecked={form.response.values[name]} />;
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

export function RowCheck(props: RowProps & CheckProps) {
    let { label } = props;
    return <Row {...props} label={undefined} >
        <Check {...props} label={label} />
    </Row>;
}
