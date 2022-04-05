import { Form } from "tonwa-com";
import { createBandsFromFields, FieldsBandsProps } from "./FieldsBands";

interface Props extends FieldsBandsProps {
    className?: string;
    values?: any;
}
export function FieldsForm(props: Props) {
    let { fields, replacer, className, values, children } = props;
    return <Form className={className} values={values}>
        {createBandsFromFields(fields, replacer)}
        {children}
    </Form>;
}
