//=== UqApp builder created on Fri Apr 15 2022 00:02:54 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID, UqIX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


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

export interface ParamTrialAct {
}
export interface ResultTrialAct {
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
	Draft: UqID<any>;
	IxDraft: UqIX<any>;
	Biz: UqID<any>;
	BizPack: UqID<any>;
	IxBizPack: UqIX<any>;
	Op: UqID<any>;
	Item: UqID<any>;
	OpiBooking: UqID<any>;
	Opi: UqID<any>;
	ItemHistory: UqID<any>;
	OpiHistory: UqID<any>;
	IxOpiDate: UqIX<any>;
	Note: UqID<any>;
	IxStaffClient: UqIX<any>;
	SaveNote: UqAction<ParamSaveNote, ResultSaveNote>;
	MyClients: UqQuery<ParamMyClients, ResultMyClients>;
	Person: UqID<any>;
	IxPersonLog: UqIX<any>;
	ClientSurvey: UqID<any>;
	GetPersonList: UqQuery<ParamGetPersonList, ResultGetPersonList>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	GetPersonLog: UqQuery<ParamGetPersonLog, ResultGetPersonLog>;
	TagGroup: UqID<any>;
	Tag: UqID<any>;
	TagItem: UqID<any>;
	IxTag: UqIX<any>;
	IxLocalIdTag: UqIX<any>;
	IxGlobalIdTag: UqIX<any>;
	IXAll: UqIX<any>;
	IxUserPerson: UqIX<any>;
	IxPersonRole: UqIX<any>;
	TrialAct: UqAction<ParamTrialAct, ResultTrialAct>;
	Workshop: UqID<any>;
	Session: UqID<any>;
	SessionPerson: UqID<any>;
	IxWorkshopSession: UqIX<any>;
	IxSessionStaff: UqIX<any>;
	IxSessionClient: UqIX<any>;
	SetSessionStaff: UqAction<ParamSetSessionStaff, ResultSetSessionStaff>;
	SaveWorkshopStaff: UqAction<ParamSaveWorkshopStaff, ResultSaveWorkshopStaff>;
	SaveSessionAttendee: UqAction<ParamSaveSessionAttendee, ResultSaveSessionAttendee>;
	MySessions: UqQuery<ParamMySessions, ResultMySessions>;
}


