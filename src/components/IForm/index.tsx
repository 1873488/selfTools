import React, { type ChangeEvent } from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import type { IFormItemConfig } from "./components/IFormItem/types";
import classNames from "classnames";
import IFormItem from "./components/IFormItem";

export interface IFormProps extends IBaseProps {
  onSave?: (data: any) => void;
  onCancel?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>, value: IFormItemConfig) => void;
  showOperationBtns?: boolean;
  configs: IFormItemConfig[][];
}

export default React.memo(
  ({
    onSave,
    onCancel,
    onChange,
    configs,
    showOperationBtns = true,
  }: IFormProps) => {
    const _onCancel = () => {
      onCancel?.();
    };
    const _onSave = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, any> = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      onSave?.(data);
    };

    const _handleChange = (
      e: ChangeEvent<HTMLInputElement>,
      item: IFormItemConfig,
    ) => {
      console.log(e);
      onChange?.(e, item);
    };
    return (
      <form className={styles.form} onSubmit={_onSave} onReset={_onCancel}>
        {configs.map((row, index) => (
          <IFormItem
            key={`form-item-${index}`}
            handleChange={_handleChange}
            itemConfig={row}
          />
        ))}
        {showOperationBtns && (
          <>
            <input
              type="reset"
              value="重置"
              className={classNames(styles.btns, styles.cancel)}
            />
            <input
              type="submit"
              value="保存"
              className={classNames(styles.btns, styles.cancel)}
            />
          </>
        )}
      </form>
    );
  },
);
