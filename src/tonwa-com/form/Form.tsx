import React, { useRef } from 'react';
import { VBandContainerContext, Band, BandContainerProps, BandFieldErrors, BandMemos, BandTemplateProps } from '../band';
import { useSnapshot } from 'valtio';
import { FormContext, VFormContext, useForm } from './FormContext';
import { BandFieldError } from '../band';
import { Rule } from '../fields';

export interface FormProps extends BandContainerProps {
    rule?: Rule | Rule[];
}

function DefaultBandTemplate(props: BandTemplateProps) {
    let { label, children, errors, memos } = props;
    let vLabel: any;
    let cnContent = 'col-sm-10';
    if (label) {
        vLabel = <label className="col-sm-2 col-form-label text-sm-end"><b>{label}</b></label>;
    }
    else {
        cnContent += ' offset-sm-2';
    }
    return <div className="mb-3 row bg-white">
        {vLabel}
        <div className={cnContent}>
            {children}
            <BandFieldErrors errors={errors} />
            <BandMemos memos={memos} />
        </div>
    </div>;
}

export function Form(props: FormProps) {
    let { className, children, BandTemplate } = props;
    BandTemplate = BandTemplate ?? DefaultBandTemplate;
    let { current: formContext } = useRef(new FormContext({ ...props, BandTemplate }));
    return <VFormContext.Provider value={formContext}>
        <VBandContainerContext.Provider value={formContext}>
            <form className={className}>
                {children}
            </form>
        </VBandContainerContext.Provider>
    </VFormContext.Provider>;
}

export function FormErrors() {
    let form = useForm();
    let { errors } = useSnapshot(form.errorResponse);
    if (!errors) return null;
    return <>
        {errors.map((v, index) => <BandFieldError key={index} error={v} />)}
    </>;
}

export function BandFormErrors() {
    let form = useForm();
    let { errors } = useSnapshot(form.errorResponse);
    if (!errors) return null;
    return <Band>
        {errors.map((v, index) => <BandFieldError key={index} error={v} />)}
    </Band>;
}
