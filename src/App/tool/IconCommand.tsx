import { FA, LMR } from "tonwa-com";

interface IconCommandProps {
    caption: string;
    icon: string;
    iconClass?: string;
    onClick: () => void;
}

export function IconCommand({ caption, icon, iconClass, onClick }: IconCommandProps) {
    return <LMR className="cursor-pointer bg-white border-bottom py-2 px-3 align-items-center"
        onClick={onClick}>
        <FA name={icon} className={(iconClass ?? 'text-primary') + ' me-4'} fixWidth={true} size="lg" />
        {caption}
        <FA name="angle-right" />
    </LMR>;
}
