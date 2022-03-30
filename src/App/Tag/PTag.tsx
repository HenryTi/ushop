import { PTag as PTagBase } from 'tonwa-controller';
import { useUqApp } from '../App';

export function PTag() {
    let app = useUqApp();
    return <PTagBase uqTagProps={app.uqTagProps}
        caption="Tags admin"
        icon="tag" iconClass="text-danger" />;
}
