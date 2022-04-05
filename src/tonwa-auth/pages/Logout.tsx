import { Page, useAuth, useNav } from "tonwa-com";

export function Logout({ onLogout, resetAll }: { onLogout: () => Promise<void>; resetAll: () => void; }) {
	let nav = useNav();
	let auth = useAuth();
	// let header = this.isWebNav === true ? false : '安全退出';
	function onClickLogout() {
		nav.close();
		auth.loginChanged(undefined);
		onLogout?.();
	}
	let header = '安全退出';
	let footer = <div className="mt-5 text-center justify-content-center">
		<button className="btn btn-outline-warning" onClick={resetAll}>升级软件</button>
	</div>;
	return <Page back="back" header={header} footer={footer}>
		<div className="d-grid">
			<div className="m-5 border border-info bg-white rounded-3 p-5 text-center">
				<div>退出当前账号不会删除任何历史数据，下次登录依然可以使用本账号</div>
				<div className="mt-5 text-center">
					<button className="btn btn-danger" onClick={onClickLogout}>安全退出</button>
				</div>
			</div>
		</div>
	</Page>;
}
