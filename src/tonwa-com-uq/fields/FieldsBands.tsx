import React from "react";
import { Pick, Int, Decimal, String, Band, TextArea } from "tonwa-com";
import { Field } from "tonwa-uq";

export interface FieldsBandsProps {
    fields: Field[];
    children?: React.ReactNode;
    replacer?: { [fieldName: string]: JSX.Element; }
}
export function createBandsFromFields(
    fields: Field[],
    replacer?: { [fieldName: string]: JSX.Element; }
) {
    return fields.map((v, index) => {
        let { name } = v;
        if (name === 'id') return null;
        let replace = replacer?.[name];
        if (replace) return <React.Fragment key={index}>{replace}</React.Fragment>;
        return <Band key={index} label={name}>
            {createInputFromField(v)}
        </Band>;
    });
}

function createInputFromField(field: Field) {
    let { type, name } = field;
    switch (type) {
        default: return <div>unknown type: {type}</div>;
        case 'id': return <Pick name={name} onPick={async () => alert('pick id')} />;
        case 'bigint':
        case 'int':
        case 'tinyint':
        case 'smallint':
            return <Int name={name} />;
        case 'dec':
            return <Decimal name={name} />;
        case 'char':
            return <String name={name} maxLength={field.size} />;
        case 'text':
            return <TextArea name={name} maxLength={60000} />
    }
}
