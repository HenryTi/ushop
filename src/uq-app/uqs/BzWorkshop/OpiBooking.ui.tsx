// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { OpiBooking } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	opType: {
		"name": "opType",
		"isKey": true,
		"label": "OpType"
	} as undefined,
	post: {
		"name": "post",
		"type": "id",
		"isKey": true,
		"label": "Post"
	} as FieldItemId,
	postItem: {
		"name": "postItem",
		"type": "id",
		"isKey": true,
		"label": "PostItem"
	} as FieldItemId,
	item: {
		"name": "item",
		"type": "id",
		"isKey": true,
		"label": "Item"
	} as FieldItemId,
	ratio: {
		"name": "ratio",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Ratio"
	} as FieldItemNumber,
	start: {
		"name": "start",
		"isKey": false,
		"label": "Start"
	} as undefined,
	span: {
		"name": "span",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Span"
	} as FieldItemInt,
	ratioInit: {
		"name": "ratioInit",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "RatioInit"
	} as FieldItemNumber,
	memo: {
		"name": "memo",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Memo"
	} as FieldItemInt,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.opType, fields.post, fields.postItem, fields.item, fields.ratio, fields.start, fields.span, fields.ratioInit, fields.memo, 
];

export const ui: UI = {
label: "OpiBooking",
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

export function render(item: OpiBooking):JSX.Element {
return <>{uqStringify(item)}</>;
};
