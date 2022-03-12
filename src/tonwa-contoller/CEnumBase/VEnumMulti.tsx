import { View } from "tonwa-contoller";
import { CEnumMulti } from "./CEnumBase";

export class VEnumMulti<E extends number, C extends CEnumMulti<E>> extends View<C> {
    render() {
        let { caption, enums, enumCaptions, values } = this.controller;
        return <div className="container">
            <div
                className="mb-3 row bg-white align-items-center cursor-pointer">
                <label className="col-sm-2 col-form-label">{caption}</label>
                <div className="col-sm-10">
                    {enums.map(v => {
                        let isChecked = (values.findIndex(e => e === v) >= 0);
                        return <label key={v} className="me-4 form-check-inline">
                            <input type="checkbox" name="staff-role"
                                onChange={this.onChange}
                                defaultChecked={isChecked}
                                defaultValue={v} /> {enumCaptions[v]}
                        </label>;
                    })}
                </div>
            </div>
        </div>;
    }

    onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        let { currentTarget } = evt;
        await this.controller.saveIxEnum(Number(currentTarget.value) as E);
    }
}
