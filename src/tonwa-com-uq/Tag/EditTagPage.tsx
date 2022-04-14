import { Page, useNav, LMR, FA, Detail, BandString, Sep } from "tonwa-com";
import { MutedSmall } from "tonwa-com";
import { Form, Submit } from "tonwa-com";
import { Band } from "tonwa-com";
import { UqTag, Tag, TagWithItems } from "./UqTag";
import { IDListEdit, useIdListEdit } from "../ID";

interface Props {
    uqTag: UqTag;
    tag: TagWithItems;
    onRemoveTag: () => void;
    renderFields: () => JSX.Element;
}

export function EditTagPage({ uqTag, tag, onRemoveTag, renderFields }: Props) {
    let nav = useNav();
    let listEditContext = useIdListEdit(tag.items);
    let pageRight = <button className="btn btn-sm btn-outline-primary me-2" onClick={onRemoveTag}>
        <FA name="trash" /> Delete
    </button>;

    function FormView({ tagItem, onSubmit }: { tagItem: Tag; onSubmit: (data: Tag) => Promise<void> }) {
        return <Form values={tagItem} className="container my-3">
            <BandString name="name" label="Name" />
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </Form>;
    }

    function onItemAdd() {
        function AddPage() {
            async function onAddSubmit(data: Tag) {
                await uqTag.saveTagItem(data);
                listEditContext.onItemChanged(data);
                nav.close();
            }
            return <Page header="Add tag">
                <FormView tagItem={undefined} onSubmit={onAddSubmit} />
            </Page>;
        }
        nav.open(<AddPage />);
    }

    function onItemEdit(tagItem: Tag) {
        async function onDeleteItem() {
            let { name } = tagItem;
            let ret = await nav.confirm(`Do you really want to remove tag '${name}'?`);
            if (ret === true) {
                await uqTag.removeTagItem(tagItem);
                listEditContext.onItemDeleted(tagItem);
                nav.close();
            }
        }
        async function onEditSubmit(data: Tag) {
            let name = data['name']
            await uqTag.saveTagItemName(data, name);
            listEditContext.onItemChanged(data);
            nav.close();
        }
        function EditPage() {
            let right = <button className="btn btn-sm btn-outline-primary me-2"
                onClick={onDeleteItem}>
                Delete
            </button>;
            return <Page header="Edit 1 tag item" right={right}>
                <FormView tagItem={tagItem} onSubmit={onEditSubmit} />
            </Page>;
        }
        nav.open(<EditPage />)
    }
    return <Page header={'Edit'} right={pageRight}>
        <div>
            <Detail values={tag}>
                {renderFields()}
            </Detail>
            <Sep sep={2} />
            <LMR className="mt-4 mb-1 px-3 bg-light">
                <b>Items</b>
                <button className="btn btn-sm btn-success"
                    onClick={onItemAdd}>
                    <FA name="plus" /> Item
                </button>
            </LMR>
            <Sep sep={2} />
            <IDListEdit none={<MutedSmall className="d-block m-3">no items</MutedSmall>}
                context={listEditContext}
                ItemView={ItemView} onItemClick={onItemEdit} />
            <Sep sep={2} />
        </div>
    </Page>;
}

function ItemView({ value: tagItem }: { value: Tag }) {
    let { name } = tagItem;
    return <LMR className="px-3 py-2 align-items-center">
        <FA className="text-info me-3" name="chevron-circle-right" />
        <span>{name}</span>
        <span></span>
    </LMR>;
}
