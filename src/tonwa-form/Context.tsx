import React from 'react';
import { proxy } from 'valtio';
import { FormProps } from './Form';

export interface RowTemplateProps {
    label?: string | JSX.Element;
    children: React.ReactNode;
}

interface FieldInRow {
    name: string;
    input: HTMLInputElement;
}

interface FieldError {
    name: string;
    error: string;
}

export type Rule = (val: any) => (string | string[]);

export class FormRowContext {
    readonly form: FormContext;
    readonly fields: { [name: string]: FieldInRow };
    readonly errors: FieldError[];
    readonly memos: string[];

    constructor(form: FormContext, memos: string[]) {
        this.form = form;
        this.fields = {};
        this.errors = proxy([]);
        this.memos = memos;
        form.rows.push(this);
    }

    setError(name: string, error: string[]) {
        if (this.fields[name]) {
            if (error) {
                for (let err of error) {
                    this.errors.push({ name, error: err });
                }
            }
        }
    }

    clearError(name: string) {
        let last = this.errors.length - 1;
        for (let i = last; i >= 0; i--) {
            let err = this.errors[i];
            if (err.name === name) {
                this.errors.splice(i, 1);
            }
        }
    }

    clearAllErrors() {
        this.errors.splice(0);
        this.form.response.hasError = false;
        this.form.response.errors = undefined;
    }

    clearValues() {
        for (let i in this.fields) {
            let { input } = this.fields[i];
            if (!input) continue;
            input.value = '';
        }
        this.clearAllErrors();
    }
}

const defaultStringClassName = 'form-control';
const defaultCheckClassName = 'form-check-input';

export enum EnumString {
    rule_mustBeInteger,
    rule_mustBeDecimal,
    placeholder_pick,
}

export class FormContext {
    readonly defaultStringClassName = defaultStringClassName;
    readonly defaultCheckClassName = defaultCheckClassName;
    readonly rows: FormRowContext[];
    readonly response: {
        hasError: boolean;
        values: { [name: string]: any };
        errors: string[];
    };
    readonly props: FormProps;
    readonly strings: {
        [key in EnumString]: string
    } = {
            [EnumString.rule_mustBeInteger]: '必须是整数',
            [EnumString.rule_mustBeDecimal]: '必须是数字',
            [EnumString.placeholder_pick]: '请点击选择',
        }
    constructor(props: FormProps) {
        this.rows = [];
        this.response = proxy({
            hasError: false,
            values: {},
            errors: undefined,
        });
        this.props = props;
    }

    setValue(name: string, value: any) {
        this.response.values[name] = value;
    }

    setError(name: string, err: string[]) {
        if (!err) return;
        let hasError = false;
        for (let row of this.rows) {
            row.setError(name, err);
            if (hasError === false) {
                hasError = row.errors.length > 0;
            }
        }
        if (hasError === true) {
            this.response.hasError = hasError;
        }
    }

    clearError(name: string) {
        let hasError = false;
        for (let row of this.rows) {
            row.clearError(name);
            if (hasError === false) {
                hasError = row.errors.length > 0;
            }
        }
        this.response.hasError = hasError;
        this.response.errors = undefined;
    }

    clearAllErrors() {
        for (let row of this.rows) {
            row.clearAllErrors();
        }
        this.response.hasError = false;
    }

    clearValues() {
        let { values } = this.response;
        for (let i in values) {
            values[i] = undefined;
        }
        for (let row of this.rows) {
            row.clearValues();
        }
    }
}

export const VFormContext = React.createContext<FormContext>(undefined);

export const VFormRowContext = React.createContext<FormRowContext>(undefined);
