// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Res, setRes } from "tonwa-core";
import { BizPack } from "./BzWorkshop";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	stamp: {
		"name": "stamp",
		"isKey": false,
		"label": "Stamp"
	} as undefined,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.stamp, 
];

export const ui: UI = {
label: "BizPack",
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

export function render(item: BizPack):JSX.Element {
return <>{uqStringify(item)}</>;
};
