import { useUqApp } from "App/UqApp";
import { MutedSmall, Page } from "tonwa-com";

export function AboutPage() {
	let app = useUqApp();
	return <Page header="about APP">
		<div className="py-5 px-3 my-3 w-max-30c mx-auto bg-white border border-2 rounded-3">
			<div className="position-relative d-flex align-items-center justify-content-center py-5">
				<div className="text-center">
					<p className="text-danger h5 mb-0">About</p>
					<MutedSmall>version: {app.version}</MutedSmall>
				</div>
			</div>
		</div>
	</Page>;
}
