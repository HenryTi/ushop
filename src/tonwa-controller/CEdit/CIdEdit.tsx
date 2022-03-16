import { VPage } from "tonwa-controller";
import { CEdit } from ".";

export class CIdEdit extends CEdit {
    get Page(): new (c: CEdit) => VPage<CEdit> {
        return VIdEditPage;
    }
}

class VIdEditPage extends VPage<CIdEdit> {
    header(): string | boolean | JSX.Element {
        return this.controller.label;
    }

    content(): JSX.Element {
        return <div>
            select id
        </div>
    }
}