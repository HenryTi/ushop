// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { OpiHistory } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	opi: {
		"name": "opi",
		"type": "id",
		"isKey": false,
		"label": "Opi"
	} as FieldItemId,
	itemHistory: {
		"name": "itemHistory",
		"type": "id",
		"isKey": false,
		"label": "ItemHistory"
	} as FieldItemId,
	value: {
		"name": "value",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Value"
	} as FieldItemNumber,
	booking: {
		"name": "booking",
		"type": "id",
		"isKey": false,
		"label": "Booking"
	} as FieldItemId,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.opi, fields.itemHistory, fields.value, fields.booking, 
];

export const ui: UI = {
label: "OpiHistory",
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

export function render(item: OpiHistory):JSX.Element {
return <>{uqStringify(item)}</>;
};
