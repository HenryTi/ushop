import { useEffect, useState } from "react";
import { UqTagProps, useUqTag, Tag, TagGroup, TagWithItems, UqTag } from "./UqTag";

interface Props {
    uqTagProps: UqTagProps;
    id: number;                 // ID id, id 对应的 tags
    tagGroupName: string;
}

export function VTagGroupInput(props: Props) {
    let { uqTagProps, id, tagGroupName } = props;
    let uqTag = useUqTag(uqTagProps);
    let [tg, setTg] = useState<[TagGroup, { [id: number]: boolean }]>(null);
    useEffect(() => {
        async function loadGroup() {
            let ret = await uqTag.loadGroup(tagGroupName); // loadGroup
            let ret1 = await uqTag.loadIDTags(ret, id)
            setTg([ret, ret1]);
        }
        loadGroup();
    }, [uqTag, tagGroupName, id]);

    if (!tg) return null;
    let [tagGroup, idTagValues] = tg;
    let { tags } = tagGroup;
    if (tags.length === 0) return null;
    return <div className="container">
        {tags.map((v, index) => <VTagInput key={index} uqTag={uqTag} tag={v} id={id} idTagValues={idTagValues} />)}
    </div>;
}

interface VTagInputProps {
    uqTag: UqTag;
    tag: TagWithItems;
    id: number;
    idTagValues: { [id: number]: boolean };
}

function VTagInput({ uqTag, tag, id, idTagValues }: VTagInputProps) {
    let { name, items } = tag;
    let [tagArr, setTagArr] = useState<boolean[]>(
        idTagValues ? items.map(v => idTagValues[v.id] === true) : []
    );
    let onCheckChange = async (tag: TagWithItems, item: Tag, checked: boolean) => {
        let itemId = item.id;
        let { single, items } = tag;
        let values: { ix: number; xi: number; index: number }[] = [];
        if (single === 1) {
            let len = items.length;
            let iMe: number;
            for (let i = 0; i < len; i++) {
                let p = items[i];
                if (p === item) {
                    iMe = i;
                    continue;
                }
                let pid = p.id;
                if (tagArr[i] === true) {
                    values.push({ ix: id, xi: -pid, index: i });
                }
            }
            if (checked === false) throw Error('radio should not be false');
            values.push({ ix: id, xi: itemId, index: iMe });
        }
        else {
            let index = items.findIndex(v => v === item);
            values.push({ ix: id, xi: checked === true ? itemId : -itemId, index });
        }
        await uqTag.saveTagItems(values);
        for (let v of values) {
            let { xi, index } = v;
            //let idOfItem: number;
            let checkValue: boolean;
            if (xi < 0) {
                //idOfItem = -xi;
                checkValue = false;
            }
            else {
                //idOfItem = xi;
                checkValue = true;
            }
            if (index !== undefined) {
                setTagArr(arr => {
                    let ret = [...arr];
                    ret[index] = checkValue;
                    return ret;
                });
                // tagMap.set(idOfItem, checkValue);
            }
        }
    }

    let renderTagItem = (tag: TagWithItems, item: Tag, index: number): JSX.Element => {
        let { id, single, name } = tag;
        let type: string;
        let radioName: string;
        if (single === 1) {
            type = 'radio';
            radioName = 'tag-radio-' + name;
        }
        else {
            type = 'checkbox';
        }
        let checked = tagArr[index]; // .get(id);
        return <label key={id} className="w-min-8c me-3 my-2 form-check-label">
            <input className="form-check-input me-2"
                type={type}
                name={radioName}
                defaultChecked={checked}
                value={id}
                onChange={evt => onCheckChange(tag, item, evt.currentTarget.checked)} />
            {item.name}
        </label>;
    }
    return <div className="row mb-1 py-2 bg-white">
        <div className="col-2 ps-3 pt-1">{name}</div>
        <div className="col-10">
            {items.map((item: Tag, index: number) => renderTagItem(tag, item, index))}
        </div>
    </div>
}
