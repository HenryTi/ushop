import { ChangeEvent, useEffect, useRef } from "react";
import { Band, BandProps, useBand, useBandContainer } from '../band';
import { FieldProps, FieldItem } from '../fields';
import { useSnapshot } from "valtio";

interface RadioItem {
    label: string;
    value: string | number | boolean;
}

type RadioInputProps = {
    item: RadioItem;
    itemIndex: number;
    defaultChecked: boolean;
} & FieldProps;

class RadioFieldItem implements FieldItem {
    readonly name: string;
    private readonly inputs: HTMLInputElement[];
    private initValue: any;
    constructor(name: string, initValue: any) {
        this.name = name;
        this.inputs = [];
        if (initValue) {
            this.initValue = String(initValue);
        }
    }
    addInput(input: HTMLInputElement) {
        this.inputs.push(input);
    }
    reset(): void {
        for (let input of this.inputs) {
            if (!input) continue;
            input.checked = input.value === this.initValue;
        }
    }
}

function RadioInput({ name, className, readOnly, item, itemIndex, defaultChecked }: RadioInputProps) {
    let { label, value } = item;
    let input = useRef<HTMLInputElement>();
    let band = useBand();
    let form = useBandContainer();
    useEffect(() => {
        let fieldItem = form.fields[name] as RadioFieldItem;
        fieldItem.addInput(input.current);
    }, [band, form, name]);
    let { props } = form;
    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        let t = evt.currentTarget;
        if (t.checked === true) {
            form.setValue(name, value);
        }
    }
    readOnly = readOnly ?? props.readOnly ?? false;
    let radioId = `_${name}_${itemIndex}_${Date.now()}`;
    return <div className="form-check form-check-inline">
        <input ref={input} name={name} type="radio"
            id={radioId}
            className={className ?? props.checkClassName ?? form.defaultCheckClassName}
            disabled={readOnly}
            onChange={onChange}
            value={value as any}
            defaultChecked={defaultChecked} />
        <label className="form-check-label" htmlFor={radioId}>{label}</label> &nbsp;
    </div>;
}

interface RadioProps extends FieldProps {
    options: RadioItem[];
}

export function Radio(props: RadioProps) {
    let band = useBand();
    let form = useBandContainer();
    let { values } = useSnapshot(form.valueResponse);
    let { name, options } = props;
    let val = values[name];
    let { current: fieldItem } = useRef(new RadioFieldItem(name, form.props.values?.[name]));
    if (band) band.fields[name] = true;
    form.fields[name] = fieldItem;
    return <>
        {options.map((v, index) => <RadioInput key={index} {...props} item={v}
            itemIndex={index} defaultChecked={v.value === val} />)}
    </>;
}

export function BandRadio(props: BandProps & RadioProps) {
    return <Band {...props} label={undefined} >
        <Radio {...props} />
    </Band>;
}
