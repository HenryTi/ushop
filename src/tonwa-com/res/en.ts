import { EnumRes } from "./Enum";

export const en: {
    [key in EnumRes]: string
} =
{
    [EnumRes.rule_required]: 'Is required',
    [EnumRes.rule_mustBeInteger]: 'Must be integer',
    [EnumRes.rule_mustBeDecimal]: 'Must be number',
    [EnumRes.rule_belowMin]: 'Min is ',
    [EnumRes.rule_overMax]: 'Max is ',
    [EnumRes.placeholder_pick]: 'Click to pick',
    [EnumRes.placeholder_select]: 'Click to select',

    [EnumRes.string_submit]: 'Submit',
};
