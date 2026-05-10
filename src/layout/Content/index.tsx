import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";

export interface IContentProps extends IBaseProps {}

export default React.memo(({ children }: IContentProps) => {
  return <div className={styles.wrapper}>{children}</div>;
});
