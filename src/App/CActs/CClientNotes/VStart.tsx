import { CSelectOne, VPage } from "tonwa-controller";
import { FA, List, LMR } from "tonwa-react";
import { CClientNotes } from "./CClientNotes";

export class VStart extends VPage<CClientNotes> {
    header(): string | boolean | JSX.Element {
        return 'Client notes';
    }

    right(): JSX.Element {
        return <button className="btn btn-sm btn-primary me-2" onClick={this.onSearch}>
            <FA name="search" />
        </button>;
    }

    content(): JSX.Element {
        let { clients } = this.controller.deepData;
        return <div className="">
            <List items={clients}
                item={{ render: this.renderItem, onClick: this.controller.showClient }} />
        </div>;
    }

    private renderItem = (item: any, index: number) => {
        let { icon } = this.controller.cClient;
        let vIcon: any;
        if (icon) {
            vIcon = <FA name="user-o" className="me-3 text-primary " fixWidth={true} />;
        }
        let right = <FA name="angle-right" />
        return <LMR className="px-3 py-2 align-items-center" left={vIcon} right={right}>
            <div>
                {this.controller.cClient.renderItemInList(item)}
            </div>
        </LMR>;
    }

    private onSearch = async () => {
        let cSelectOne = new CSelectOne(this.controller.cClient);
        let ret = await cSelectOne.select();
        if (!ret) return;
        this.controller.showClient(ret as any);
    }
}
