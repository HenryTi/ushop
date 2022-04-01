import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { Row, RowProps } from "../Row";
import { FieldProps } from "../Form";
import { VFormRowContext } from "../Context";

interface RadioItem {
    label: string;
    value: string | number | boolean;
}

type RadioInputProps = {
    item: RadioItem;
    itemIndex: number;
    defaultChecked: boolean;
} & FieldProps;

function RadioInput({ name, className, readOnly, item, itemIndex, defaultChecked }: RadioInputProps) {
    let { label, value } = item;
    let input = useRef<HTMLInputElement>();
    let row = useContext(VFormRowContext);
    let { form } = row;
    let { props } = form;
    useEffect(() => {
        input.current.indeterminate = true;
        row.fields[name] = {
            name,
            input: input.current,
        };
    }, [row, name]);
    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        let t = evt.currentTarget;
        if (t.checked === true) {
            form.setValue(name, value);
        }

    }
    let radioId = `_${name}_${itemIndex}_${Date.now()}`;
    return <div className="form-check form-check-inline">
        <input ref={input} name={name} type="radio"
            id={radioId}
            className={className ?? props.checkClassName ?? form.defaultCheckClassName}
            readOnly={readOnly ?? props.readOnly ?? false}
            onChange={onChange}
            defaultChecked={defaultChecked} />
        <label className="form-check-label" htmlFor={radioId}>{label}</label> &nbsp;
    </div>;
}

interface RadioProps extends FieldProps {
    options: RadioItem[];
    defaultValue?: any;
}

export function Radio(props: RadioProps) {
    let { options, defaultValue } = props;
    return <>
        {options.map((v, index) => <RadioInput key={index} {...props} item={v}
            itemIndex={index} defaultChecked={v.value === defaultValue} />)}
    </>;
}

export function RowRadio(props: RowProps & RadioProps) {
    return <Row {...props} label={undefined} >
        <Radio {...props} />
    </Row>;
}
