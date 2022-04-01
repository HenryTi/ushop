import React, { useContext, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { VFormContext, FormRowContext, VFormRowContext } from './Context';
import { FA } from './FA';

export interface RowProps {
    label?: string | JSX.Element;
    RowTemplate?: (props: RowTemplateProps) => JSX.Element;
}

interface RowTemplateProps {
    label: string | JSX.Element;
    errors: readonly { readonly name: string; readonly error: string; }[];
    memos: string[];
    children: React.ReactNode;
}
function DefaultRowTemplate(props: RowTemplateProps) {
    let { label, children, errors, memos } = props;
    return <div className="mb-3 row">
        <label className="col-sm-2 col-form-label text-end">{label}</label>
        <div className="col-sm-10">
            {children}
            <FieldErrors errors={errors} />
            <Memos memos={memos} />
        </div>
    </div>;
}
export function FieldError({ error }: { error: string; }) {
    return <div className="px-2 py-1 small">
        <FA name="exclamation-circle" className="me-2 text-danger" />
        <span className="text-info">{error}</span>
    </div>;
}

function FieldErrors({ errors }: { errors: readonly { error: string }[] }) {
    if (!errors) return null;
    return <>
        {errors.map((v, index) => <FieldError key={index} error={v.error} />)}
    </>;
}

function Memo({ memo }: { memo: string | JSX.Element; }) {
    if (typeof (memo) === 'string') {
        return <div className="px-2 py-1 small text-muted">
            <FA name="caret-right" className="me-2" />
            {memo}
        </div>;
    }
    return memo as JSX.Element;
}

function Memos({ memos }: { memos: (string | JSX.Element)[] }) {
    if (!memos) return null;
    return <>{
        memos.map((v, index) => <Memo key={index} memo={v} />)
    }</>;
}

function buildMemosFromChildren(children: React.ReactNode) {
    let memos: string[] = [];
    function each(cs: React.ReactNode) {
        React.Children.forEach(cs, c => {
            if (!c) return;
            if (React.isValidElement(c) === false) return;
            let e = c as JSX.Element;
            let { props } = e;
            if (props) {
                let { memo } = props;
                if (memo && typeof memo === 'string') memos.push(memo);
                each(props.children);
            }
        })
    }
    each(children);
    if (memos.length === 0) return;
    return memos;
}

export function Row(props: RowProps & { children: React.ReactNode; }) {
    let { label, children, RowTemplate } = props;
    let form = useContext(VFormContext);
    let memos: string[] = buildMemosFromChildren(children);
    let { current: formRow } = useRef(new FormRowContext(form, memos));
    let errors = useSnapshot(formRow.errors);
    RowTemplate = RowTemplate ?? form.props.RowTemplate ?? DefaultRowTemplate;
    return <VFormRowContext.Provider value={formRow}>
        <RowTemplate label={label} errors={errors} memos={formRow.memos}>
            {children}
        </RowTemplate>
    </VFormRowContext.Provider>;
}

