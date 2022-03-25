import { Schema, UiSchema, UiTextItem } from "tonwa-react";
import { EnumSingleInput, Page, VEditID, VEditIDProps } from "tonwa-controller";
import { UqExt } from "uq-app/uqs/BzWorkshop";
import { MPerson } from "../UqPerson";
import { VBindUser } from "../VBindUser";
import { staffRoleCaptions, staffRoles, UqStaff } from "./UqStaff";

export function VEditStaff(props: VEditIDProps<UqStaff>) {
    let { uqID } = props;
    let { uq, initNO, state } = uqID;
    let { currentItem } = state;
    let BzWorkshop = uq as UqExt;
    let schema: Schema = BzWorkshop.Person.ui.fieldArr;
    let uiSchema: UiSchema = {
        items: {
            no: {
                "name": "no",
                "type": "string",
                "isKey": true,
                "widget": "text",
                "label": "No",
                "defaultValue": initNO,
            } as UiTextItem,
            name: {
                "name": "name",
                "type": "string",
                "isKey": false,
                "widget": "text",
                "label": "Name",
            } as UiTextItem,
            firstName: {
                "name": "firstName",
                "type": "string",
                "isKey": false,
                "widget": "text",
                "label": "First Name",
            } as UiTextItem,
            lastName: {
                "name": "lastName",
                "type": "string",
                "isKey": false,
                "widget": "text",
                "label": "Last Name",
            } as UiTextItem,
            middleName: {
                "name": "middleName",
                "type": "string",
                "isKey": false,
                "widget": "text",
                "label": "Middle Name",
            } as UiTextItem,
            submit: {
                "label": "Save Staff",
                "widget": "button",
                "className": "btn btn-primary",
            }
        }
    }
    return <Page>
        <div className="py-3">
            {/*this.renderBindUser()*/}
            <VBindUser uqID={uqID} />
            {/*this.renderRoles()*/}
            <EnumSingleInput id={currentItem.id}
                value={(currentItem as MPerson).role}
                enumProps={{
                    enums: staffRoles,
                    enumCaptions: staffRoleCaptions,
                    caption: 'Role',
                    uq: BzWorkshop,
                    IX: BzWorkshop.IxPersonRole,
                    onEnumChanged: uqID.onRoleChanged,
                }}
            />
            {/*this.renderProps()*/}
            <VEditID uqID={uqID} schema={schema} uiSchema={uiSchema} />
            {/*this.renderTagInput()*/}
        </div>
    </Page>;
    /*
    protected renderRoles() {
        return this.controller.cRoleSingle.renderInput();
    }
    */
}
