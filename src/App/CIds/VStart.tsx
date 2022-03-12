import { VPage } from "tonwa-contoller";
import { FA, LMR } from "tonwa-react";
import { CIds } from "./CIds";

export class VStart extends VPage<CIds> {
    header(): string | boolean | JSX.Element {
        return 'Items';
    }

    content() {
        let { cWorkshop, cStaff, cClient, app } = this.controller;
        return <div>{
            [cWorkshop, cStaff, cClient, app.cTag].map((v, index) => {
                if (v.isVisible() === false) return null;
                let { caption, icon, iconClass } = v;
                let right = <FA name="angle-right" />;
                let vIcon = <FA name={icon} className={(iconClass ?? 'text-primary') + ' me-4'} fixWidth={true} size="lg" />;
                return <LMR key={index}
                    className="cursor-pointer bg-white border-bottom py-2 px-3 align-items-center"
                    left={vIcon}
                    right={right}
                    onClick={() => v.openMain()}>{caption}</LMR>
            })
        }</div>;
    }
}
