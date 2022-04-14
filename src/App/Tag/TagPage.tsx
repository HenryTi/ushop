import { TagPageBase } from 'tonwa-com-uq';
import { useUqTag } from './useUqTag';

interface Props {
    caption: string;
    icon: string;
    iconClass: string;
}

export function TagPage({ caption, icon, iconClass }: Props) {
    let uqTag = useUqTag();
    return <TagPageBase uqTagProps={uqTag}
        caption={caption}
        icon={icon} iconClass={iconClass} />;
}
