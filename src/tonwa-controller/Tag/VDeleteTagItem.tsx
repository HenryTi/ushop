import { MouseEvent } from 'react';
import { FA } from "tonwa-react";

interface Props {
    onTagItemDeleted: () => Promise<void>;
}

export function VDeleteTagItem({ onTagItemDeleted }: Props) {
    let onClick = async (evt: MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        if (window.confirm('Do you really want to delete?') === true) {
            await onTagItemDeleted();
        }
    }
    return <div className="mt-4 d-flex justify-content-end">
        <div onClick={onClick} className="px-3 py-2 cursor-pointer text-primary">
            <FA name="trash" /> Delete the item
        </div>
    </div>;
}