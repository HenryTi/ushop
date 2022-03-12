import { AppBase, CStringEdit, deepReact, VPage, setReact } from "tonwa-contoller";
import { Uq, ID, IX } from "tonwa-uq";
import { StringSchema, UiTextItem } from "tonwa-react";
import { Controller } from "../Controller";
import { VAddTag } from "./VAddTag";
import { VAddTagItem } from "./VAddTagItem";
import { VDeleteTagItem } from "./VDeleteTagItem";
import { VEditTag } from "./VEditTag";
import { VStart } from "./VStart";
import { VTagGroup } from "./VTagGroup";

export interface Tag {
    id?: number;
    name: string;
    vice?: string;
    single?: number;
}

export interface TagWithItems extends Tag {
    items: Tag[];
}

export interface TagGroup extends Tag {
    tick?: number;
    tags: TagWithItems[];
}

export abstract class CTagBase<A extends AppBase = AppBase> extends Controller<A> {
    currentGroup: Tag;
    tagGroups: { [group: string]: TagGroup } = {};
    deep: {
        tags: Tag[];
        items: Tag[];
        currentTag: Tag;
    }
        = deepReact({
            tags: null,
            items: null,
            currentTag: null,
        });

    abstract get uq(): Uq;
    abstract get TagGroup(): ID;
    abstract get Tag(): ID;
    abstract get TagItem(): ID;
    abstract get IxTag(): IX;

    abstract get groups(): Tag[];
    abstract get caption(): string;
    abstract get icon(): string;
    abstract get iconClass(): string;

    get VStart(): new (c: CTagBase) => VPage<CTagBase> {
        return VStart;
    }

    private groupsLoaded = false;
    protected resetGroups() {
        for (let i in this.tagGroups) {
            let tagGroup = this.tagGroups[i];
            tagGroup.tick = 0;
        }
        this.groupsLoaded = false;
    }
    protected async loadGroups(): Promise<void> {
        if (this.groupsLoaded === true) return;
        let ret = await this.uq.ID<Tag>({
            IDX: this.TagGroup,
            id: undefined,
        });
        for (let group of this.groups) {
            let g = ret.find(v => v.name === group.name);
            if (!g) {
                throw Error(`${group.name} is not defined in UQ`);
            }
            group.id = g.id;
        }
        this.groupsLoaded = true;
    }

    async openMain() {
        await this.loadGroups();
        this.open(this.VStart);
    }

    get VTagGroup(): new (c: CTagBase) => VPage<CTagBase> {
        return VTagGroup;
    }

    async openTagGroup(group: Tag) {
        this.currentGroup = group;
        let ret = await this.uq.IX<Tag>({
            IX: this.IxTag,
            ix: group.id,
            IDX: [this.Tag],
        });
        this.open(this.VTagGroup);
        setReact(() => {
            this.deep.tags = ret;
        });
    }

    get VAddTag(): new (c: CTagBase) => VPage<CTagBase> {
        return VAddTag;
    }
    onAddTag = async () => {
        this.open(this.VAddTag);
    }

    onSaveTag = async (tag: Tag) => {
        let ret = await this.uq.ActIX<Tag>({
            IX: this.IxTag,
            ID: this.Tag,
            values: [{ ix: this.currentGroup.id, xi: tag }]
        });
        tag.id = ret[0];
        this.close();
        setReact(() => {
            this.deep.tags.push(tag);
            this.resetGroups();
        });
    }

    get VEditTag(): new (c: CTagBase) => VPage<CTagBase> {
        return VEditTag;
    }
    onEditTag = async (tag: Tag) => {
        setReact(() => {
            this.deep.currentTag = tag;
            this.open(this.VEditTag);
        });
        let ret = await this.uq.IX<Tag>({
            IX: this.IxTag,
            ix: tag.id,
            IDX: [this.TagItem],
        });
        setReact(() => {
            this.deep.items = ret;
        });
    }

    async removeTag(tag: Tag) {
        await this.uq.ActIX({
            IX: this.IxTag,
            values: [{
                ix: this.currentGroup.id,
                xi: -tag.id,
            }],
        })
        this.close();
        setReact(() => {
            this.resetGroups();
            let { tags } = this.deep;
            let p = tags.findIndex(v => v === tag);
            if (p >= 0) tags.splice(p, 1);
        });
    }

    get VAddTagItem(): new (c: CTagBase) => VPage<CTagBase> {
        return VAddTagItem;
    }
    onAddTagItem = async () => {
        this.open(this.VAddTagItem);
    }

    onSaveTagItem = async (tag: Tag) => {
        let ret = await this.uq.ActIX<Tag>({
            IX: this.IxTag,
            ID: this.TagItem,
            values: [{ ix: this.deep.currentTag.id, xi: tag }]
        });
        tag.id = ret[0];
        this.close();
        setReact(() => {
            this.resetGroups();
            this.deep.items.push(tag);
        });
    }

    onEditTagItem = async (tagItem: Tag) => {
        let onTagItemChanged = async (name: string, value: any): Promise<void> => {
            tagItem.name = value;
            await this.uq.ActIDProp(this.TagItem, tagItem.id, 'name', value);
        }
        let onTagItemDeleted = async (): Promise<void> => {
            let { currentTag, items } = this.deep;
            await this.uq.ActIX({
                IX: this.IxTag,
                values: [{ ix: currentTag.id, xi: -tagItem.id }]
            });
            this.close();
            setReact(() => {
                let p = items.findIndex(v => v === tagItem);
                if (p >= 0) items.splice(p, 1);
            });
        }
        let cStringEdit = new CStringEdit(this.app, {
            itemSchema: { name: 'name', type: 'string', maxLength: 50, required: true } as StringSchema,
            uiItem: { widget: 'text', label: 'Edit tag item' } as UiTextItem,
            onChanged: onTagItemChanged,
            value: tagItem.name,
            exView: this.render(VDeleteTagItem, onTagItemDeleted),
        });
        cStringEdit.onEdit();
    }

    tagPropSave = async (name: string, value: any) => {
        let { deep } = this;
        await this.uq.ActIDProp(this.Tag, deep.currentTag.id, name, value);
        setReact(() => {
            (deep.currentTag as any)[name] = value;
            this.resetGroups();
        });
    }

    async loadGroup(groupName: string): Promise<TagGroup> {
        let tagGroup = this.tagGroups[groupName];
        if (tagGroup !== undefined) {
            let { tick } = tagGroup;
            if (Date.now() - tick < 3600 * 1000) {
                return tagGroup;
            }
            tagGroup = undefined;
            this.tagGroups[groupName] = undefined;
        }
        await this.loadGroups();
        let group = this.groups.find(v => v.name === groupName);
        if (group === undefined) return;
        let ret = await this.uq.IX<Tag>({
            IX: this.IxTag,
            ix: group.id,
            IDX: [this.Tag],
        });
        let retItems = await this.uq.IX<Tag>({
            IX: this.IxTag,
            IX1: this.IxTag,
            ix: group.id,
            IDX: [this.TagItem],
        });
        let tagColl: { [tag: number]: TagWithItems } = {};
        let tags: TagWithItems[] = [];
        for (let row of ret) {
            let tag: TagWithItems = {
                items: [],
                ...row
            };
            tagColl[row.id] = tag;
            tags.push(tag);
        }
        for (let row of retItems) {
            let { ix } = row as any;
            let tag = tagColl[ix];
            if (!tag) continue;
            tag.items.push(row);
        }
        tagGroup = {
            name: group.name,
            tick: Date.now(),
            tags,
        };
        return this.tagGroups[groupName] = tagGroup;
    }
}
