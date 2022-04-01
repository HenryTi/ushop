import { useContext } from "react";
import { Row, RowProps } from "../Row";
import { FieldProps } from "../Form";
import { CharInput } from "./CharInput";
import { Rule, VFormContext, EnumString } from "../Context";

interface DecimalProps extends FieldProps {
    placeholder?: string;
    maxLength?: number;
}

function appendRule(rules: Rule | Rule[], rule: Rule): Rule[] {
    let ret = [rule];
    if (rules) {
        ret.push(...Array.isArray(rule) === true ? rules as Rule[] : [rules as Rule]);
    }
    return ret;
}

const intKeys = '01234567890-+';
const decKeys = intKeys + '.';
export function Decimal(props: DecimalProps) {
    let form = useContext(VFormContext);
    let { placeholder, maxLength, rule } = props;
    function isValidKey(key: string) {
        return decKeys.indexOf(key) >= 0;
    }
    function mustBeDecimal(val: any) {
        val = (val as string).trim();
        if (val.length === 0) return;
        let r = Number.parseFloat(val);
        if (isNaN(r) === true || String(r).indexOf('e') >= 0
            || val.indexOf('+') > 0 || val.indexOf('-') > 0) {
            return form.strings[EnumString.rule_mustBeDecimal];
        }
    }

    return <CharInput placeholder={placeholder} maxLength={maxLength}
        isValidKey={isValidKey}
        rule={appendRule(rule, mustBeDecimal)}
        {...props} />;
}

export function RowDecimal(props: RowProps & DecimalProps) {
    return <Row {...props}>
        <Decimal {...props} />
    </Row>;
}

interface IntProps extends FieldProps {
    placeholder?: string;
    maxLength?: number;
}

export function Int(props: IntProps) {
    let form = useContext(VFormContext);
    let { placeholder, maxLength, rule } = props;
    function isValidKey(key: string) {
        return intKeys.indexOf(key) >= 0;
    }
    function mustBeInteger(val: any) {
        val = (val as string).trim();
        if (val.length === 0) return;
        let r = Number.parseFloat(val);
        if (isNaN(r) === true
            || String(r).indexOf('.') >= 0
            || String(r).indexOf('e') >= 0
            || val.indexOf('+') > 0 || val.indexOf('-') > 0) {
            return form.strings[EnumString.rule_mustBeInteger];
        }
    }
    return <CharInput placeholder={placeholder} maxLength={maxLength}
        isValidKey={isValidKey}
        rule={appendRule(rule, mustBeInteger)}
        {...props} />;
}

export function RowInt(props: RowProps & IntProps) {
    return <Row {...props}>
        <Int {...props} />
    </Row>;
}
