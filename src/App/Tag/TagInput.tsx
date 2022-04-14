import { BandTemplateProps } from "tonwa-com";
import { TagInputBase } from "tonwa-com-uq";
import { useUqTag } from "./useUqTag";

interface Props {
    id: number;
    className?: string;
    tagGroupName: string;
    BandTemplate?: (props: BandTemplateProps) => JSX.Element;
    top?: JSX.Element;
    bottom?: JSX.Element;
}

export function TagInput(props: Props) {
    let uqTag = useUqTag();
    return <TagInputBase {...props} uqTagProps={uqTag} />;
}
