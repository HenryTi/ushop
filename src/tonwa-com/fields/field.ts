import { Rule } from './Rule';

export interface FieldProps {
    name: string;
    className?: string;
    readOnly?: boolean;
    rule?: Rule | Rule[];
    memo?: string | string[];
}

export interface FieldItem {
    name: string;
    //input: HTMLInputElement;
    reset(): void;
}
