import { UPage, useAuth, useNav, User } from 'tonwa-com';
import { Form, Schema, UiSchema, UiTextItem, UiPasswordItem, Context, UiButton, StringSchema } from "tonwa-react";
import { Forget, Register } from './register/Start';
import { getSender } from './tools';

const schema: Schema = [
	{ name: 'username', type: 'string', required: true, maxLength: 100 } as StringSchema,
	{ name: 'password', type: 'string', required: true, maxLength: 100 } as StringSchema,
	{ name: 'login', type: 'submit' },
];

interface Props {
	withBack?: boolean;
	loginTop?: JSX.Element;
	privacy: JSX.Element;
	callback?: (user: User) => Promise<void>
}

export function Login({ withBack, loginTop, privacy, callback }: Props) {
	let nav = useNav();
	let auth = useAuth();
	let { userApi, guest } = auth;
	let onLogin = async (un: string, pwd: string): Promise<boolean> => {
		let user = await userApi.login({
			user: un,
			pwd: pwd,
			guest,
		});

		if (user === undefined) return false;
		console.log("onLoginSubmit: user=%s pwd:%s", user.name, user.token);
		nav.appNav.response.user = user;
		auth.loginChanged(user);
		await callback?.(user);
		return true;
	}

	let uiSchema: UiSchema = {
		items: {
			username: { placeholder: '手机/邮箱/用户名', label: '登录账号' } as UiTextItem,
			password: { widget: 'password', placeholder: '密码', label: '密码' } as UiPasswordItem,
			login: { widget: 'button', className: 'btn btn-primary btn-block mt-3', label: '登录' } as UiButton,
		}
	}

	let onSubmit = async (name: string, context: Context): Promise<string> => {
		let values = context.form.data;
		let un = values['username'];
		let pwd = values['password'];
		if (pwd === undefined) {
			return 'something wrong, pwd is undefined';
		}
		let ret = await onLogin(un, pwd);
		if (ret === true) return;

		let sender = getSender(un);
		let type: string = sender !== undefined ? sender.caption : '用户名';
		return type + '或密码错！';
	}
	let onEnter = async (name: string, context: Context): Promise<string> => {
		if (name === 'password') {
			return await onSubmit('login', context);
		}
	}

	let header = withBack === true ? '登录' : false

	return <UPage header={header} footer={privacy}>
		<div className="d-flex p-5 flex-column justify-content-center align-items-center">
			<div className="flex-fill" />
			<div className="w-20c">
				{loginTop ?? <div className="text-center p-3 fs-5 text-primary">登录</div>}
				<div className="h-2c" />
				<Form schema={schema} uiSchema={uiSchema}
					onButtonClick={onSubmit}
					onEnter={onEnter}
					requiredFlag={false} />
				<div className="text-center">
					<button className="btn btn-link" onClick={() => nav.open(<Forget loginTop={loginTop} privacy={privacy} />)}>
						忘记密码
					</button>
					<button className="btn btn-link" onClick={() => nav.open(<Register loginTop={loginTop} privacy={privacy} />)}>
						注册账号
					</button>
				</div>
			</div>
			<div className="flex-fill" />
			<div className="flex-fill" />
		</div>
	</UPage>;
}
