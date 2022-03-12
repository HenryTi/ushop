//=== UqApp builder created on Sat Feb 26 2022 19:22:11 GMT-0500 (北美东部标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Render, IDXEntity } from "tonwa-react";


//===============================
//======= UQ bizdev/workshop-bus-test ========
//===============================

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface Param$getUnitTime {
}
export interface Return$getUnitTimeRet {
	timezone: number;
	unitTimeZone: number;
	unitBizMonth: number;
	unitBizDate: number;
}
export interface Result$getUnitTime {
	ret: Return$getUnitTimeRet[];
}

export interface Id1 {
	id?: number;
	name: string;
}

export interface Id2 {
	id?: number;
	name: string;
}

export interface Id3 {
	id?: number;
	name: string;
}

export interface Id4 {
	id?: number;
	name: string;
}

export interface ParamActs {
	id1?: Id1[];
	id2?: Id2[];
	id3?: Id3[];
	id4?: Id4[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	Id1: UqID<any> & IDXEntity<any>;
	Id2: UqID<any> & IDXEntity<any>;
	Id3: UqID<any> & IDXEntity<any>;
	Id4: UqID<any> & IDXEntity<any>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
