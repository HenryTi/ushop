import { AnnotationsMap, makeObservable, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';

function buildReactiveProps<T extends object>(data: T, ob: any): AnnotationsMap<T, never> {
    let ret: AnnotationsMap<T, never> = {};
    for (let i in data) {
        let v = data[i];
        switch (typeof v) {
            default:
                ob = observable;
                break;
            case 'object':
            case 'function':
                break;
        }
        (ret as any)[i] = ob;
    }
    return ret;
}

export function deepReact<T extends object>(data: T): T {
    let ret = makeObservable(data, buildReactiveProps(data, observable));
    return ret;
}

export function shallowReact<T extends object>(data: T): T {
    let ret = makeObservable(data, buildReactiveProps(data, observable.shallow));
    return ret;
}

export function setReact<T>(fn: () => T): T {
    return runInAction(fn);
}

export function react(func: () => JSX.Element): JSX.Element {
    let V = observer(func);
    return React.createElement(V);
}
