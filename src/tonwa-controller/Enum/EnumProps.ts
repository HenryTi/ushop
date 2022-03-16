import { IX, Uq } from "tonwa-uq";

export interface EnumProps {
    enums: number[];
    caption: string;
    enumCaptions: { [enm: number]: string };
    uq: Uq;
    IX: IX;
    onEnumChanged?: (value: number) => void;
}
