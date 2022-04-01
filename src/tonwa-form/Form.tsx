import React, { useContext, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { FormContext, VFormContext, Rule, RowTemplateProps } from './Context';
import { FieldError, Row } from './Row';

export interface FormProps {
    className?: string;
    onSubmit?: (data: any) => void;
    children: React.ReactNode;
    stringClassName?: string;    // for string and number and date
    checkClassName?: string;     // for checkbox and radio
    readOnly?: boolean;
    RowTemplate?: (props: RowTemplateProps) => JSX.Element;
    rule?: Rule | Rule[];
}

export function Form(props: FormProps) {
    let { className, children } = props;
    let { current: context } = useRef(new FormContext(props));
    function onFormSubmit(evt: React.FormEvent) {
        //evt.preventDefault();
    }
    return <VFormContext.Provider value={context}>
        <form className={className} onSubmit={onFormSubmit}>
            {children}
        </form>
    </VFormContext.Provider>;
}

export interface FieldProps {
    name: string;
    className?: string;
    readOnly?: boolean;
    rule?: Rule | Rule[];
    memo?: string | string[];
}

export function FormErrors() {
    let form = useContext(VFormContext);
    let { errors } = useSnapshot(form.response);
    if (!errors) return null;
    return <>
        {errors.map((v, index) => <FieldError key={index} error={v} />)}
    </>;
}

export function RowFormErrors() {
    let form = useContext(VFormContext);
    let { errors } = useSnapshot(form.response);
    if (!errors) return null;
    return <Row>
        {errors.map((v, index) => <FieldError key={index} error={v} />)}
    </Row>;
}
