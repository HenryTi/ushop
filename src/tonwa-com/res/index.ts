import { en } from './en';
import { EnumRes } from './Enum';
import { zh } from './zh';
export * from './Enum';

const resLang: { [lang: string]: { [key in EnumRes]: string } } = {
    en,
    zh
}

export const res: {
    [key in EnumRes]: string
} = { ...en };

export function setLangRes(lang: string, resParam: { [key in EnumRes]: string }) {
    if (!resParam) {
        resParam = resLang[lang];
    }
    if (!res) return;
    Object.assign(res, resParam);
}
