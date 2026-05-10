import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";

export interface IFooterProps extends IBaseProps {}

export default React.memo(({ children }: IFooterProps) => {
  return <div className={styles.wrapper}>{children}</div>;
});
