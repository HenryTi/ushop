import { useUqApp } from "App/UqApp";
import { Band, BandRadio, Page, Submit, useNav } from "tonwa-com";
import { BandIDNOInput, FieldsForm } from "tonwa-com-uq";
import { Gender, Role } from "uqs/BzWorkshop";
import { BzWorkshop } from "uqs";
import { MPerson } from "./UqPerson";

interface Props {
    role: Role;
    header: string | JSX.Element;
    onPersonAdded: (person: MPerson) => void;
}

export function AddPerson({ role, header, onPersonAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let genderOptions = [
        { label: 'female', value: Gender.female },
        { label: 'male', value: Gender.male },
    ];
    let replacer = {
        'no': <BandIDNOInput label="NO" name="no" ID={BzWorkshop.Person} />,
        'gender': <BandRadio label="Gender" name="gender" options={genderOptions} />,
    }
    async function onSubmit(data: BzWorkshop.Person) {
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            ID: BzWorkshop.Person,
            values: [{
                ix: data,
                xi: role,
            }],
        });
        let id = ret[0];
        data.id = id;
        onPersonAdded(data as MPerson);
        nav.close();
    }
    return <Page header={header}>
        <FieldsForm className="m-3" fields={BzWorkshop.Person.fields} replacer={replacer}>
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </FieldsForm>
    </Page>;
}
