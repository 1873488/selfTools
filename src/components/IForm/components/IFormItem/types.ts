import type { IBaseProps } from "@/utils";
import type { ChangeEvent } from "react";
import type React from "react";

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
  ["data-immediate"]: boolean;
}
export interface IFormItemProps extends IBaseProps {
  itemConfig: Array<IFormItemConfig>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    value: IFormItemConfig,
  ) => void;
}
export interface IFormOperationBtnsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnName: string;
  btnIndex: number;
}
