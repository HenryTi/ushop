import { useEffect, useState } from "react";
import { User } from "tonwa-uq";
import { useUqAppBase } from "./UqAppBase";

interface Props {
    id: number;
    className?: string;
    Template?: (props: { user: User; }) => JSX.Element;
}

const usersCache: { [id: number]: User } = {};

export function UserView({ id, className, Template }: Props) {
    let app = useUqAppBase();
    let [user, setUser] = useState<User>(undefined);
    useEffect(() => {
        async function loadUser() {
            let ret = usersCache[id];
            if (ret === undefined) {
                ret = await app.userApi.userFromId(id);
                usersCache[id] = ret === undefined ? null : ret;
            }
            setUser(ret);
        }
        loadUser();
    }, [app, id]);
    if (user === null || user === undefined) return <span className={className}>{id}</span>;
    if (Template) {
        return <Template user={user} />
    }
    else {
        return <span className={className}>
            {user.name}
        </span>
    }
}
