import { CIdBase, Controller, setReact, shallowReact, View } from "tonwa-contoller";
import { IX } from "tonwa-uq";
import { Tag, TagGroup, TagWithItems } from ".";
import { CTagBase } from "./CTagBase";
import { VTagInput } from "./VTagInput";

export class CTagInput extends Controller {
    readonly cTag: CTagBase;
    readonly cId: CIdBase;
    readonly IxID: IX;
    tagGroup: TagGroup;
    id: number;
    shallow: {
        tagMap: Map<number, boolean>;
    } = shallowReact({
        tagMap: new Map<number, boolean>(),
    });

    constructor(cTag: CTagBase, cId: CIdBase, IxID: IX) {
        super(cTag.app);
        this.cTag = cTag;
        this.cId = cId;
        this.IxID = IxID;
    }

    async beforeEdit(tagGroupName: string, id: number): Promise<void> {
        this.tagGroup = await this.cTag.loadGroup(tagGroupName);
        this.id = id;
        let ret = await this.cId.uq.IX<{ ix: number, xi: number }>({
            IX: this.IxID,
            ix: id,
        });
        setReact(() => {
            let { tagMap } = this.shallow;
            tagMap.clear();
            for (let row of ret) {
                let { xi } = row;
                tagMap.set(xi, true);
            }
            // assure radio box only show single value
            for (let tag of this.tagGroup.tags) {
                let { single, items } = tag;
                if (single !== 1) continue;
                let checked = false;
                for (let item of items) {
                    let { id } = item;
                    if (checked === true) {
                        if (tagMap.get(id) === true) {
                            tagMap.set(id, false);
                        }
                    }
                    else {
                        if (tagMap.get(id) === true) {
                            checked = true;
                        }
                    }
                }
            }
        });
    }

    get InputView(): new (c: CTagInput) => View<CTagInput> {
        return VTagInput;
    }

    renderInput(): JSX.Element {
        return this.render(this.InputView);
    }

    onCheckChange = async (tag: TagWithItems, item: Tag, checked: boolean) => {
        let { tagMap } = this.shallow;
        let itemId = item.id;
        let values: { ix: number; xi: number; }[] = [];
        if (tag.single === 1) {
            for (let p of tag.items) {
                if (p === item) continue;
                let pid = p.id;
                if (tagMap.get(pid) === true) {
                    values.push({ ix: this.id, xi: -pid });
                }
            }
            if (checked === false) throw Error('radio should not be false');
            values.push({ ix: this.id, xi: itemId });
        }
        else {
            values.push({ ix: this.id, xi: checked === true ? itemId : -itemId });
        }
        await this.cTag.uq.ActIX({
            IX: this.IxID,
            values,
        });
        setReact(() => {
            for (let v of values) {
                let { xi } = v;
                let idOfItem: number;
                let checkValue: boolean;
                if (xi < 0) {
                    idOfItem = -xi;
                    checkValue = false;
                }
                else {
                    idOfItem = xi;
                    checkValue = true;
                }
                tagMap.set(idOfItem, checkValue);
            }
        });
    }
}