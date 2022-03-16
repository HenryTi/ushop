import { Controller } from "./Controller";
import { VPage } from "./VPage";

export class PError extends VPage<Controller, Error> {
    header(): string | boolean | JSX.Element {
        let { name } = this.props;
        return name;
        /*
        return <span>
            <FA name="times" className="mx-3 text-danger" />
            {name}
        </span>;
        */
    }

    protected get headerClassName(): string {
        return 'text-danger bg-warning bg-gradient'
    }

    protected get back(): "close" | "back" | "none" {
        return 'close';
    }

    content() {
        let { message, stack } = this.props;
        return <div className="p-3">
            <div>{message}</div>
            <div>{stack}</div>
        </div>
    }
}