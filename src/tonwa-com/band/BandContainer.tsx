import React, { useContext } from "react";
import { proxy } from "valtio";
import { BandTemplateProps } from "./Band";
import { BandContext } from "./BandContext";
import { FieldItem } from "../fields";

export type OnValuesChanged = (values: { name: string; value: any; preValue: any; }[]) => Promise<void>;
export interface BandContainerProps {
    className?: string;
    children: React.ReactNode;
    stringClassName?: string;    // for string and number and date
    checkClassName?: string;     // for checkbox and radio
    pickClassName?: string;     // for pick
    values?: { [name: string]: any };
    BandTemplate?: (props: BandTemplateProps) => JSX.Element;
    readOnly?: boolean;
}

const defaultStringClassName = 'form-control';
const defaultCheckClassName = 'form-check-input';
const defaultSelectClassName = 'form-select';
const defaultPickClassName = 'form-control';
const defaultRangeClassName = 'form-range';

export enum EnumString {
    rule_mustBeInteger,
    rule_mustBeDecimal,
    rule_belowMin,
    rule_overMax,
    placeholder_pick,
    placeholder_select,
}

export const strings: {
    [key in EnumString]: string
} =
{
    [EnumString.rule_mustBeInteger]: '必须是整数',
    [EnumString.rule_mustBeDecimal]: '必须是数字',
    [EnumString.rule_belowMin]: '最小值',
    [EnumString.rule_overMax]: '最大值',
    [EnumString.placeholder_pick]: '请点击选择',
    [EnumString.placeholder_select]: '请点击选择',
};

export abstract class BandContainerContext<P extends BandContainerProps> {
    readonly defaultStringClassName = defaultStringClassName;
    readonly defaultCheckClassName = defaultCheckClassName;
    readonly defaultSelectClassName = defaultSelectClassName;
    readonly defaultPickClassName = defaultPickClassName;
    readonly defaultRangeClassName = defaultRangeClassName;
    readonly defaultNone = '-';
    readonly fields: { [name: string]: FieldItem };
    readonly bands: BandContext[];
    readonly BandTemplate?: (props: BandTemplateProps) => JSX.Element;
    readonly props: P;
    readonly valueResponse: {
        values: { [name: string]: any };
    };
    readonly readOnly: boolean;

    constructor(props: P) {
        let { values, BandTemplate, readOnly } = props;
        this.fields = {};
        this.bands = [];
        this.BandTemplate = BandTemplate;
        this.props = props;
        this.readOnly = readOnly;
        this.valueResponse = proxy({
            values: values ?? {},
        });
    }

    abstract get isDetail(): boolean;
    protected internalValuesChanged(values: { name: string; value: any; preValue: any; }[]): Promise<void> {
        return;
    }
    onValuesChanged = async (values: any) => {
        let changedValues: { name: string; value: any; preValue: any; }[] = [];
        let oldValues = this.valueResponse.values;
        for (let i in values) {
            let vNew = values[i];
            let vOld = oldValues[i];
            if (vNew !== vOld) {
                changedValues.push({ name: i, value: vNew, preValue: vOld });
                oldValues[i] = vNew;
            }
        }
        if (changedValues.length > 0) {
            await this.internalValuesChanged(changedValues)
        }
    }

    setValue(name: string, value: any) {
        this.valueResponse.values[name] = value;
    }

    setError(name: string, err: string[]): boolean {
        let hasError = false;
        for (let band of this.bands) {
            band.setError(name, err);
            if (hasError === false) {
                hasError = band.errors.length > 0;
            }
        }
        return hasError;
    }

    clearError(name: string): boolean {
        let hasError = false;
        for (let band of this.bands) {
            band.clearError(name);
            if (hasError === false) {
                hasError = band.errors.length > 0;
            }
        }
        return hasError;
    }

    clearAllErrors() {
        for (let band of this.bands) {
            band.clearAllErrors();
        }
    }
}

export const VBandContainerContext = React.createContext<BandContainerContext<BandContainerProps>>(undefined);

export function useBandContainer() {
    return useContext(VBandContainerContext);
}
