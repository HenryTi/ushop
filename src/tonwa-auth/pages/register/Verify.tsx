import { Schema, UiSchema, UiTextItem, UiButton, Form, Context, NumSchema } from 'tonwa-react';
import { Page } from "tonwa-com";
import { Pass } from './Pass';

type OnVerify = (verify: string) => Promise<number>;

interface Props {
    pass: Pass;
    onVerify: OnVerify;
}

export function Verify({ pass, onVerify }: Props) {
    let { type, account } = pass;
    let schema: Schema = [
        { name: 'verify', type: 'number', required: true, maxLength: 6 } as NumSchema,
        { name: 'submit', type: 'submit' },
    ]

    let onVerifyChanged = (context: Context, value: any, prev: any) => {
        context.setDisabled('submit', !value || (value.length !== 6));
    }
    let uiSchema: UiSchema = {
        items: {
            verify: {
                widget: 'text',
                label: '验证码',
                placeholder: '请输入验证码',
                onChanged: onVerifyChanged,
            } as UiTextItem,
            submit: {
                widget: 'button',
                className: 'btn btn-primary btn-block mt-3',
                label: '下一步 >',
                disabled: true
            } as UiButton,
        }
    }

    let onSubmit = async (name: string, context: Context): Promise<string> => {
        let verify = context.getValue('verify');
        let ret = await onVerify(verify);
        if (ret === 0) {
            context.setError('verify', '验证码错误');
            return;
        }
    }

    let onEnter = async (name: string, context: Context): Promise<string> => {
        if (name === 'verify') {
            return await onSubmit('submit', context);
        }
    }

    let typeText: string, extra: any;
    switch (type) {
        case 'mobile': typeText = '手机号'; break;
        case 'email':
            typeText = '邮箱';
            extra = <><span className="text-danger">注意</span>: 有可能误为垃圾邮件，请检查<br /></>;
            break;
    }
    return <Page header="验证码">
        <div className="w-max-20c my-5 py-5"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            验证码已经发送到{typeText}<br />
            <div className="py-2 px-3 my-2 text-primary bg-light"><b>{account}</b></div>
            {extra}
            <div className="h-1c" />
            <Form schema={schema} uiSchema={uiSchema}
                onButtonClick={onSubmit}
                onEnter={onEnter}
                requiredFlag={false} />
        </div>
    </Page>;
}
