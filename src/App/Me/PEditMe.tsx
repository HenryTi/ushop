import {
    ItemSchema, StringSchema, ImageSchema, UiTextItem, UiImageItem,
    Edit, UiSchema, Prop, FA, IconText, PropGrid
} from "tonwa";
import { tonwa } from "tonwa-core";
import { Page } from 'tonwa-controller';
import { t } from "./t";

export function PEditMe() {
    let schema: ItemSchema[] = [
        { name: 'nick', type: 'string' } as StringSchema,
        { name: 'icon', type: 'image' } as ImageSchema,
    ];
    let uiSchema: UiSchema = {
        items: {
            nick: { widget: 'text', label: '别名', placeholder: '好的别名更方便记忆' } as UiTextItem,
            icon: { widget: 'image', label: '头像' } as UiImageItem,
        }
    }
    let { nick, icon } = tonwa.user;
    let data: { [name: string]: string } = {
        nick: nick,
        icon: icon,
    };

    let onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await tonwa.net.userApi.userSetProp(name, newValue);
        data[name] = newValue;
        tonwa.user.name = newValue;
        tonwa.saveLocalUser();
    }

    let onExit = () => {
        tonwa.showLogout();
    }

    let changePassword = async () => {
        await tonwa.changePassword();
    }

    let userQuit = async () => {
        await tonwa.userQuit();
    }

    let gridRows: Prop[] = [
        '',
        {
            type: 'component',
            component: <IconText iconClass="text-info me-2" icon="key" text={t('changePassword')} />,
            onClick: changePassword
        },
        '',
        {
            type: 'component',
            component: <IconText iconClass="text-info me-2" icon="key" text={t('quitUser')} />,
            onClick: userQuit
        },
        '',
        '',
        {
            type: 'component',
            bk: '',
            component: <div className="w-100 text-center">
                <button className="btn btn-danger w-100 w-max-20c" onClick={onExit}>
                    <FA name="sign-out" size="lg" /> {t('logout')}
                </button>
            </div>
        },
    ];

    return <Page header="个人信息">
        <div>
            <Edit schema={schema} uiSchema={uiSchema}
                data={data}
                onItemChanged={onItemChanged} />
            <PropGrid rows={gridRows} values={{}} />
        </div>
    </Page>;
}
/*
const webUserSchema: ItemSchema[] = [
    { name: 'firstName', type: 'string', required: true } as StringSchema,
    { name: 'gender', type: 'string' } as StringSchema,
    { name: 'salutation', type: 'string' } as StringSchema,
    { name: 'organizationName', type: 'string', required: true } as StringSchema,
    { name: 'departmentName', type: 'string' } as StringSchema,
];
*/
