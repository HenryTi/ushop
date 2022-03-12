import { VPage, setReact, shallowReact } from "tonwa-contoller";
import { FA, Image, SearchBox } from "tonwa-react";
import { mutedSmall } from "App/tool";
import { CUser, User } from "./CUser";

export class VSelectUser extends VPage<CUser> {
    shallow: {
        user: any;
    } = shallowReact({
        user: null,
    });
    header(): string | boolean | JSX.Element {
        return this.controller.caption;
    }

    protected get back(): "close" | "back" | "none" {
        return 'close';
    }

    content() {
        return <div className="p-3 d-flex align-items-center flex-column">
            <div className="mx-auto mb-3">
                <SearchBox className="w-min-20c"
                    onFocus={() => setReact(() => this.shallow.user = null)}
                    onSearch={this.onSearch}
                    placeholder="user account" />
            </div>
            {this.react(() => {
                let { user } = this.shallow;
                if (user === null) return null;
                let vContent: any;
                if (user === undefined) {
                    vContent = <div><FA name="info-o" className="me-3 text-info" /> No user</div>;
                }
                else {
                    let { name, nick, icon } = user;
                    vContent = <>
                        <div className="d-flex">
                            <Image src={icon} className="me-4 w-2-5c h-2-5c" />
                            <div>
                                <div>{mutedSmall('Name:')} &nbsp; {name}</div>
                                <div>{mutedSmall('Nick:')} &nbsp; {nick}</div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <button className="btn btn-primary" onClick={() => this.onSelected(user)}>
                                {this.header()}
                            </button>
                        </div>
                    </>;
                }
                return <div className="border rounded-3 bg-white p-5 mx-auto w-min-20c">
                    {vContent}
                </div>;
            })}
        </div>;
    }

    private onSelected = (user: User) => {
        this.controller.callReturn(this, user);
        this.controller.close();
    }

    private onSearch = async (key: string) => {
        let ret = await this.controller.searchUser(key);
        setReact(() => {
            this.shallow.user = ret;
        });
    }
}
