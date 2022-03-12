//=== UqApp builder created on Sat Feb 26 2022 19:22:11 GMT-0500 (北美东部标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID, UqIX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Render, IDXEntity } from "tonwa-react";


//===============================
//======= UQ bizdev/workshop ========
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

export interface Draft {
	id?: number;
	entity: number;
	content: string;
}

export interface IxDraft {
	ix: number;
	xi: number;
}

export enum EnumOpType {
	a = 1,
	b = 2
}

export interface Biz {
	id?: number;
	value: number;
	stamp: any;
}

export interface BizPack {
	id?: number;
	stamp: any;
}

export interface IxBizPack {
	ix: number;
	xi: number;
}

export interface Op {
	id?: number;
	biz: number;
	type: any;
	value: number;
	stamp: any;
}

export interface Item {
	id?: number;
}

export interface OpiBooking {
	id?: number;
	opType: any;
	post: number;
	postItem: number;
	item: number;
	ratio: number;
	start: any;
	span: number;
	ratioInit: number;
	memo: number;
}

export interface Opi {
	id?: number;
	object: number;
	post: number;
	item: number;
}

export interface ItemHistory {
	id?: number;
	op: number;
	item: number;
	value: number;
}

export interface OpiHistory {
	id?: number;
	opi: number;
	itemHistory: number;
	value: number;
	booking: number;
}

export interface IxOpiDate {
	value: number;
	rows: number;
	p0: number;
	p1: number;
	ix: number;
	xi: any;
}

export interface Note {
	id?: number;
	staff: number;
	client: number;
	note: string;
	sensitive: number;
}

export interface IxStaffClient {
	tick: number;
	ix: number;
	xi: number;
}

export interface ParamSaveNote {
	id: number;
	staff: number;
	client: number;
	note: string;
	sensitive: number;
}
export interface ReturnSaveNoteRet {
	id: number;
}
export interface ResultSaveNote {
	ret: ReturnSaveNoteRet[];
}

export interface ParamMyClients {
}
export interface ReturnMyClientsRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}
export interface ResultMyClients {
	ret: ReturnMyClientsRet[];
}

export enum Gender {
	female = 0,
	male = 1
}

export interface Person {
	id?: number;
	no?: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}

export interface IxPersonLog {
	ix: number;
	xi: number;
}

export interface ClientSurvey {
	id?: number;
	client: number;
}

export interface ParamGetPersonList {
	role: any;
}
export interface ReturnGetPersonListRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
	user: number;
}
export interface ReturnGetPersonListRoles {
	person: number;
	role: any;
}
export interface ResultGetPersonList {
	ret: ReturnGetPersonListRet[];
	roles: ReturnGetPersonListRoles[];
}

export interface ParamPersonSearch {
	role: any;
	key: string;
}
export interface ReturnPersonSearchRet {
	id: number;
	no: string;
	name: string;
	vice: string;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: any;
	year: number;
	month: number;
	day: number;
	email: string;
	mobile: string;
	mobileCountry: string;
}
export interface ResultPersonSearch {
	ret: ReturnPersonSearchRet[];
}

export interface ParamGetPersonLog {
	person: number;
}
export interface ReturnGetPersonLogRet {
	log: number;
	type: string;
	value: string;
}
export interface ResultGetPersonLog {
	ret: ReturnGetPersonLogRet[];
}

export interface TagGroup {
	id?: number;
	name: string;
}

export interface Tag {
	id?: number;
	name: string;
	vice: string;
	single: number;
}

export interface TagItem {
	id?: number;
	name: string;
}

export interface IxTag {
	ix: number;
	xi: number;
}

export interface IxLocalIdTag {
	ix: number;
	xi: number;
}

export interface IxGlobalIdTag {
	ix: number;
	xi: number;
}

export interface IXAll {
	ix: number;
	xi: number;
}

export enum Role {
	staff = 10,
	counselor = 11,
	volunteer = 12,
	board = 13,
	client = 20,
	donator = 30
}

export interface IxUserPerson {
	ix: number;
	xi: number;
}

export interface IxPersonRole {
	ix: number;
	xi: number;
}

export interface Workshop {
	id?: number;
	no?: string;
	name: string;
	vice: string;
	staff: number;
}

export interface Session {
	id?: number;
	workshop: number;
	date: any;
	vice: string;
	time: any;
	span: number;
}

export interface SessionPerson {
	id?: number;
	session: number;
	person: number;
	workshop: number;
	deleted: number;
}

export interface IxWorkshopSession {
	ix: number;
	xi: number;
}

export interface IxSessionStaff {
	own: number;
	substitue: number;
	done: number;
	ix: number;
	xi: number;
}

export interface IxSessionClient {
	deleted: number;
	ix: number;
	xi: number;
}

