import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useBand, useBandContainer, checkRule } from '../band';
import { FieldProps, FieldItem } from '../fields';

type CharInputBaseProps = {
    placeholder: string;
    maxLength: number;
    isValidKey?: (key: string) => boolean;
} & FieldProps;

class CharFieldItem implements FieldItem {
    readonly name: string;
    private input: HTMLInputElement;
    private initValue: any;
    constructor(name: string, input: HTMLInputElement, initValue: any) {
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset(): void {
        if (!this.input) return;
        this.input.value = this.initValue ?? '';
    }
}

export function CharInput(props: CharInputBaseProps) {
    let bandContainer = useBandContainer();
    let { name } = props;
    let initValue = bandContainer?.props.values?.[name];
    return <CharInputBase {...props} initValue={initValue} />
}

export function CharInputBase({ name, className, readOnly, placeholder, maxLength, rule, isValidKey, initValue }
    : CharInputBaseProps & { initValue: any; }) {
    let input = useRef<HTMLInputElement>();
    let [hasError, setHasError] = useState(false);
    let band = useBand();
    let bandContainer = useBandContainer();
    useEffect(() => {
        if (!band) return;
        let { fields } = band;
        fields[name] = true;
        let { fields: formFields, props } = bandContainer;
        formFields[name] = new CharFieldItem(name, input.current, props.values?.[name]);
    }, [band, bandContainer, name]);
    let { props } = bandContainer;
    readOnly = readOnly ?? props.readOnly ?? false;
    let cn = className ?? props.stringClassName ?? bandContainer.defaultStringClassName ?? '';
    if (hasError === true) cn += ' is-invalid';
    if (readOnly === true) {
        return <div className={cn + ' bg-light text-muted'}>
            {initValue ?? bandContainer.defaultNone}
        </div>;
    }
    let onFocus = () => {
        bandContainer.clearError(name);
        setHasError(false);
    }
    let onBlur = () => {
        let err = checkRule(input.current.value, rule);
        bandContainer.setError(name, err);
        let has = !(err === undefined);
        setHasError(has);
    }
    let onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        bandContainer.setValue(name, evt.currentTarget.value);
    }
    let onBeforeInput = (evt: React.FormEvent<HTMLInputElement>) => {
        if (!isValidKey) return true;
        if (isValidKey((evt as any).data) === false) {
            evt.preventDefault();
            return false;
        }
    }
    return <input ref={input} name={name} type="text"
        className={cn}
        readOnly={readOnly}
        onFocus={onFocus} onBlur={onBlur} onBeforeInput={onBeforeInput}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        defaultValue={initValue} />;
}
