import { app } from "../App";
import { openPage, Page, VPage } from "tonwa-controller";
import { FA, LMR } from "tonwa-react";
import { CClientNotes } from "./ClientNotes";
import { CWorkshops } from "./CWorkshops";
import { PTest } from "./Test";
import { useEffect } from "react";

interface DirItem {
    icon: string;
    caption: string;
    page?: JSX.Element;
    onClick?: () => void;
}

export function PActs() {
    useEffect(() => {
        let s = null;
    });
    let showRegisterWorkshop = async () => {
        let cRegisterWorkshop = new CWorkshops(undefined);
        cRegisterWorkshop.openMain();
    }

    let showClientNotes = async () => {
        //let cClientNotes = new CClientNotes(undefined);
        //cClientNotes.openMain();
    }

    let arr: DirItem[] = [
        { icon: 'user-o', caption: 'Client notes', onClick: showClientNotes },
        { icon: 'user-o', caption: 'Workshops', onClick: showRegisterWorkshop },
        { icon: 'caret-right', caption: 'Test', page: <PTest /> },
    ];
    return <Page header="Home">
        <div className="">
            {
                arr.map((v, index) => app.renderAdminOrRole(<VDirItem key={index} {...v} />))
            }
        </div>
    </Page>;
}

function VDirItem(dirItem: DirItem) {
    let { page, onClick, caption, icon } = dirItem;
    let right = <FA name="angle-right" />;
    let vIcon = <FA name={icon} className="text-primary me-3" fixWidth={true} />;
    if (page) {
        onClick = () => {
            openPage(page);
        }
    }
    return <LMR
        className="cursor-pointer bg-white border-bottom py-2 px-3 align-items-center"
        left={vIcon}
        right={right}
        onClick={onClick}>{caption}</LMR>
}