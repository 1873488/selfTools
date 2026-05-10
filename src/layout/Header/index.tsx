import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";

export interface IHeaderProps extends IBaseProps {}

export default React.memo(({ children }: IHeaderProps) => {
  return <div className={styles.wrapper}>{children}</div>;
});
