import { useUqApp } from "App/App";
import { Page, OnValuesChanged } from "tonwa-com";
import { FieldsDetail } from "tonwa-com-uq";
import { Workshop } from "uq-app/uqs/BzWorkshop";

interface Props {
    item: Workshop;
    onItemChanged?: (item: Workshop, preItem: Workshop) => Promise<void>;
}

export function EditWorkshop({ item, onItemChanged }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let { Workshop } = BzWorkshop;
    let onValuesChanged: OnValuesChanged = async (values) => {
        let newItem = { ...item };
        let { id } = item;
        for (let v of values) {
            let { name, value } = v;
            (newItem as any)[name] = value;
            switch (name) {
                default:
                    await BzWorkshop.ActIDProp(Workshop, id, name, value);
                    break;
                case 'staff':
                    await BzWorkshop.SaveWorkshopStaff.submit({ id, staff: value });
                    break;
            }
        }
        await onItemChanged(newItem, item);
    }
    return <Page header="Detail">
        <FieldsDetail className="mx-3 mt-3 mb-1 border-2 border-top border-bottom"
            values={item}
            fields={Workshop.fields}
            onValuesChanged={onValuesChanged}>
        </FieldsDetail>
    </Page>;
}
