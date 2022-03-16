import { FA, ItemSchema, List, LMR, NumSchema, StringSchema, UiCheckItem, UiSchema, UiTextItem } from "tonwa-react";
import { createEdit, CStringEdit } from "../CEdit";
import { getAppBase } from "../AppBase";
import { Page } from "../Page";
import { UqTag, Tag } from "./UqTag";
import { openPage } from "../openPage";
import { VDeleteTagItem } from "./VDeleteTagItem";
import { PAddTagItem } from "./PAddTagItem";

interface Props {
    uqTag: UqTag;
    group: Tag;
    tag: Tag;
}

export function PEditTag({ uqTag, group, tag }: Props) {
    let app = getAppBase();
    let onRemoveTag = async () => {
        let { name } = tag;
        let ret = await app.confirm(`Do you really want to remove tag '${name}'?`);
        if (ret === true) {
            await uqTag.removeTag(group, tag);
        }
    }

    let pageRight = <button className="btn btn-sm btn-light me-2" onClick={onRemoveTag}>
        <FA name="trash" />
    </button>;

    let renderItem = (tagItem: Tag, index: number) => {
        let { name } = tagItem;
        let left = <FA className="text-info me-3" name="square-o" />;
        return <LMR className="px-3 py-2 align-items-center" left={left}>
            {name}
        </LMR>;
    }

    let onItemClick = (tagItem: Tag) => {
        let onTagItemChanged = async (name: string, value: any): Promise<void> => {
            tagItem.name = value;
            //await this.uq.ActIDProp(this.TagItem, tagItem.id, 'name', value);
            await uqTag.saveTagItemName(tagItem, value);
        }
        let onTagItemDeleted = async (): Promise<void> => {
            await uqTag.removeTagItem(tagItem);
            app.close();
        }
        let cStringEdit = new CStringEdit(app, {
            itemSchema: { name: 'name', type: 'string', maxLength: 50, required: true } as StringSchema,
            uiItem: { widget: 'text', label: 'Edit tag item' } as UiTextItem,
            onChanged: onTagItemChanged,
            value: tagItem.name,
            exView: <VDeleteTagItem onTagItemDeleted={onTagItemDeleted} />,
        });
        cStringEdit.onEdit();
    }

    let tagPropSave = async (name: string, value: any) => {
        await uqTag.saveTagProp(tag, name, value);
        (tag as any)[name] = value;
        uqTag.resetGroups();
    }

    function renderProps() {
        let schema: ItemSchema[] = [
            { name: 'name', type: 'string', required: true } as StringSchema,
            { name: 'vice', type: 'string' } as StringSchema,
            { name: 'single', type: 'number' } as NumSchema,
        ];
        let uiSchema: UiSchema = {
            items: {
                name: {
                    label: 'Name',
                },
                vice: {
                    label: 'Discription'
                },
                single: {
                    widget: 'checkbox',
                    label: 'Singular',
                    defaultValue: 0,
                    trueValue: 1,
                    falseValue: 0,
                } as UiCheckItem,
            }
        }
        let { currentTag } = uqTag;
        if (!uiSchema) {
            uiSchema = { items: {} };
        }
        let vProps = schema.map((v, index) => {
            let { name } = v;
            let uiItem = uiSchema.items[name];
            let label: string | JSX.Element;
            let readOnly: boolean;
            if (uiItem) {
                label = uiItem.label ?? name;
                readOnly = uiItem.readOnly;
            }
            else {
                label = name;
                readOnly = false;
            }
            let value = (currentTag as any)[name];
            let cEdit = createEdit({
                itemSchema: v,
                uiItem,
                value,
                onChanged: tagPropSave
            });
            let right = cEdit.renderEditIcon();
            let onEdit: any;
            let cn = 'mb-1 row bg-white align-items-center ';
            if (readOnly === true) {
                onEdit = undefined;
            }
            else {
                onEdit = cEdit.onEdit;
                cn += 'cursor-pointer ';
            }
            return <div key={index} onClick={onEdit}
                className={cn}>
                <label className="col-sm-2 col-form-label">{label}</label>
                <div className="col-sm-10">
                    <LMR right={readOnly !== true && right}>
                        {cEdit.renderRef()}
                    </LMR>
                </div>
            </div>
        });
        return <div className="container">{vProps}</div>;
    }

    let right = <button className="btn btn-sm btn-success"
        onClick={() => openPage(<PAddTagItem uqTag={uqTag} />)}>
        <FA name="plus" /> Item
    </button>;
    return <Page header={'Edit ' + tag.name}
        right={pageRight}>
        <div>
            {renderProps()}
            <LMR className="mt-4 mb-1 px-3" right={right}>
                Items
            </LMR>
            <List items={uqTag.items} item={{ render: renderItem, onClick: onItemClick }} />
        </div>
    </Page>;
}