import { ChangeEvent, useEffect, useRef } from "react";
import { EnumString, Band, BandProps, useBand, BandChild, strings } from '../band';
import { useForm } from "../form";
import { FieldProps, FieldItem } from '../fields';

interface SelectItem {
    label: string;
    value: string | number | boolean;
}

class SelectFieldItem implements FieldItem {
    readonly name: string;
    private readonly select: HTMLSelectElement;
    private initIndex: any;
    constructor(name: string, select: HTMLSelectElement, initIndex: number) {
        this.name = name;
        this.select = select;
        this.initIndex = initIndex;
    }
    reset(): void {
        if (!this.select) return;
        this.select.selectedIndex = this.initIndex;
    }
}

interface SelectProps extends FieldProps {
    options: SelectItem[];
    placeholder?: string;
}

export function Select(props: SelectProps) {
    let select = useRef<HTMLSelectElement>();
    let band = useBand();
    let form = useForm();
    useEffect(() => {
        if (!band) return;
        let { props: formProps } = form;
        let { name, options } = props;
        let initValue = formProps.values?.[name];
        let initIndex = initValue ? options.findIndex(v => v.value === initValue) : 0;
        let fieldItem = new SelectFieldItem(name, select.current, initIndex);
        band.fields[name] = true;
        form.fields[name] = fieldItem;
    }, [band, form, props]);
    if (!band) return <BandChild name={props.name} />;
    let { props: formProps } = form;
    let { name, options, placeholder, className, readOnly } = props;
    readOnly = readOnly ?? formProps.readOnly;
    let initValue = form.props.values?.[name];
    function onChange(evt: ChangeEvent<HTMLSelectElement>) {
        form.setValue(name, evt.currentTarget.value);
    }
    if (readOnly === true) {
        return <div className={className ?? form.defaultStringClassName}>
            {initValue ?? form.defaultNone}
        </div>;
    }
    return <select ref={select}
        defaultValue={form.props.values?.[name]}
        className={className ?? form.defaultSelectClassName}
        onChange={onChange}
    >
        {!initValue &&
            <option value={undefined}>{placeholder ?? strings[EnumString.placeholder_select]}</option>}
        {options.map((v, index) => <option key={index} value={v.value as any}>{v.label}</option>)}
    </select>;
}

export function BandSelect(props: BandProps & SelectProps) {
    return <Band {...props}>
        <Select {...props} />
    </Band>;
}
