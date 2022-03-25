import { VEditIDProps } from "tonwa-controller";
import { Context, Form } from "tonwa-react";
import { UqWorkshop } from "./UqWorkshop";

export function VAddWorkshop(props: VEditIDProps<UqWorkshop>) {
    let { uqID } = props;
    let { uq, schema, uiSchema } = uqID;
    let onSave = async (name: string, context: Context) => {
    }
    return <div className="p-3">
        <Form schema={schema} uiSchema={uiSchema} fieldLabelSize={2}
            onButtonClick={onSave}
        />;
    </div>;
}
