import { ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "../form/FormContext";
import { useBand, Band, BandProps, checkRule, BandChild } from '../band';
import { FieldItem, FieldProps } from '../fields';

type TextProps = {
    placeholder?: string;
    maxLength?: number;
    rows?: number;
} & FieldProps;

class TextFieldItem implements FieldItem {
    readonly name: string;
    private input: HTMLTextAreaElement;
    private initValue: any;
    constructor(name: string, input: HTMLTextAreaElement, initValue: any) {
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset(): void {
        if (!this.input) return;
        this.input.value = this.initValue ?? '';
    }
}

export function TextArea({ name, className, readOnly, placeholder, maxLength, rule, rows }: TextProps) {
    let input = useRef<HTMLTextAreaElement>();
    let band = useBand();
    let form = useForm();
    useEffect(() => {
        if (!band) return;
        let { fields } = band;
        fields[name] = true;
        let { fields: formFields, props } = form;
        formFields[name] = new TextFieldItem(name, input.current, props.values?.[name]);
    }, [band, form, name]);
    if (!band) return <BandChild name={name} />;
    let { props } = form;
    readOnly = readOnly ?? props.readOnly ?? false;
    let cn = className ?? props.stringClassName ?? form.defaultStringClassName;
    let initValue = props.values?.[name];
    if (readOnly === true) {
        return <div className={cn}>
            {initValue ?? form.defaultNone}
        </div>;
    }
    let onFocus = () => {
        form.clearError(name);
    }
    let onBlur = () => {
        let err = checkRule(input.current.value, rule);
        form.setError(name, err);
    }
    let onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        form.setValue(name, evt.currentTarget.value);
    }
    return <textarea ref={input} name={name}
        className={cn}
        readOnly={readOnly}
        onFocus={onFocus} onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows ?? 4}
        defaultValue={initValue} />;
}

export function BandTextArea(props: BandProps & TextProps) {
    return <Band {...props}>
        <TextArea {...props} />
    </Band>;
}
