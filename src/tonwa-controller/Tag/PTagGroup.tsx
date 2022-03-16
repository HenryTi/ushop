import { Page } from "../Page";
import { FA, List, LMR } from "tonwa-react";
import { openPage } from "../openPage";
import { PAddTag } from "./PAddTag";
import { UqTag, Tag } from "./UqTag";
import { PEditTag } from "./PEditTag";

interface Props {
    uqTag: UqTag;
    icon: string;
    group: Tag;
    tags: Tag[];
}

export function PTagGroup(props: Props) {
    let { uqTag, icon, group, tags } = props;

    function renderTag(tag: Tag, index: number): JSX.Element {
        let { name, vice } = tag;
        let left = <FA name={icon} className="text-info me-3" />;
        let right = <FA name="angle-right" />;
        return <LMR className="px-3 py-2 align-items-center" left={left} right={right}>
            <div>{name}</div>
            <div className="small text-muted">{vice}</div>
        </LMR>
    }

    let onTagClick = async (tag: Tag) => {
        openPage(async () => {
            //let ret = 
            await uqTag.getTagItems(tag);
            return <PEditTag {...props} tag={tag} />;
        });
    };

    let { name, vice } = group;
    let right = <button className="btn btn-sm btn-success me-2"
        onClick={() => openPage(<PAddTag uqTag={uqTag} group={group} />)}>
        <FA name="plus" /> Tag
    </button>;
    return <Page header={vice ?? name} right={right}>
        <div className="">
            <List items={tags} item={{ render: renderTag, onClick: onTagClick }} />
        </div>
    </Page>;
}
