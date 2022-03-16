import { VPage } from "tonwa-controller";
import { Form, UiSchema, UiTextItem } from "tonwa-react";
import { Person } from "uq-app/uqs/BzWorkshop";
import { CClientSurvey } from "./CClientSurvey";

export class PClientForm extends VPage<CClientSurvey, Person> {
    header(): string | boolean | JSX.Element {
        return null;
    }

    content() {
        const schema = [
            ...this.controller.uqs.BzWorkshop.Person.ui.fieldArr as any[],
            { name: 'submit', type: 'submit' }
        ];
        const uiSchema: UiSchema = {
            items: {
                no: {
                    "name": "no",
                    "type": "string",
                    "isKey": true,
                    "widget": "text",
                    "label": "No",
                    "defaultValue": this.props.no,
                } as UiTextItem,
                name: {
                    "name": "name",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Name",
                    "defaultValue": this.props.name,
                } as UiTextItem,
                firstName: {
                    "name": "firstName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "First Name",
                    "defaultValue": this.props.firstName,
                } as UiTextItem,
                lastName: {
                    "name": "lastName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Last Name",
                    "defaultValue": this.props.lastName,
                } as UiTextItem,
                middleName: {
                    "name": "middleName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Middle Name",
                    "defaultValue": this.props.middleName,
                } as UiTextItem,
                submit: {
                    "label": "Submit",
                    "widget": "button",
                    "className": "btn btn-primary",
                }
            }
        }
        return <div className="p-3">
            <Form schema={schema} uiSchema={uiSchema} fieldLabelSize={2} />
        </div>;
    }
}
