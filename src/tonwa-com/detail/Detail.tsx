import React, { useContext, useRef } from "react";
import { FA, Sep } from "../coms";
import { Form, Submit } from "../form";
import { Page, useNav } from "../page";
import { Band, BandContainerContext, BandContainerProps, BandFieldErrors, BandMemos, BandTemplateProps, OnValuesChanged, useBand, useBandContainer, VBandContainerContext } from "../band";

interface DetailProps extends BandContainerProps {
    onValuesChanged?: OnValuesChanged;
}

class DetailContext extends BandContainerContext<DetailProps> {
    get isDetail(): boolean {
        return true;
    }
    protected async internalValuesChanged(values: { name: string; value: any; preValue: any; }[]) {
        await this.props.onValuesChanged?.(values);
    }
}

const DetailContextContainer = React.createContext<DetailContext>(undefined);
export function useDetail() {
    return useContext(DetailContextContainer);
}

export function Detail(props: DetailProps) {
    let { className, children, BandTemplate } = props;
    BandTemplate = BandTemplate ?? DefaultBandTemplate;
    let { current: detailContext } = useRef(new DetailContext({ ...props, BandTemplate }));
    return <DetailContextContainer.Provider value={detailContext}>
        <VBandContainerContext.Provider value={detailContext}>
            <div className={className}>
                {children}
            </div>
        </VBandContainerContext.Provider>
    </DetailContextContainer.Provider>;
}

function DefaultBandTemplate(props: BandTemplateProps) {
    let nav = useNav();
    let bandContainer = useBandContainer();
    let band = useBand();
    let { label, children, errors, memos, onEdit, content, sep, isCheck } = props;
    let labelContent = isCheck === true ? null : <b>{label}</b>;
    let vLabel = <label className="col-sm-2 col-form-label text-sm-end tonwa-bg-gray-1 border-end">
        {labelContent}
    </label>;
    let cnContent = 'col-sm-10 d-flex pe-0';
    let vEdit: any;
    if (band.readOnly === true) {
        vEdit = null;
    }
    else {
        onEdit = onEdit ?? async function () {
            nav.open(<ValueEditPage label={label}
                content={content}
                values={{ ...bandContainer.valueResponse.values }}
                onValuesChanged={bandContainer.onValuesChanged}
            />);
        }
        vEdit = <div onClick={onEdit}
            className="px-3 align-self-stretch d-flex align-items-center cursor-pointer"
        >
            <FA name="pencil-square-o" className="text-primary" />
        </div>;
    }
    return <>
        <Sep sep={sep} />
        <div className="row bg-white mx-0">
            {vLabel}
            <div className={cnContent}>
                <div className="flex-grow-1">
                    {children}
                    <BandFieldErrors errors={errors} />
                    <BandMemos memos={memos} />
                </div>
                {vEdit}
            </div>
        </div>
    </>;
}

interface ValueEditPageProps {
    label: string | JSX.Element;
    content: React.ReactNode;
    values: any;
    onValuesChanged: (values: any) => Promise<void>;
}
function ValueEditPage({ content, label, values, onValuesChanged }: ValueEditPageProps) {
    let nav = useNav();
    async function onSubmit(data: any) {
        await onValuesChanged(data);
        nav.close();
    }
    return <Page header={label} back="close">
        <Form className="container px-3 py-3" values={values} BandTemplate={ValueEditBandTemplate}>
            <Band>
                {content}
            </Band>
            <Submit onSubmit={onSubmit} />
        </Form>
    </Page>;
}

function ValueEditBandTemplate(props: BandTemplateProps) {
    let { children, errors, memos } = props;
    return <div className="bg-white mb-3">
        {children}
        <BandFieldErrors errors={errors} />
        <BandMemos memos={memos} />
    </div>;
}
