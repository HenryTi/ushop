// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { Note } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	staff: {
		"name": "staff",
		"type": "id",
		"isKey": false,
		"label": "Staff"
	} as FieldItemId,
	client: {
		"name": "client",
		"type": "id",
		"isKey": false,
		"label": "Client"
	} as FieldItemId,
	note: {
		"name": "note",
		"isKey": false,
		"label": "Note"
	} as undefined,
	sensitive: {
		"name": "sensitive",
		"isKey": false,
		"label": "Sensitive"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.staff, fields.client, fields.note, fields.sensitive, 
];

export const ui: UI = {
label: "Note",
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

export function render(item: Note):JSX.Element {
return <>{uqStringify(item)}</>;
};
