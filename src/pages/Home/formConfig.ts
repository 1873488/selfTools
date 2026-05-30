import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";

export const formConfig: IFormItemConfig[][] = [
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
