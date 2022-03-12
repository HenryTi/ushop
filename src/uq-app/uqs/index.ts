//=== UqApp builder created on Sat Feb 26 2022 19:22:11 GMT-0500 (北美东部标准时间) ===//
import * as BzWorkshop from './BzWorkshop';
import * as BzWorkshopBusTest from './BzWorkshopBusTest';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
	BzWorkshopBusTest: BzWorkshopBusTest.UqExt;
}

export * as BzWorkshop from './BzWorkshop';
export * as BzWorkshopBusTest from './BzWorkshopBusTest';

export function setUI(uqs:UQs) {
	BzWorkshop.setUI(uqs.BzWorkshop);
	BzWorkshopBusTest.setUI(uqs.BzWorkshopBusTest);
}
