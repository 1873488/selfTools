import React, { type ChangeEvent } from "react";
import styles from "./index.module.less";
import type { IFormItemConfig, IFormItemProps } from "./types";
import classNames from "classnames";
import { omit } from "lodash";
export default React.memo(
  ({ itemConfig = [], handleChange }: IFormItemProps) => {
    // 处理change事件 设置为immeadiate为false时 阻止事件冒泡避免被上级组件捕获
    const inputRef = React.useRef<HTMLInputElement>(null);
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
              <input
                {...omit(item, ["key"])}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  _handleChange(e, item)
                }
                ref={inputRef}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
);
