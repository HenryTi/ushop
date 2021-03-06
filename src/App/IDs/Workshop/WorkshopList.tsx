import { useEffect } from "react";
import { Band, FA, LMR, Page, Submit, useNav } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-com-uq";
import { useUqApp } from "../../UqApp";
import { Workshop } from "uqs/BzWorkshop";
import { WorkshopItem } from "./WorkshopItem";
//import { TestPage } from "./TestPage";
import { TagInput } from "App/Tag";
import { SessionList } from "./SessionList";

interface Props {
    caption: string;
    icon: string;
    iconClass: string;
}

export function WorkshopList(props: Props) {
    let app = useUqApp();
    let nav = useNav();
    let { caption, icon, iconClass } = props;
    function ItemView({ value: item }: { value: Workshop }) {
        return <LMR className="px-3 py-2 align-items-center">
            <FA name={icon} className={'me-4 ' + iconClass} fixWidth={true} size="lg" />
            <div><WorkshopItem item={item} /></div>
            <FA name="angle-right" />
        </LMR>;
    }
    let listEditContext = useIdListEdit<Workshop>(undefined)
    useEffect(() => {
        async function loadList() {
            let { BzWorkshop } = app.uqs;
            let ret = await BzWorkshop.QueryID<Workshop>({
                ID: BzWorkshop.Workshop,
                page: { start: 0, size: 10 },
                order: 'desc',
            });
            listEditContext.setItems(ret);
        }
        loadList();
    }, [app, listEditContext]);

    let { BzWorkshop } = app.uqs;
    let { Workshop: UqIDWorkshop } = BzWorkshop;
    let { fields } = UqIDWorkshop;
    let onAdd = async () => {
        function AddPage() {
            async function onSubmit(data: Workshop) {
                listEditContext.onItemChanged(data);
            }
            function FormView({ className, values, onSubmit }: {
                className?: string;
                values?: Workshop;
                onSubmit: (data: Workshop) => Promise<void>;
            }) {
                let replacer = {
                    'no': <BandIDNOInput label="NO" name="no" ID={UqIDWorkshop} />,
                }
                return <FieldsForm className={className} fields={fields} replacer={replacer} values={values}>
                    <Band>
                        <Submit onSubmit={onSubmit} />
                    </Band>
                </FieldsForm>
            }
            return <Page header="Add workshop">
                <FormView className="p-3" values={undefined} onSubmit={onSubmit} />
            </Page>;
        }
        nav.open(<AddPage />);
    };

    let onEditItem = (item: Workshop): Promise<void> => {
        function EditPage() {
            let { id } = item;
            async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
                let newItem = { ...item };
                let { name, value } = values;
                (newItem as any)[name] = value;
                switch (name) {
                    default:
                        await BzWorkshop.ActIDProp(UqIDWorkshop, id, name, value);
                        break;
                    case 'staff':
                        await BzWorkshop.SaveWorkshopStaff.submit({ id, staff: value });
                        break;
                }
                listEditContext.onItemChanged(newItem);
            }
            return <Page header="Detail">
                <FieldsDetail className="my-3 border-2 border-top border-bottom"
                    values={item}
                    fields={fields}
                    onValuesChanged={onValuesChanged}>
                </FieldsDetail>
                <TagInput id={id} className="my-3 border-2 border-top border-bottom"
                    tagGroupName="workshop-tags" />
                <SessionList workshop={item} />
            </Page>;
        }
        nav.open(<EditPage />);
        return;
    };

    let right = <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
        <FA name="plus" />
    </button>;

    return <Page header={caption} right={right}>
        <IDListEdit context={listEditContext} itemKey="id" ItemView={ItemView} onItemClick={onEditItem} />
    </Page>;
}
