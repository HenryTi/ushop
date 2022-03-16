import { VTagGroupInput as VTagInputBase } from "tonwa-controller";
import { useApp } from '../App';

interface Props {
    id: number;
}

export function VTagInput({ id }: Props) {
    let app = useApp();
    return <VTagInputBase uqTagProps={app.uqTagProps} tagGroupName="workshop-tags" id={id} />;
}
