import { Widget } from './widget';
import { UiPick } from '../../schema';
import { runInAction } from 'mobx';

export class PickWidget extends Widget {
    protected get ui(): UiPick { return this._ui as UiPick };

    setReadOnly(value: boolean) { this.readOnly = value }
    setDisabled(value: boolean) { this.disabled = value }

    protected onClick = async () => {
        let pick = this.ui?.pick;
        if (pick === undefined) {
            alert('no pick defined!');
            return;
        }
        let id = await pick.pick();
        runInAction(() => {
            this.setDataValue(id);
            this.clearError();
            this.clearContextError();
            this.checkRules();
        });
    }

    setValue(value: any) {
        super.setValue(value);
    }

    render() {
        let pick = this.ui?.pick;
        if (pick === undefined) {
            return <span>no pick defined!</span>;
        }
        return <div className={this.className + ' cursor-pointer '} onClick={this.onClick}>{pick.ref()}</div>;
    }
}
