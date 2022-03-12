// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { Opi } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	object: {
		"name": "object",
		"type": "id",
		"isKey": true,
		"label": "Object"
	} as FieldItemId,
	post: {
		"name": "post",
		"type": "id",
		"isKey": true,
		"label": "Post"
	} as FieldItemId,
	item: {
		"name": "item",
		"type": "id",
		"isKey": true,
		"label": "Item"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.object, fields.post, fields.item, 
];

export const ui: UI = {
label: "Opi",
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

export function render(item: Opi):JSX.Element {
return <>{uqStringify(item)}</>;
};
