import React, { type ChangeEvent } from "react";
import styles from "./index.module.less";
import type { IFormItemConfig, IFormItemProps } from "./types";
import classNames from "classnames";
export default React.memo(function IFormItem({ itemConfig = [], handleChange }: IFormItemProps) {
    // 处理change事件 设置为immeadiate为false时 阻止事件冒泡避免被上级组件捕获
    // 表单就只做数据录入！
    const _handleChange = (
      e: ChangeEvent<HTMLInputElement>,
      item: IFormItemConfig,
    ) => {
      // 如果immediate为true，修改event返回
      e.stopPropagation();
      if (e.target.dataset.immediate) {
        handleChange?.(e, item);
      }
    };
    return (
      <div className={styles.row}>
        {itemConfig.map((item: IFormItemConfig, index: number) => (
          <div
            key={`form-item-col-${item.key}-${index}`}
            className={styles.col}
          >
            <div className={classNames(styles.label)}>{item.describe}</div>
            <div className={classNames(styles.input)}>
              {(() => {
                const inputProps = { ...item } as Record<string, unknown>;
                delete inputProps.key;
                delete inputProps.describe;
                delete inputProps.layout;
                return (
                  <input
                    {...(inputProps as Omit<
                      IFormItemConfig,
                      "key" | "describe" | "layout"
                    >)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      _handleChange(e, item)
                    }
                  />
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    );
},
);
