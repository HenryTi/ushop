import { FA, Image, SearchBox } from "tonwa-react";
import { useState } from "react";
import { Page, getAppBase } from "..";
import { MutedSmall } from "../tool";
import { User, userCache } from "./userCache";

export async function selectUser(caption: string | JSX.Element): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        let app = getAppBase();
        app.open(<PSelectUser caption={caption} resolve={resolve} />);

    })
}

interface Props {
    caption: string | JSX.Element;
    resolve: (value: User | PromiseLike<User>) => void;
}
function PSelectUser({ caption, resolve }: Props) {
    let app = getAppBase();
    let [user, setUser] = useState<User>(null);
    let onSearch = async (key: string) => {
        let retUser = await app.userApi.userFromName(key);
        userCache.set(user.id, user)
        setUser(retUser);
    }

    let vContent: any;
    if (user === null) {
        vContent = null;
    }
    if (user === undefined) {
        vContent = <div><FA name="info-o" className="me-3 text-info" /> No user</div>;
    }
    else {
        let { name, nick, icon } = user;
        vContent = <>
            <div className="d-flex">
                <Image src={icon} className="me-4 w-2-5c h-2-5c" />
                <div>
                    <div><MutedSmall>Name:</MutedSmall> &nbsp; {name}</div>
                    <div><MutedSmall>Nick:</MutedSmall> &nbsp; {nick}</div>
                </div>
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-primary" onClick={() => resolve(user)}>
                    {caption}
                </button>
            </div>
        </>;
    }

    return <Page header="caption" back="close">
        <div className="p-3 d-flex align-items-center flex-column">
            <div className="mx-auto mb-3">
                <SearchBox className="w-min-20c"
                    onFocus={() => setUser(null)}
                    onSearch={onSearch}
                    placeholder="user account" />
            </div>
            <div className="border rounded-3 bg-white p-5 mx-auto w-min-20c">
                {vContent}
            </div>
        </div>
    </Page>;
}
