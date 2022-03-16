import { FA, LMR } from "tonwa-react";

interface IconCommandProps {
    caption: string;
    icon: string;
    iconClass: string;
    onClick: () => void;
}

export function IconCommand(props: IconCommandProps) {
    let { caption, icon, iconClass, onClick } = props;
    let right = <FA name="angle-right" />;
    let vIcon = <FA name={icon} className={(iconClass ?? 'text-primary') + ' me-4'} fixWidth={true} size="lg" />;
    return <LMR className="cursor-pointer bg-white border-bottom py-2 px-3 align-items-center"
        left={vIcon}
        right={right}
        onClick={onClick}>{caption}</LMR>
}
