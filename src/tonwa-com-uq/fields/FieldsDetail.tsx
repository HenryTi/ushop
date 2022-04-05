import { Detail, OnValuesChanged } from "tonwa-com";
import { createBandsFromFields, FieldsBandsProps } from "./FieldsBands";

interface Props extends FieldsBandsProps {
    className?: string;
    values?: any;
    onValuesChanged?: OnValuesChanged;
}
export function FieldsDetail(props: Props) {
    let { fields, replacer, className, values, onValuesChanged, children } = props;
    return <Detail className={className} values={values} onValuesChanged={onValuesChanged}>
        {createBandsFromFields(fields, replacer)}
        {children}
    </Detail>;
}
