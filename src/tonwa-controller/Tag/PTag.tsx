import { FA, LMR } from "tonwa-react";
import { openPage } from "../openPage";
import { Page } from "../Page";
import { PTagGroup } from './PTagGroup';
import { UqTagProps, Tag, useUqTag } from "./UqTag";

interface Props {
    uqTagProps: UqTagProps;
    caption: string;
    icon: string;
    iconClass: string;
}

export function PTag(props: Props) {
    let { uqTagProps, caption, icon, iconClass } = props;
    let { groups } = uqTagProps;
    let uqTag = useUqTag(uqTagProps);
    function openTagGroup(group: Tag) {
        //this.currentGroup = group;
        openPage(async () => {
            let ret = await uqTag.getTags(group);
            return <PTagGroup uqTag={uqTag} icon={icon} group={group} tags={ret} />
        });
    }

    return <Page header={caption}>
        <div className="">
            {groups.map(v => <VTagGroupItem group={v}
                icon={icon} iconClass={iconClass}
                openTagGroup={openTagGroup} />)}
        </div>
    </Page>;
}

interface GroupItemProps {
    icon: string;
    iconClass: string;
    group: Tag;
    openTagGroup: (group: Tag) => void;
}
function VTagGroupItem({ group, icon, iconClass, openTagGroup }: GroupItemProps) {
    let { id, name, vice } = group;
    let left = <FA name={icon} className={iconClass + ' me-3'} size="lg" />;
    let right = <FA name="angle-right" />;
    return <LMR key={id}
        onClick={() => openTagGroup(group)}
        className="px-3 py-2 cursor-pointer mb-1 bg-white align-items-center"
        left={left} right={right}>
        {vice ?? name}
    </LMR>;
}
