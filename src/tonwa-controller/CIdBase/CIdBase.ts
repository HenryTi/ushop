import { Schema, UiSchema } from "tonwa-react";
import { Uq, ID } from "tonwa-uq";
import { Controller } from "../Controller";
import { deepReact, react, setReact } from "../Reactive";
import { VAdd } from "./VAdd";
import { PIDList } from "./PIDList";
import { VEditID } from "./VEditID";
import { IdCache } from "./IdCache";
import { AppBase } from "../AppBase";
import { VPage } from "../VPage";
import { mutedSmall } from "../tool";

export enum EnumSelectType {
    listAll,            // 一次列出所有的项目，供选择
    search,             // 输入文字，再选择
    listAndSearch,      // 列出部分，还可以搜索
};

export interface SelectOptions {
    listAll?: boolean;              // default: true
    search?: boolean;               // default: true
    valueRender?: IdValueRender;
    allowNew?: boolean;             // default: allow new
};

export interface IdValue {
    id: number;
};

export type Render = () => JSX.Element;
export type IdValueRender = (value: IdValue) => JSX.Element;
export type ValuesRender = (values: JSX.Element[]) => JSX.Element;
export type RefRender = (onClick: () => void, content: JSX.Element) => JSX.Element;

interface IDDeep {
    list: IdValue[];
    currentItem: any;
}

const caches: { [id: string]: IdCache } = {}

export abstract class CIdBase<A extends AppBase = AppBase> extends Controller<A> {
    private cache: IdCache;
    protected ID: ID;

    initNO: string;
    readonly deepData = deepReact<IDDeep>({
        list: null,
        currentItem: null,
    });

    protected initID() {
        this.ID = this.getID();
        let { name } = this.ID;
        this.cache = caches[name];
        if (this.cache === undefined) {
            this.cache = new IdCache(this);
            caches[name] = this.cache;
        }
    }

    abstract get uq(): Uq;
    abstract getID(): ID;
    abstract get caption(): string;
    abstract get schema(): Schema;
    abstract get uiSchema(): UiSchema;
    // abstract renderTagInput(): JSX.Element;
    // get tagGroupName(): string { return undefined; }
    get icon(): string { return null; }
    get iconClass(): string { return undefined; }
    get isGlobal(): boolean { return this.ID.isGlobal; }

    getIdValue(id: number): any {
        return this.cache.getValue(id);
    }

    protected setIDDeepList(list: any[]) {
        this.deepData.list = list;
    }

    protected async initAdd() {
        let ID = this.ID;
        if (ID) {
            this.initNO = await this.uq.IDNO({ ID });
            setReact(() => {
                this.deepData.currentItem = null;
            });
        }
    }

    private addedIds: number[];
    private afterAddCallback: (ids: number[]) => Promise<void>;
    setAfterAdd(func: (ids: number[]) => Promise<void>) {
        this.afterAddCallback = func;
    }

    get VAdd(): new (c: CIdBase) => VPage<CIdBase> {
        return VAdd;
    }
    onAdd = async (): Promise<void> => {
        this.addedIds = [];
        await this.initAdd();
        this.open(this.VAdd, this.afterAdded);
    }

    get ids(): number[] { return this.addedIds; }

    afterAdded = async () => {
        if (this.afterAddCallback) {
            await this.afterAddCallback(this.addedIds);
            this.afterAddCallback = undefined;
        }
        else {
            await this.loadToList();
        }
    }

    async loadValue(id: number): Promise<IdValue> {
        let ret = await this.uq.ID({ IDX: this.ID, id: id });
        if (ret.length === 0) return null;
        return ret[0] as IdValue;
    }

    protected abstract loadList(): Promise<any[]>;
    abstract loadItemsFromIds(ids: number[]): Promise<any[]>;

    async loadToList() {
        let list = await this.loadList();
        setReact(() => {
            this.setIDDeepList(list);
        });
    }

    async onSaveId(data: any) {
        let id = await this.saveId(data);
        this.addedIds.push(id);
    }

    savePropValue(id: number, name: string, value: any): Promise<void> {
        return;
    }

    protected abstract saveId(data: any): Promise<number>;

    async search(key: string): Promise<any[]> {
        return null;
    }

    get VStart(): new (c: CIdBase) => VPage<CIdBase> {
        return undefined; // PIDList;
    }

    async openMain() {
        this.open(this.VStart);
        await this.loadToList();
    }

    get VEdit(): new (c: CIdBase) => VPage<CIdBase> {
        return undefined; // VIDEdit;
    }

    protected async beforeEdit() {
        // await this.waitFor(10);
    }

    onEditItem = async (item: any) => {
        setReact(async () => {
            this.deepData.currentItem = item;
            this.open(this.beforeEdit(), this.VEdit);
        });
    }

    renderItemInList(item: any): JSX.Element {
        return this.renderIdValue(item);
    }

    renderItemOnSelect(item: any): JSX.Element {
        return this.renderItemInList(item);
    }

    abstract renderIdValue(idValue: IdValue): JSX.Element;

    renderId(id: number): JSX.Element {
        return react(() => {
            let val = this.getIdValue(id);
            if (val === null || val === undefined) {
                return mutedSmall(id);
            }
            return this.renderIdValue(val);
        });
    }
}
