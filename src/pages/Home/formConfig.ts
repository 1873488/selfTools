import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";

export const formConfig: IFormItemConfig[][] = [
  [
    {
      key: "main-work-area",
      name: "main-work-area",
      type: "file",
      describe: "请请选择主范围",
      placeholder: "请选择主范围",
      layout: "horizontal",
      "data-immediate": true,
    },
  ],
  [
    {
      key: "cannot-work-area",
      name: "cannot-work-area",
      type: "file",
      describe: "请请选择避让范围",
      placeholder: "请请选择避让范围",
      multiple: true,
      layout: "vertical",
      "data-immediate": true,
    },
  ],
];
