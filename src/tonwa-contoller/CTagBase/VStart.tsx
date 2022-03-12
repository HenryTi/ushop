import { FA, LMR } from "tonwa-react";
import { VPage } from "../VPage";
import { CTagBase } from "./CTagBase";

export class VStart extends VPage<CTagBase> {
    header(): string | boolean | JSX.Element {
        return 'Tags admin';
    }

    content() {
        let { icon, iconClass } = this.controller;
        return <div className="">
            {this.controller.groups.map((v, index) => {
                let { name, vice } = v;
                let left = <FA name={icon} className={iconClass + ' me-3'} size="lg" />;
                let right = <FA name="angle-right" />;
                return <LMR key={index}
                    onClick={() => this.controller.openTagGroup(v)}
                    className="px-3 py-2 cursor-pointer mb-1 bg-white align-items-center"
                    left={left} right={right}>
                    {vice ?? name}
                </LMR>;
            })}
        </div>;
    }
}
