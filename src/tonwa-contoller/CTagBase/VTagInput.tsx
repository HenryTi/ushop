import React from "react";
import { TagWithItems } from ".";
import { View } from "../View";
import { Tag } from "./CTagBase";
import { CTagInput } from "./CTagInput";

export class VTagInput extends View<CTagInput> {
    render(): JSX.Element {
        let { tagGroup } = this.controller;
        if (!tagGroup) return null;
        let { tags } = tagGroup;
        if (tags.length === 0) return null;
        return <div className="container">
            {tagGroup.tags.map((v, index) => {
                let { name, items } = v;
                return <div key={index} className="row mb-1 py-2 bg-white">
                    <div className="col-2 ps-3 pt-1">{name}</div>
                    <div className="col-10">
                        {items.map((item: Tag, index: number) => this.renderTagItem(v, item, index))}
                    </div>
                </div>
            })}
        </div>;
    }

    private renderTagItem = (tag: TagWithItems, item: Tag, index: number): JSX.Element => {
        let { shallow } = this.controller;
        let { single, name } = tag;
        let type: string;
        let radioName: string;
        if (single === 1) {
            type = 'radio';
            radioName = 'tag-radio-' + name;
        }
        else {
            type = 'checkbox';
        }
        return <React.Fragment key={index}>{this.react(() => {
            let { id, name } = item;
            let { tagMap } = shallow;
            let checked = tagMap.get(id);
            return <label className="w-min-8c me-3 my-2">
                <input className="form-check-input"
                    type={type}
                    name={radioName}
                    defaultChecked={checked}
                    value={id}
                    onChange={evt => this.controller.onCheckChange(tag, item, evt.currentTarget.checked)} /> {name}
            </label>;
        })}</React.Fragment>;
    }
}
