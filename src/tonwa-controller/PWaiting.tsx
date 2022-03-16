import { FA } from "tonwa-react";
import { Page } from "./Page";

export function PWaiting() {
    return <Page header="..." back="none" headerClassName="bg-secondary">
        <div className="p-5 text-center">
            <FA name="spinner" size="lg" className="text-info" spin={true} />
        </div>
    </Page>;
}
