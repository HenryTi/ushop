import { useUqApp } from "App/App";
import { useRef } from "react";

export function useUqTag() {
    let app = useUqApp();
    let uq = app.uqs.BzWorkshop;
    let uqTag = useRef({
        uq,
        TagGroup: uq.TagGroup,
        Tag: uq.Tag,
        TagItem: uq.TagItem,
        IxTag: uq.IxTag,
        IxIDTag: uq.IxGlobalIdTag,
        groups: [
            { name: 'workshop-tags', vice: 'Workshop tags' },
            { name: 'client-tags', vice: 'Client tags' },
            { name: 'staff-tags', vice: 'Staff tags' },
        ] as any,
    });
    return uqTag.current;
}
