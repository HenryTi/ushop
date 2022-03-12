import { createEdit, VPage } from "tonwa-contoller";
import { FA, ItemSchema, List, LMR, NumSchema, StringSchema, UiCheckItem, UiSchema } from "tonwa-react";
import { CTagBase, Tag } from ".";

export class VEditTag extends VPage<CTagBase> {
    header(): string | boolean | JSX.Element {
        return 'Edit ' + this.controller.deep.currentTag.name;
    }

    right() {
        return <button className="btn btn-sm btn-light me-2" onClick={this.onRemoveTag}>
            <FA name="trash" />
        </button>;
    }

    private onRemoveTag = async () => {
        let { currentTag } = this.controller.deep;
        let { name } = currentTag;
        let ret = await this.confirm(`Do you really want to remove tag '${name}'?`);
        if (ret === true) {
            await this.controller.removeTag(currentTag);
        }
    }

    content() {
        let right = <button className="btn btn-sm btn-success"
            onClick={this.controller.onAddTagItem}>
            <FA name="plus" /> Item
        </button>;
        return this.react(() => {
            return <div>
                {this.renderProps()}
                <LMR className="mt-4 mb-1 px-3" right={right}>
                    Items
                </LMR>
                <List items={this.controller.deep.items} item={{ render: this.renderItem, onClick: this.onItemClick }} />
            </div>;
        });
    }

    private renderItem = (tagItem: Tag, index: number) => {
        let { name } = tagItem;
        let left = <FA className="text-info me-3" name="square-o" />;
        return <LMR className="px-3 py-2 align-items-center" left={left}>
            {name}
        </LMR>;
    }

    private onItemClick = (tagItem: Tag) => {
        this.controller.onEditTagItem(tagItem);
    }

    protected renderProps() {
        return this.react(() => {
            let { deep } = this.controller;
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
            let { currentTag } = deep;
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
                let cEdit = createEdit(this.controller.app, {
                    itemSchema: v,
                    uiItem,
                    value,
                    onChanged: this.controller.tagPropSave
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
        });
    }
}