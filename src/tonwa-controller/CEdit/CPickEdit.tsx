import { CEdit } from ".";

export class CPickEdit extends CEdit {
    renderRef(): JSX.Element {
        let { pick } = this.props;
        if (!pick) {
            return <span>pick is not defined</span>;
        }
        return pick.ref();
    }

    onEdit: () => Promise<void> = async () => {
        let { pick } = this.props;
        if (!pick) {
            alert('pick not defined in CPickEdit');
            return;
        }
        let ret = await pick.pick();
        let { onChanged } = this.props;
        if (onChanged) {
            let { value } = this.shallowValue;
            if (ret !== value) {
                let { itemSchema } = this.props;
                await onChanged(itemSchema.name, ret);
                this.shallowValue.value = ret;
            }
        }
    }
}
