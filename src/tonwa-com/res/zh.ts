import { EnumRes } from "./Enum";

export const zh: {
    [key in EnumRes]: string
} =
{
    [EnumRes.rule_required]: '请填内容',
    [EnumRes.rule_mustBeInteger]: '必须是整数',
    [EnumRes.rule_mustBeDecimal]: '必须是数字',
    [EnumRes.rule_belowMin]: '最小值',
    [EnumRes.rule_overMax]: '最大值',
    [EnumRes.placeholder_pick]: '请点击选择',
    [EnumRes.placeholder_select]: '请点击选择',

    [EnumRes.string_submit]: '提交',
};

