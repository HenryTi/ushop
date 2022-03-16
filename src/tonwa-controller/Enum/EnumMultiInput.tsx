import { EnumProps } from "./EnumProps";

interface Props {
    id: number;
    values: number[];
    enumProps: EnumProps;
}

export function EnumMultiInput(props: Props) {
    let { id, values, enumProps } = props;
    let { enums, caption, enumCaptions, uq, IX, onEnumChanged } = enumProps;
    let onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        let { currentTarget } = evt;
        let enm = Number(currentTarget.value);
        let values = enums.map(v => (
            { ix: id, xi: v as number }
        ));
        // delete all other roles
        for (let v of values) {
            if (v.xi !== enm) {
                v.xi = -v.xi;
            }
        }
        await uq.ActIX({
            IX,
            values
        });
        onEnumChanged?.(enm);
    }

    return <div className="container">
        <div
            className="mb-3 row bg-white align-items-center cursor-pointer">
            <label className="col-sm-2 col-form-label">{caption}</label>
            <div className="col-sm-10">
                {enums.map(v => {
                    let isChecked = (values.findIndex(e => e === v) >= 0);
                    return <label key={v} className="me-4 form-check-inline">
                        <input type="checkbox" name="staff-role"
                            onChange={onChange}
                            defaultChecked={isChecked}
                            defaultValue={v} /> {enumCaptions[v]}
                    </label>;
                })}
            </div>
        </div>
    </div>;
}