export const uqSchema={
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "poke",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "$setmytimezone": {
        "name": "$setMyTimezone",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "_timezone",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "timezone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitTimeZone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizMonth",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizDate",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "draft": {
        "name": "Draft",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "entity",
                "type": "smallint"
            },
            {
                "name": "content",
                "type": "text"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 13
    },
    "ixdraft": {
        "name": "IxDraft",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "enumoptype": {
        "name": "EnumOpType",
        "type": "enum",
        "private": true,
        "sys": true,
        "values": {
            "a": 1,
            "b": 2
        }
    },
    "biz": {
        "name": "Biz",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "stamp",
                "type": "timestamp"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 12
    },
    "bizpack": {
        "name": "BizPack",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "stamp",
                "type": "timestamp"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 12
    },
    "ixbizpack": {
        "name": "IxBizPack",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "tuid": "$local"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$local"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 12
    },
    "op": {
        "name": "Op",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "biz",
                "type": "id"
            },
            {
                "name": "type",
                "type": "enum"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "stamp",
                "type": "timestamp"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 12
    },
    "item": {
        "name": "Item",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 12
    },
    "opibooking": {
        "name": "OpiBooking",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "opType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "postItem",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "ratio",
                "type": "dec",
                "scale": 2,
                "precision": 6
            },
            {
                "name": "start",
                "type": "date"
            },
            {
                "name": "span",
                "type": "smallint"
            },
            {
                "name": "ratioInit",
                "type": "dec",
                "scale": 2,
                "precision": 6
            },
            {
                "name": "memo",
                "type": "int"
            }
        ],
        "keys": [
            {
                "name": "opType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "postItem",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 12
    },
    "opi": {
        "name": "Opi",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "object",
                "type": "id"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "object",
                "type": "id"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 12
    },
    "itemhistory": {
        "name": "ItemHistory",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "op",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [
            {
                "name": "op",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 21
    },
    "opihistory": {
        "name": "OpiHistory",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "opi",
                "type": "id"
            },
            {
                "name": "itemHistory",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "booking",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 21
    },
    "ixopidate": {
        "name": "IxOpiDate",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "rows",
                "type": "int"
            },
            {
                "name": "p0",
                "type": "id"
            },
            {
                "name": "p1",
                "type": "id"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$local"
            },
            {
                "name": "xi",
                "type": "date"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "note": {
        "name": "Note",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 13
    },
    "ixstaffclient": {
        "name": "IxStaffClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "tick",
                "type": "int"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$global"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$global"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 11
    },
    "savenote": {
        "name": "SaveNote",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "myclients": {
        "name": "MyClients",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "gender": {
        "name": "Gender",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "female": 0,
            "male": 1
        }
    },
    "person": {
        "name": "Person",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "vice",
                "type": "char",
                "size": 50
            },
            {
                "name": "firstName",
                "type": "char",
                "size": 50
            },
            {
                "name": "lastName",
                "type": "char",
                "size": 50
            },
            {
                "name": "middleName",
                "type": "char",
                "size": 50
            },
            {
                "name": "gender",
                "type": "enum"
            },
            {
                "name": "year",
                "type": "smallint"
            },
            {
                "name": "month",
                "type": "tinyint"
            },
            {
                "name": "day",
                "type": "tinyint"
            },
            {
                "name": "email",
                "type": "char",
                "size": 100
            },
            {
                "name": "mobile",
                "type": "char",
                "size": 30
            },
            {
                "name": "mobileCountry",
                "type": "char",
                "size": 10
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no",
            "vice"
        ],
        "global": true,
        "idType": 11
    },
    "ixpersonlog": {
        "name": "IxPersonLog",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "tuid": "$global"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$minute"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 13
    },
    "clientsurvey": {
        "name": "ClientSurvey",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "client",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 13
    },
    "getpersonlist": {
        "name": "GetPersonList",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "user",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "person",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "personsearch": {
        "name": "PersonSearch",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            },
            {
                "name": "key",
                "type": "char",
                "size": 30
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "getpersonlog": {
        "name": "GetPersonLog",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "person",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "log",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "taggroup": {
        "name": "TagGroup",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 12
    },
    "tag": {
        "name": "Tag",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "vice",
                "type": "char",
                "size": 100
            },
            {
                "name": "single",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name",
            "vice"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 12
    },
    "tagitem": {
        "name": "TagItem",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 12
    },
    "ixtag": {
        "name": "IxTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixlocalidtag": {
        "name": "IxLocalIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixglobalidtag": {
        "name": "IxGlobalIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixall": {
        "name": "IXAll",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "role": {
        "name": "Role",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "staff": 10,
            "counselor": 11,
            "volunteer": 12,
            "board": 13,
            "client": 20,
            "donator": 30
        }
    },
    "ixuserperson": {
        "name": "IxUserPerson",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$global"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 11
    },
    "ixpersonrole": {
        "name": "IxPersonRole",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "tuid": "$global"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "b": {
        "name": "B",
        "type": "bus",
        "private": true,
        "sys": true,
        "version": 6,
        "busOwner": "$$$",
        "busName": "test",
        "schema": {
            "query1": {
                "param": [
                    {
                        "name": "p1",
                        "type": "string"
                    },
                    {
                        "name": "p2",
                        "type": "number"
                    },
                    {
                        "name": "p3",
                        "type": "id"
                    },
                    {
                        "name": "p4",
                        "type": "array",
                        "fields": [
                            {
                                "name": "a1",
                                "type": "string"
                            },
                            {
                                "name": "a2",
                                "type": "number"
                            },
                            {
                                "name": "a3",
                                "type": "number"
                            },
                            {
                                "name": "a4",
                                "type": "id"
                            }
                        ]
                    }
                ],
                "returns": {
                    "fields": [
                        {
                            "name": "c1",
                            "type": "string"
                        },
                        {
                            "name": "c3",
                            "type": "string"
                        },
                        {
                            "name": "bbba37",
                            "type": "string"
                        }
                    ],
                    "arrs": [
                        {
                            "name": "arrname",
                            "type": "array",
                            "fields": [
                                {
                                    "name": "a1",
                                    "type": "string"
                                },
                                {
                                    "name": "a2",
                                    "type": "number"
                                },
                                {
                                    "name": "a3",
                                    "type": "number"
                                },
                                {
                                    "name": "a4",
                                    "type": "id"
                                }
                            ]
                        },
                        {
                            "name": "arrname2",
                            "type": "array",
                            "fields": [
                                {
                                    "name": "b3",
                                    "type": "string"
                                },
                                {
                                    "name": "cb2",
                                    "type": "number"
                                },
                                {
                                    "name": "aa3",
                                    "type": "number"
                                }
                            ]
                        }
                    ]
                },
                "query": false
            },
            "schema1": {
                "fields": [
                    {
                        "name": "a1",
                        "type": "string"
                    },
                    {
                        "name": "a2",
                        "type": "number"
                    },
                    {
                        "name": "a3",
                        "type": "number"
                    },
                    {
                        "name": "a4",
                        "type": "id"
                    }
                ],
                "accept": {}
            },
            "schema2": {
                "fields": [
                    {
                        "name": "b3",
                        "type": "string"
                    },
                    {
                        "name": "cb2",
                        "type": "number"
                    },
                    {
                        "name": "aa3",
                        "type": "number"
                    }
                ]
            },
            "schema3": {
                "fields": [
                    {
                        "name": "a3",
                        "type": "string"
                    },
                    {
                        "name": "cb2",
                        "type": "number"
                    },
                    {
                        "name": "aa3",
                        "type": "id"
                    }
                ]
            },
            "complex1": {
                "fields": [
                    {
                        "name": "c1",
                        "type": "string"
                    },
                    {
                        "name": "c3",
                        "type": "string"
                    },
                    {
                        "name": "bbba37",
                        "type": "string"
                    }
                ],
                "arrs": [
                    {
                        "name": "arrname",
                        "type": "array",
                        "fields": [
                            {
                                "name": "a1",
                                "type": "string"
                            },
                            {
                                "name": "a2",
                                "type": "number"
                            },
                            {
                                "name": "a3",
                                "type": "number"
                            },
                            {
                                "name": "a4",
                                "type": "id"
                            }
                        ]
                    },
                    {
                        "name": "arrname2",
                        "type": "array",
                        "fields": [
                            {
                                "name": "b3",
                                "type": "string"
                            },
                            {
                                "name": "cb2",
                                "type": "number"
                            },
                            {
                                "name": "aa3",
                                "type": "number"
                            }
                        ]
                    }
                ]
            }
        }
    },
    "isa": {
        "name": "IsA",
        "type": "sysproc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "yes",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "trialact": {
        "name": "TrialAct",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "auth": "isa",
        "returns": [] as any
    },
    "workshop": {
        "name": "Workshop",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "vice",
                "type": "text"
            },
            {
                "name": "staff",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no",
            "vice"
        ],
        "create": true,
        "global": true,
        "idType": 11
    },
    "session": {
        "name": "Session",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "workshop",
                "type": "id"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "vice",
                "type": "char",
                "size": 200
            },
            {
                "name": "time",
                "type": "time"
            },
            {
                "name": "span",
                "type": "smallint"
            }
        ],
        "keys": [] as any,
        "nameNoVice": [
            "vice"
        ],
        "global": true,
        "idType": 11
    },
    "sessionperson": {
        "name": "SessionPerson",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "person",
                "type": "id"
            },
            {
                "name": "workshop",
                "type": "id"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "person",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 13
    },
    "ixworkshopsession": {
        "name": "IxWorkshopSession",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "tuid": "$global"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$global"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 11
    },
    "ixsessionstaff": {
        "name": "IxSessionStaff",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$global"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$global"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 11
    },
    "ixsessionclient": {
        "name": "IxSessionClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "deleted",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$global"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$global"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "create": true,
        "update": true,
        "xiType": 11
    },
    "setsessionstaff": {
        "name": "SetSessionStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "saveworkshopstaff": {
        "name": "SaveWorkshopStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "savesessionattendee": {
        "name": "SaveSessionAttendee",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "mysessions": {
        "name": "MySessions",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "workshop",
                        "type": "id"
                    },
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "time",
                        "type": "time"
                    },
                    {
                        "name": "span",
                        "type": "smallint"
                    },
                    {
                        "name": "own",
                        "type": "tinyint"
                    },
                    {
                        "name": "substitue",
                        "type": "tinyint"
                    },
                    {
                        "name": "done",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    }
}