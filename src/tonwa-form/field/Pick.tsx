import { useContext } from "react";
import { useSnapshot } from "valtio";
import { FA } from "../FA";
import { EnumString, VFormRowContext } from "../Context";
import { FieldProps } from "../Form";
import { Row, RowProps } from "../Row";

type PickProps = {
    className?: string;
    onPick: (initValue: any) => Promise<any>;
    placeholder?: string;
} & FieldProps;

export function Pick(props: PickProps) {
    let row = useContext(VFormRowContext);
    let { form } = row;
    let { props: formProps, response } = form;
    let { name, className, onPick, placeholder } = props;
    let { values } = useSnapshot(response);
    let val = values[name];
    async function onClick() {
        let ret = await onPick(val);
        response.values[name] = ret;
    }
    return <div className={'cursor-pointer d-flex ' + (className ?? formProps.checkClassName ?? form.defaultStringClassName)}
        onClick={onClick}>
        <div className="flex-grow-1">
            {val ?? placeholder ?? form.strings[EnumString.placeholder_pick]}
        </div>
        <div><FA name="angle-right" /></div>
    </div>
}

export function RowPick(props: RowProps & PickProps) {
    return <Row {...props}>
        <Pick {...props} />
    </Row>;
}