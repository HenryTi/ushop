import * as React from 'react';

interface Props {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

export function LMR(props: Props) {
    let { className, children, onClick } = props;
    let cn = (className ?? '');
    if (onClick !== undefined) cn += ' cursor-pointer ';
    let arr = React.Children.toArray(children);
    let len = arr.length;
    if (len > 0) {
        arr.splice(len - 1, 0, <div className="me-auto" />);
    }
    /*
    if (len > 1) {
        let el = arr[len - 2];
        let elNew: any;
        if (typeof el === 'string') {
            elNew = <div className="flex-grow-1">{el}</div>;
        }
        else {
            let { props } = el as React.ReactElement;
            let propsCn = (props?.className ?? '') + ' flex-grow-1 ';
            elNew = React.cloneElement(el as React.ReactElement, { className: propsCn });
        }
        arr.splice(len - 2, 1, elNew);
    }
    */
    return <div className={'d-flex ' + cn} onClick={onClick}>
        {arr.map((v, index) => <React.Fragment key={index}>{v}</React.Fragment>)}
    </div>;
}
