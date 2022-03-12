import { Controller, AppBase, View } from "tonwa-contoller";
import { Uq, IX } from "tonwa-uq";
import { VEnumMulti, VEnumSingle } from ".";

export abstract class CEnumBase<E extends number> extends Controller {
    abstract get enums(): E[];
    abstract get enumCaptions(): { [e in E]?: string }

    abstract get caption(): string;
    abstract get uq(): Uq;
    abstract get IX(): IX;
    abstract get VInput(): new (c: this) => View<this>;
    abstract get OnEnumChanged(): (vale: E) => Promise<void>;

    isInEnum(e: E): boolean { return this.enumCaptions[e] !== undefined; }
    renderInput(): JSX.Element {
        return this.render(this.VInput as any);
    }
}

export abstract class CEnumSingle<E extends number> extends CEnumBase<E> {
    readonly id: number;
    value: E;
    constructor(nav: AppBase, id: number, value: E) {
        super(nav);
        this.id = id;
        this.value = value;
    }

    get VInput(): new (c: this) => View<this> {
        return VEnumSingle as any;
    }

    saveIxEnum = async (e: E) => {
        let values = this.enums.map(v => (
            { ix: this.id, xi: v as number }
        ));
        // delete all other roles
        for (let v of values) {
            if (v.xi !== e) {
                v.xi = -v.xi;
            }
        }
        await this.uq.ActIX({
            IX: this.IX,
            values
        });
        if (this.OnEnumChanged) this.OnEnumChanged(e);
    }
}

export abstract class CEnumMulti<E extends number> extends CEnumBase<E> {
    readonly id: number;
    values: E[];
    constructor(nav: AppBase, id: number, values: E[]) {
        super(nav);
        this.id = id;
        this.values = values;
    }

    get VInput(): new (c: this) => View<this> {
        return VEnumMulti as any;
    }

    saveIxEnum = async (e: E) => {
        let values = this.enums.map(v => (
            { ix: this.id, xi: v as number }
        ));
        // delete all other roles
        for (let v of values) {
            if (v.xi !== e) {
                v.xi = -v.xi;
            }
        }
        await this.uq.ActIX({
            IX: this.IX,
            values
        });
    }
}
