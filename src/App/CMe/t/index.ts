import { buildTFunc } from "tonwa-controller";
import { en } from "./en";
import { zh } from "./zh";

export const t = buildTFunc({
    en: en,
    zh: zh,
});
