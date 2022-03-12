import { View } from "tonwa-contoller";
import { CEnumSingle } from "./CEnumBase";

export class VEnumSingle<E extends number, C extends CEnumSingle<E>> extends View<C> {
    render() {
        let { caption, enums, enumCaptions, value } = this.controller;
        return <div className="container">
            <div
                className="mb-3 row bg-white align-items-center cursor-pointer">
                <label className="col-sm-2 col-form-label">{caption}</label>
                <div className="col-sm-10">
                    {enums.map(v => {
                        return <label key={v} className="me-4 form-check-inline">
                            <input type="radio" name="staff-role"
                                onChange={this.onChange}
                                defaultChecked={v === value}
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
