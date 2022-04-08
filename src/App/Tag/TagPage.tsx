import { TagPageBase } from 'tonwa-com-uq';
import { useUqTag } from './useUqTag';

export function TagPage() {
    let uqTag = useUqTag();
    return <TagPageBase uqTagProps={uqTag}
        caption="Tags admin"
        icon="tag" iconClass="text-info" />;
}
