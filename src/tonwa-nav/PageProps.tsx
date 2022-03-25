import { Scroller } from "tonwa-react";

export interface PageBackProps {
    back?: 'close' | 'back' | 'none';
}

export interface PageHeaderProps extends PageBackProps {
    header?: string | JSX.Element;
    right?: JSX.Element;
}

export interface PageFooterProps {
    footer?: JSX.Element;
}

export interface PageContentProps {
    children?: React.ReactNode;
    contentClassName?: string;

    onPageScroll?: (e: any) => void;
    onPageScrollTop?: (scroller: Scroller) => Promise<boolean>;
    onPageScrollBottom?: (scroller: Scroller) => Promise<void>;
}

export interface PageTemplateProps {
    Back?: (props: PageProps) => JSX.Element;
    Header?: (props: PageProps) => JSX.Element;
    Footer?: (props: PageProps) => JSX.Element;
    Content?: (props: PageProps) => JSX.Element;
    contentClassName?: string;
    Error?: (props: PageProps) => JSX.Element;
    errorPosition?: 'above-header' | 'under-header';
}

export interface PageProps extends PageHeaderProps, PageFooterProps, PageContentProps, PageTemplateProps {
    template?: string;
}
