import { MouseEvent } from 'react';
import { View } from "tonwa-contoller";
import { FA } from "tonwa-react";
import { CTagBase } from "./CTagBase";

export class VDeleteTagItem extends View<CTagBase, () => Promise<void>> {
    render() {
        return <div className="mt-4 d-flex justify-content-end">
            <div onClick={this.onClick} className="px-3 py-2 cursor-pointer text-primary">
                <FA name="trash" /> Delete the item
            </div>
        </div>;
    }

    onClick = async (evt: MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        if (window.confirm('Do you really want to delete?') === true) {
            await this.props();
        }
    }
}