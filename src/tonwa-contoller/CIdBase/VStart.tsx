import { FA, List, LMR } from "tonwa-react";
import { VPage } from "../VPage";
import { CIdBase } from "./CIdBase";

export class VStart extends VPage<CIdBase> {
    header() { return this.controller.caption; }
    right() {
        return <button className="btn btn-sm btn-success me-2" onClick={this.controller.onAdd}>
            <FA name="plus" />
        </button>;
    }
    content() {
        return this.react(() => <List items={this.controller.deepData.list}
            item={{ render: this.renderItem, onClick: this.controller.onEditItem }} />
        );
    }

    private renderItem = (item: any, index: number) => {
        let { icon, iconClass } = this.controller;
        let vIcon: any;
        if (icon) {
            vIcon = <FA name={icon} className={'me-4 ' + (iconClass ?? 'text-primary')} fixWidth={true} size="lg" />;
        }
        let right = <FA name="angle-right" />
        return <LMR className="px-3 py-2 align-items-center" left={vIcon} right={right}>
            <div>
                {this.controller.renderItemInList(item)}
            </div>
        </LMR>;
    }
}
