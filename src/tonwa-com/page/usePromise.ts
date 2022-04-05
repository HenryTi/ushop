import { useCallback, useEffect, useState } from "react";

export function usePromise<T>(promiseFunc: () => Promise<T>) {
    let [value, setValue] = useState<T>();
    let callback = useCallback(promiseFunc, []);
    useEffect(() => {
        const func = async () => {
            let r = await callback();
            setValue(r);
        }
        func();
    }, [callback]);
    return value;
}
