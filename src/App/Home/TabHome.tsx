import logo from '../../logo.svg';
import '../../App.css';
import { TestView } from "./TestView";
import { useEffect } from "react";
import { proxy } from 'valtio';
import { FA, Page } from 'tonwa-com';

/*
interface Props {
	tick: Tick;
}
*/

interface Item {
	id: number;
	name: string;
}

export interface Tick {
	count: number;
	text: string;
	list: Item[];
}

const tick = proxy<Tick>({
	count: 0,
	text: 'ok',
	list: [],
});

export function TabHome() {
	useEffect(() => {
		let timer = setInterval(() => {
			++tick.count;
			let item = tick.list[3];
			if (item) {
				if (item.name.length > 100) item.name = '';
				item.name += ' - ' + Date.now();
			}
		}, 2000);
		return () => {
			clearInterval(timer);
		}
	}, []);

	let items: string[] = [
		'在服务器端创建 app',
		'创建 uq 编程单元',
		'uq 关联 app',
		'uq 绑定数据库服务',
		'编写 uq 代码',
		'提交 uq 编译生成数据库',
		'在 src/appConfig.ts 设置 uqs',
		'在 vs code 调试环境运行Build UqApp，生成uq typescript interface',
		'调用 uq 接口，读写数据',
	];
	return <Page header="首页">
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					<span className="text-success">tonwa</span> + <span className="text-primary">uq</span> = UI + DB
				</p>
				<div className="mb-3 h6 text-warning">
					编程
					<FA name="handshake-o" size="lg" className="text-danger mx-2" />
					开心
				</div>
			</header>
			<TestView tick={tick} />
			<ul className="text-start my-3 me-3">
				{items.map((v, index) => <li key={index} className="my-2">{v}</li>)}
			</ul>
		</div>
	</Page>;
}
