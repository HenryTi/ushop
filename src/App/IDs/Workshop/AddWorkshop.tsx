import { SubmitButton, Page, Band, BandCheck, useNav, OnValuesChanged } from "tonwa-com";
import { FieldsForm, RowIDNOInput } from "tonwa-com-uq";
import { useUqApp } from "../../App";

export function AddWorkshop() {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let { Workshop } = BzWorkshop;
    let { fields } = Workshop;
    async function onSubmit(data: any) {
        let ret = await BzWorkshop.Acts({
            workshop: [data],
        });
        let retId = ret.workshop[0];
        alert(JSON.stringify(retId));
        nav.close();
    };

    let replacer = {
        'no': <RowIDNOInput label="NO" name="no" ID={Workshop} />,
    }
    return <Page header="add workshop">
        <FieldsForm className="p-3" fields={fields} replacer={replacer}>
            <BandCheck label="aHHHHHHHHH" name="b" />
            <Band>
                <SubmitButton onSubmit={onSubmit} className="btn btn-primary">Submit</SubmitButton>
            </Band>
        </FieldsForm>
    </Page>;
}
