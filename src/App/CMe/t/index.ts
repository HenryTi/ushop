import { buildTFunc } from "tonwa-contoller";
import { en } from "./en";
import { zh } from "./zh";

export const t = buildTFunc({
    en: en,
    zh: zh,
});
