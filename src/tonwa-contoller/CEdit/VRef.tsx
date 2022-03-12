import { View } from "tonwa-contoller";
import { FA } from "tonwa-react";
import { CEdit } from "./CEdit";

export class VRef extends View<CEdit> {
    render() {
        let { shallowValue, props } = this.controller;
        let { pick } = props;
        if (pick) return pick.ref();
        return this.react(() => {
            let { value } = shallowValue;
            return <div>{value ?? <small className="text-muted"> - </small>}</div>;
        });
    }
}

export class VEditIcon extends View<CEdit> {
    render() {
        return <FA name="pencil-square-o" className="text-primary" />;
    }
}