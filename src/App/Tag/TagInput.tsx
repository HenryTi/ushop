import { TagInputBase } from "tonwa-com-uq";
import { useUqTag } from "./useUqTag";

interface Props {
    id: number;
    className?: string;
}

export function TagInput({ id, className }: Props) {
    let uqTag = useUqTag();
    return <TagInputBase uqTagProps={uqTag} tagGroupName="workshop-tags" id={id} className={className} />;
}
