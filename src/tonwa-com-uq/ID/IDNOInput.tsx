import { useCallback } from "react";
import { ID } from "tonwa-uq";
import { useBand, useForm, usePromise, Band, BandProps, CharInputBase } from "tonwa-com";

interface Props {
    name: string;
    ID: ID;
    editable?: boolean;
}

export function IDNOInput({ name, ID, editable }: Props) {
    let band = useBand();
    let form = useForm();
    let getNO = useCallback(async function () {
        if (!band) return;
        let ret = (form?.props?.values?.[name]);
        if (ret !== undefined) return ret;
        ret = await ID.NO();
        form.setValue(name, ret);
        return ret;
    }, [band, form, name, ID]);
    let no = usePromise(getNO);
    return <CharInputBase name={name} placeholder="" maxLength={20} readOnly={!editable === true} initValue={no} />;
}

export function RowIDNOInput(props: BandProps & Props) {
    return <Band {...props}>
        <IDNOInput {...props} />
    </Band>;
}
