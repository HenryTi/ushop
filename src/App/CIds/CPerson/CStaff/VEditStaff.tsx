//import React from "react";
//import { Role } from "uq-app/uqs/BzWorkshop";
import { CStaff/*, staffRoles*/ } from "./CStaff";
import { VEditPerson } from "../VEditPerson";
//import { MPerson } from "../CPerson";
//import { staffRoleCaptions } from ".";

export class VEditStaff extends VEditPerson<CStaff> {
    content() {
        return <div className="py-3">
            {this.renderBindUser()}
            {this.renderRoles()}
            {this.renderProps()}
            {this.renderTagInput()}
        </div>;
    }

    protected renderRoles() {
        return this.controller.cRoleSingle.renderInput();
    }
}
