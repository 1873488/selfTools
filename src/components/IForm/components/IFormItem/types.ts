import type { IBaseProps } from "@/utils";

export interface IFormItemConfig {
  key: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  describe?: string;
  placeholder?: string;
  value?: string;
  multiple?: boolean;
  max?: number;
  min?: number;
  layout: "vertical" | "horizontal" | "nolabel";
  immediate: boolean;
  [attr: string]: any;
}
export interface IFormItemProps extends IBaseProps {
  itemConfig: IFormItemConfig;
}
