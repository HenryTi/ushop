import { PTag as PTagBase } from 'tonwa-controller';
import { useApp } from '../App';

export function PTag() {
    let app = useApp();
    return <PTagBase uqTagProps={app.uqTagProps}
        caption="Tags admin"
        icon="tag" iconClass="text-danger" />;
}
