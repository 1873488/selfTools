import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import type { IFormItemConfig } from "./components/IFormItem/types";

export interface IFormProps extends IBaseProps {
  onSave?: (data: any) => void;
  onCancel?: () => void;
  configs: IFormItemConfig[][];
}

export default React.memo(({ onSave, onCancel, configs }: IFormProps) => {
  return (
    <form className={styles.form}>
      {configs.map((row) =>
        row.map((item) => {
          return (
            <div className={styles.row}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.input}>
                <input type={item.type} placeholder={item.placeholder} />
              </div>
            </div>
          );
        }),
      )}
    </form>
  );
});
