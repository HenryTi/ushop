import { VPage } from "tonwa-contoller";
import { FA, LMR } from "tonwa-react";
import { CActs } from "./CActs";

interface DirItem {
    icon: string;
    caption: string;
    onClick: () => void;
}

export class VStart extends VPage<CActs> {
    header(): string | boolean | JSX.Element {
        return 'Home';
    }

    content() {
        let { showClientNotes, showRegisterWorkshop, showTest } = this.controller;
        let arr: DirItem[] = [
            { icon: 'user-o', caption: 'Client notes', onClick: showClientNotes },
            { icon: 'user-o', caption: 'Workshops', onClick: showRegisterWorkshop },
            { icon: 'caret-right', caption: 'Test', onClick: showTest },
        ];
        return <div className="">
            {
                arr.map((v, index) => this.renderAdminOrRole(() => {
                    let { onClick, caption, icon } = v;
                    let right = <FA name="angle-right" />;
                    let vIcon = <FA name={icon} className="text-primary me-3" fixWidth={true} />;
                    return <LMR key={index}
                        className="cursor-pointer bg-white border-bottom py-2 px-3 align-items-center"
                        left={vIcon}
                        right={right}
                        onClick={onClick}>{caption}</LMR>
                }))
            }
        </div>;
    }
}
