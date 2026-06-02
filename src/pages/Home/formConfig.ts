import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";

export const formConfig: IFormItemConfig[][] = [
  [
    {
      key: "cannot-work-area",
      name: "cannot-work-area",
      type: "file",
      describe: "请选择避让范围",
      placeholder: "请选择避让范围",
      multiple: true,
      layout: "vertical",
      "data-immediate": true,
    },
    {
      key: "gen-arispcae-num",
      name: "gen-arispcae-num",
      type: "number",
      describe: "请输入生成空域的个数",
      placeholder: "请输入生成空域的个数",
      layout: "horizontal",
      "data-immediate": true,
    },
  ],
];
