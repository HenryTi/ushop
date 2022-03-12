// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { SessionPerson } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	session: {
		"name": "session",
		"type": "id",
		"isKey": true,
		"label": "Session"
	} as FieldItemId,
	person: {
		"name": "person",
		"type": "id",
		"isKey": true,
		"label": "Person"
	} as FieldItemId,
	workshop: {
		"name": "workshop",
		"type": "id",
		"isKey": false,
		"label": "Workshop"
	} as FieldItemId,
	deleted: {
		"name": "deleted",
		"isKey": false,
		"label": "Deleted"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.session, fields.person, fields.workshop, fields.deleted, 
];

export const ui: UI = {
label: "SessionPerson",
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

export function render(item: SessionPerson):JSX.Element {
return <>{uqStringify(item)}</>;
};
