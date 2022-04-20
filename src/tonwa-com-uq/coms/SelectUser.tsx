import { useState } from "react";
import { MutedSmall, Page, SearchBox, useNav } from "tonwa-com";
import { FA } from "tonwa-com";
import { User } from "tonwa-uq";
import { useUqAppBase } from "../UqAppBase";
import { Image } from "./Image";

interface Props {
    header?: string | JSX.Element;
}
export function SelectUser({ header }: Props) {
    let nav = useNav();
    let app = useUqAppBase();
    let [user, setUser] = useState<User>(null);
    let onSearch = async (key: string) => {
        let retUser = await app.userApi.userFromName(key);
        setUser(retUser);
    }

    let vContent: any;
    if (user === null) {
        vContent = null;
    }
    if (!user) {
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
                <button className="btn btn-primary" onClick={() => nav.returnCall(user)}>
                    {header}
                </button>
            </div>
        </>;
    }

    return <Page header={header ?? 'Select user'} back="close">
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
