// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { Person } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	no: {
		"name": "no",
		"type": "string",
		"isKey": true,
		"widget": "string",
		"label": "No"
	} as FieldItemString,
	name: {
		"name": "name",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Name"
	} as FieldItemString,
	vice: {
		"name": "vice",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Vice"
	} as FieldItemString,
	firstName: {
		"name": "firstName",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "FirstName"
	} as FieldItemString,
	lastName: {
		"name": "lastName",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "LastName"
	} as FieldItemString,
	middleName: {
		"name": "middleName",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "MiddleName"
	} as FieldItemString,
	gender: {
		"name": "gender",
		"isKey": false,
		"label": "Gender"
	} as undefined,
	year: {
		"name": "year",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Year"
	} as FieldItemInt,
	month: {
		"name": "month",
		"isKey": false,
		"label": "Month"
	} as undefined,
	day: {
		"name": "day",
		"isKey": false,
		"label": "Day"
	} as undefined,
	email: {
		"name": "email",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Email"
	} as FieldItemString,
	mobile: {
		"name": "mobile",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "Mobile"
	} as FieldItemString,
	mobileCountry: {
		"name": "mobileCountry",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "MobileCountry"
	} as FieldItemString,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.no, fields.name, fields.vice, fields.firstName, fields.lastName, fields.middleName, fields.gender, fields.year, fields.month, fields.day, fields.email, fields.mobile, fields.mobileCountry, 
];

export const ui: UI = {
label: "Person",
fieldArr,
fields,
};

const resRaw: Res<any> = {
$zh: {
},
$en: {
}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {
return res[str as string] ?? str;
}

export function render(item: Person):JSX.Element {
return <>{uqStringify(item)}</>;
};
