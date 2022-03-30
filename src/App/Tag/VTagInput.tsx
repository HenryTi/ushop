import { VTagGroupInput as VTagInputBase } from "tonwa-controller";
import { useUqApp } from '../App';

interface Props {
    id: number;
}

export function VTagInput({ id }: Props) {
    let app = useUqApp();
    return <VTagInputBase uqTagProps={app.uqTagProps} tagGroupName="workshop-tags" id={id} />;
}
