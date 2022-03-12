import { UqExt as Uq, assign } from './BzWorkshopBusTest';
import * as Id1 from './id1.ui';
import * as Id2 from './id2.ui';
import * as Id3 from './id3.ui';
import * as Id4 from './id4.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Id1', Id1);
	assign(uq, 'Id2', Id2);
	assign(uq, 'Id3', Id3);
	assign(uq, 'Id4', Id4);
}
export * from './BzWorkshopBusTest';
