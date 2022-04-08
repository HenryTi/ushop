import React from 'react';
import { ButtonAsync, FA } from 'tonwa-com/coms';
import { EnumRes, res } from 'tonwa-com/res';
import { useSnapshot } from 'valtio';
import { checkRule } from '../fields';
import { useForm } from './FormContext';

export interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}
export function Submit({ className, children, onSubmit }: ButtonProps & { onSubmit: (data: any) => Promise<void>; }) {
    let form = useForm();
    let { hasError } = useSnapshot(form.errorResponse);
    className = className ?? 'btn btn-primary';
    children = children ?? <><FA name='share-square-o' /> {res[EnumRes.string_submit]}</>;
    async function onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        let { props, valueResponse, errorResponse } = form;
        let { rule } = props;
        let errors = checkRule(valueResponse.values, rule);
        if (errors) {
            errorResponse.errors = errors;
            errorResponse.hasError = true;
        }
        else {
            await onSubmit(form.valueResponse.values);
        }
    }
    return <ButtonAsync onClick={onClick} disabled={hasError} className={className}>
        {children}
    </ButtonAsync>;
}

export function Clear({ className, children }: ButtonProps) {
    let form = useForm();
    function onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        form.clearValues();
    }
    return <button onClick={onClick} className={className}>
        {children}
    </button>;
}

export function ClearErrorsButton({ className, children }: ButtonProps) {
    let form = useForm();
    let { hasError } = useSnapshot(form?.errorResponse);
    function onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        form.clearAllErrors();
    }
    return <button onClick={onClick} disabled={!hasError} className={className}>
        {children}
    </button>;
}
