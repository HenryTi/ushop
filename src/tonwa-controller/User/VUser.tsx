import { MutedSmall } from "../tool";
import { User, useUser } from "./userCache";

interface Props {
    id: number;     // user id
    render: (user: User) => JSX.Element;
}

export function VUser({ id, render }: Props) {
    let user = useUser(id);
    if (!user) return <MutedSmall>{id}</MutedSmall>;
    return render(user);
}