export interface ParamSetSessionStaff {
	session: number;
	staff: number;
	own: number;
	substitue: number;
	done: number;
}
export interface ResultSetSessionStaff {
}

export interface ParamSaveWorkshopStaff {
	id: number;
	staff: number;
}
export interface ResultSaveWorkshopStaff {
}

export interface ParamSaveSessionAttendee {
	session: number;
	client: number;
	deleted: number;
}
export interface ResultSaveSessionAttendee {
}

export interface ParamMySessions {
}
export interface ReturnMySessionsRet {
	id: number;
	workshop: number;
	date: any;
	vice: string;
	time: any;
	span: number;
	own: number;
	substitue: number;
	done: number;
}
export interface ResultMySessions {
	ret: ReturnMySessionsRet[];
}

export interface ParamActs {
	draft?: Draft[];
	ixDraft?: IxDraft[];
	biz?: Biz[];
	bizPack?: BizPack[];
	ixBizPack?: IxBizPack[];
	op?: Op[];
	item?: Item[];
	opiBooking?: OpiBooking[];
	opi?: Opi[];
	itemHistory?: ItemHistory[];
	opiHistory?: OpiHistory[];
	ixOpiDate?: IxOpiDate[];
	note?: Note[];
	ixStaffClient?: IxStaffClient[];
	person?: Person[];
	ixPersonLog?: IxPersonLog[];
	clientSurvey?: ClientSurvey[];
	tagGroup?: TagGroup[];
	tag?: Tag[];
	tagItem?: TagItem[];
	ixTag?: IxTag[];
	ixLocalIdTag?: IxLocalIdTag[];
	ixGlobalIdTag?: IxGlobalIdTag[];
	iXAll?: IXAll[];
	ixUserPerson?: IxUserPerson[];
	ixPersonRole?: IxPersonRole[];
	workshop?: Workshop[];
	session?: Session[];
	sessionPerson?: SessionPerson[];
	ixWorkshopSession?: IxWorkshopSession[];
	ixSessionStaff?: IxSessionStaff[];
	ixSessionClient?: IxSessionClient[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	Draft: UqID<any> & IDXEntity<any>;
	IxDraft: UqIX<any>;
	Biz: UqID<any> & IDXEntity<any>;
	BizPack: UqID<any> & IDXEntity<any>;
	IxBizPack: UqIX<any>;
	Op: UqID<any> & IDXEntity<any>;
	Item: UqID<any> & IDXEntity<any>;
	OpiBooking: UqID<any> & IDXEntity<any>;
	Opi: UqID<any> & IDXEntity<any>;
	ItemHistory: UqID<any> & IDXEntity<any>;
	OpiHistory: UqID<any> & IDXEntity<any>;
	IxOpiDate: UqIX<any>;
	Note: UqID<any> & IDXEntity<any>;
	IxStaffClient: UqIX<any>;
	SaveNote: UqAction<ParamSaveNote, ResultSaveNote>;
	MyClients: UqQuery<ParamMyClients, ResultMyClients>;
	Person: UqID<any> & IDXEntity<any>;
	IxPersonLog: UqIX<any>;
	ClientSurvey: UqID<any> & IDXEntity<any>;
	GetPersonList: UqQuery<ParamGetPersonList, ResultGetPersonList>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	GetPersonLog: UqQuery<ParamGetPersonLog, ResultGetPersonLog>;
	TagGroup: UqID<any> & IDXEntity<any>;
	Tag: UqID<any> & IDXEntity<any>;
	TagItem: UqID<any> & IDXEntity<any>;
	IxTag: UqIX<any>;
	IxLocalIdTag: UqIX<any>;
	IxGlobalIdTag: UqIX<any>;
	IXAll: UqIX<any>;
	IxUserPerson: UqIX<any>;
	IxPersonRole: UqIX<any>;
	Workshop: UqID<any> & IDXEntity<any>;
	Session: UqID<any> & IDXEntity<any>;
	SessionPerson: UqID<any> & IDXEntity<any>;
	IxWorkshopSession: UqIX<any>;
	IxSessionStaff: UqIX<any>;
	IxSessionClient: UqIX<any>;
	SetSessionStaff: UqAction<ParamSetSessionStaff, ResultSetSessionStaff>;
	SaveWorkshopStaff: UqAction<ParamSaveWorkshopStaff, ResultSaveWorkshopStaff>;
	SaveSessionAttendee: UqAction<ParamSaveSessionAttendee, ResultSaveSessionAttendee>;
	MySessions: UqQuery<ParamMySessions, ResultMySessions>;
}

export function assign(uq: any, to:string, from:any): void {
	let hasEntity = uq.hasEntity(to);
	if (hasEntity === false) {
		return;
	}
	Object.assign((uq as any)[to], from);
}
