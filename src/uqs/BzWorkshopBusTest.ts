//=== UqApp builder created on Fri Apr 15 2022 00:02:54 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID, UqIX, UqIDX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


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

export interface PClass {
	id?: number;
	no?: string;
	name: string;
}

export interface PType {
	id?: number;
	no?: string;
	class: number;
	discription: string;
	picture: number;
}

export interface PProp {
	id?: number;
	name: string;
	pClass: number;
}

export interface PPropItem {
	id?: number;
	pProp: number;
	name: string;
	picture: number;
}

export interface PTypeItem {
	id?: number;
	type: number;
	p1: number;
	p2: number;
}

export interface PPack {
	id?: number;
	pType: number;
	name: string;
	radiox: number;
	radioy: number;
}

export interface PSearial {
	id?: number;
	type: number;
	no?: string;
	validTo: any;
}

export interface PItem {
	id?: number;
	type: number;
	pack: number;
	serial: number;
}

export interface IxPClassProp {
	ix: number;
	xi: number;
}

export interface IxProp {
	ix: number;
	xi: number;
}

export interface PItemPrice {
	id: number;
	price?: number;
	$act?: number;
}export interface ActParamPItemPrice {
	id: number|IDXValue;
	price?: number|IDXValue;
	$act?: number;
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

export interface Id5 {
	id?: number;
	a: number;
}

export interface ParamActs {
	pClass?: PClass[];
	pType?: PType[];
	pProp?: PProp[];
	pPropItem?: PPropItem[];
	pTypeItem?: PTypeItem[];
	pPack?: PPack[];
	pSearial?: PSearial[];
	pItem?: PItem[];
	ixPClassProp?: IxPClassProp[];
	ixProp?: IxProp[];
	pItemPrice?: ActParamPItemPrice[];
	id1?: Id1[];
	id2?: Id2[];
	id3?: Id3[];
	id4?: Id4[];
	id5?: Id5[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	PClass: UqID<any>;
	PType: UqID<any>;
	PProp: UqID<any>;
	PPropItem: UqID<any>;
	PTypeItem: UqID<any>;
	PPack: UqID<any>;
	PSearial: UqID<any>;
	PItem: UqID<any>;
	IxPClassProp: UqIX<any>;
	IxProp: UqIX<any>;
	PItemPrice: UqIDX<any>;
	Id1: UqID<any>;
	Id2: UqID<any>;
	Id3: UqID<any>;
	Id4: UqID<any>;
	Id5: UqID<any>;
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
    "pclass": {
        "name": "PClass",
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
                "size": 50
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
            "no"
        ],
        "global": false,
        "idType": 12
    },
    "ptype": {
        "name": "PType",
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
                "name": "class",
                "type": "id"
            },
            {
                "name": "discription",
                "type": "char",
                "size": 100
            },
            {
                "name": "picture",
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
            "no"
        ],
        "global": false,
        "idType": 12
    },
    "pprop": {
        "name": "PProp",
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
                "name": "pClass",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 12
    },
    "ppropitem": {
        "name": "PPropItem",
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
                "name": "pProp",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "picture",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "pProp",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 12
    },
    "ptypeitem": {
        "name": "PTypeItem",
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
                "name": "type",
                "type": "id"
            },
            {
                "name": "p1",
                "type": "id"
            },
            {
                "name": "p2",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "type",
                "type": "id"
            },
            {
                "name": "p1",
                "type": "id"
            },
            {
                "name": "p2",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 12
    },
    "ppack": {
        "name": "PPack",
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
                "name": "pType",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 10
            },
            {
                "name": "radiox",
                "type": "dec",
                "scale": 2,
                "precision": 12
            },
            {
                "name": "radioy",
                "type": "dec",
                "scale": 4,
                "precision": 12
            }
        ],
        "keys": [
            {
                "name": "pType",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 10
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 12
    },
    "psearial": {
        "name": "PSearial",
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
                "name": "type",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "validTo",
                "type": "date"
            }
        ],
        "keys": [
            {
                "name": "type",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 12
    },
    "pitem": {
        "name": "PItem",
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
                "name": "type",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            },
            {
                "name": "serial",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "type",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            },
            {
                "name": "serial",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 12
    },
    "ixpclassprop": {
        "name": "IxPClassProp",
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
    "ixprop": {
        "name": "IxProp",
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
    "pitemprice": {
        "name": "PItemPrice",
        "type": "idx",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "price",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "update": true
    },
    "b": {
        "name": "B",
        "type": "bus",
        "private": true,
        "sys": true,
        "version": 6,
        "busOwner": "$$$",
        "busName": "test",
        "outCount": 1,
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
                ]
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
    "test": {
        "name": "Test",
        "type": "proc",
        "private": true,
        "sys": true,
        "fields": [] as any,
        "returns": [] as any
    },
    "id1": {
        "name": "id1",
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
        "keys": [] as any,
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 1
    },
    "id2": {
        "name": "id2",
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
        "keys": [] as any,
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 2
    },
    "id3": {
        "name": "id3",
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
        "keys": [] as any,
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3
    },
    "id4": {
        "name": "id4",
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
                "size": 58
            }
        ],
        "keys": [] as any,
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 1
    },
    "id5": {
        "name": "id5",
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
                "name": "a",
                "type": "int"
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "int"
            }
        ],
        "global": false,
        "idType": 12
    }
}