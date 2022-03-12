// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { Op } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	biz: {
		"name": "biz",
		"type": "id",
		"isKey": false,
		"label": "Biz"
	} as FieldItemId,
	type: {
		"name": "type",
		"isKey": false,
		"label": "Type"
	} as undefined,
	value: {
		"name": "value",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Value"
	} as FieldItemNumber,
	stamp: {
		"name": "stamp",
		"isKey": false,
		"label": "Stamp"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.biz, fields.type, fields.value, fields.stamp, 
];

export const ui: UI = {
label: "Op",
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

export function render(item: Op):JSX.Element {
return <>{uqStringify(item)}</>;
};
