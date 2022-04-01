import React, { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { checkRule } from './checkRule';
import { VFormContext } from './Context';

export interface ButtonProps {
    className?: string;
    children: React.ReactNode;
}
export function Submit({ className, children }: ButtonProps) {
    let form = useContext(VFormContext);
    let { hasError } = useSnapshot(form.response);
    function onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        let { props, response } = form;
        let { rule, onSubmit } = props;
        let errors = checkRule(response.values, rule);
        if (errors) {
            response.errors = errors;
            response.hasError = true;
        }
        else {
            onSubmit(form.response.values);
        }
    }
    return <button onClick={onClick} disabled={hasError} className={className}>
        {children}
    </button>;
}

export function Clear({ className, children }: ButtonProps) {
    let form = useContext(VFormContext);
    function onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        form.clearValues();
    }
    return <button onClick={onClick} className={className}>
        {children}
    </button>;
}

export function ClearErrors({ className, children }: ButtonProps) {
    let form = useContext(VFormContext);
    let { hasError } = useSnapshot(form.response);
    function onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        form.clearAllErrors();
    }
    return <button onClick={onClick} disabled={!hasError} className={className}>
        {children}
    </button>;
}
