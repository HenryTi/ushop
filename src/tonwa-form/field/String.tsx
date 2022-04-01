import { Row, RowProps } from "../Row";
import { FieldProps } from "../Form";
import { CharInput } from "./CharInput";

interface StringProps extends FieldProps {
    placeholder?: string;
    maxLength?: number;
}

export function String(props: StringProps) {
    let { placeholder, maxLength } = props;
    return <CharInput placeholder={placeholder} maxLength={maxLength} {...props} />;
}

export function RowString(props: RowProps & StringProps) {
    return <Row {...props}>
        <String {...props} />
    </Row>;
}
