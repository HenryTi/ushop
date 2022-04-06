import { ChangeEvent, useEffect, useRef } from "react";
import { Band, BandProps, useBand } from '../band';
import { useForm } from "../form";
import { FieldProps, FieldItem } from '../fields';

class DTFieldItem implements FieldItem {
    readonly name: string;
    private readonly input: HTMLInputElement;
    private initValue: string;
    constructor(name: string, input: HTMLInputElement, initValue: string) {
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset(): void {
        if (!this.input) return;
        if (!this.initValue) {
            this.input.value = undefined;
        }
        else {
            this.input.value = this.initValue;
        }
    }
}

interface DtProps extends FieldProps {
}

function Picker(props: DtProps & { type: 'date' | 'time'; }) {
    let input = useRef<HTMLInputElement>();
    let band = useBand();
    let form = useForm();
    useEffect(() => {
        let { fields } = form;
        let { name } = props;
        let fieldItem = new DTFieldItem(name, input.current, form.props.values?.[name]);
        if (band) {
            band.fields[name] = true;
        }
        fields[name] = fieldItem;
    }, [band, form, input, props]);
    let { name, className, readOnly, type } = props;
    let { props: formProps } = form;
    readOnly = readOnly ?? formProps.readOnly;
    let initValue = form.props.values?.[name];
    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        let val = evt.currentTarget.value;
        form.setValue(name, val);
    }
    if (readOnly === true) {
        return <div className={className ?? form.defaultStringClassName}>
            {initValue ?? form.defaultNone}
        </div>;
    }
    return <input ref={input} type={type}
        defaultValue={form.props.values?.[name]}
        className={className ?? form.defaultStringClassName}
        onChange={onChange}
    />;
}

interface DateProps extends DtProps {
}
export function DatePicker(props: DateProps) {
    return <Picker {...props} type="date" />
}

interface TimeProps extends DtProps {
}
export function TimePicker(props: TimeProps) {
    return <Picker {...props} type="time" />
}

export function BandDatePicker(props: BandProps & DtProps) {
    return <Band {...props}>
        <DatePicker {...props} />
    </Band>;
}

export function BandTimePicker(props: BandProps & DtProps) {
    return <Band {...props}>
        <TimePicker {...props} />
    </Band>;
}
