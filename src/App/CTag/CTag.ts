import { App } from "../App";
import { CTagBase, Tag } from "tonwa-contoller";
import { ID, IX } from "tonwa-uq";
import { UQs } from "uq-app";
import * as BzWorkshop from 'uq-app/uqs/BzWorkshop';

export class CTag extends CTagBase<App> {
    readonly uqs: UQs;
    readonly uq: BzWorkshop.UqExt;
    readonly TagGroup: ID;
    readonly Tag: ID;
    readonly TagItem: ID;
    readonly IxTag: IX;
    readonly IxLocalIdTag: IX;
    readonly IxGlobalIdTag: IX;
    readonly groups: Tag[] = [
        { name: 'workshop-tags', vice: 'Workshop tags' },
        { name: 'client-tags', vice: 'Client tags' },
        { name: 'staff-tags', vice: 'Staff tags' },
    ];

    constructor(app: App) {
        super(app);
        this.uqs = app.uqs;
        this.uq = this.uqs.BzWorkshop;
        this.TagGroup = this.uq.TagGroup;
        this.Tag = this.uq.Tag;
        this.TagItem = this.uq.TagItem;
        this.IxTag = this.uq.IxTag;
        this.IxLocalIdTag = this.uq.IxLocalIdTag;
        this.IxGlobalIdTag = this.uq.IxGlobalIdTag;
    }

    get caption(): string { return 'Tags admin'; }
    get icon(): string { return 'tag'; }
    get iconClass(): string { return 'text-danger'; }

    isVisible(): boolean {
        return this.app.meAdmin;
    }
}
