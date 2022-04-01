import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { checkRule } from "../checkRule";
import { VFormRowContext } from "../Context";
import { FieldProps } from "../Form";

type CharInputProps = {
    placeholder: string;
    maxLength: number;
    isValidKey?: (key: string) => boolean;
} & FieldProps;

export function CharInput({ name, className, readOnly, placeholder, maxLength, rule, isValidKey }: CharInputProps) {
    let input = useRef<HTMLInputElement>();
    let row = useContext(VFormRowContext);
    let { form } = row;
    let { props } = form;
    useEffect(() => {
        row.fields[name] = {
            name,
            input: input.current,
        };
    }, [row, name]);
    function onFocus() {
        form.clearError(name);
    }
    function onBlur() {
        let err = checkRule(input.current.value, rule);
        form.setError(name, err);
    }
    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        form.setValue(name, evt.currentTarget.value);
    }
    function onBeforeInput(evt: React.FormEvent<HTMLInputElement>) {
        if (isValidKey((evt as any).data) === false) {
            evt.preventDefault();
            return false;
        }
    }
    return <input ref={input} name={name} type="text"
        className={className ?? props.stringClassName ?? form.defaultStringClassName}
        readOnly={readOnly ?? props.readOnly ?? false}
        onFocus={onFocus} onBlur={onBlur} onBeforeInput={onBeforeInput}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        defaultValue={form.response.values[name]} />;
}
