import React from "react";
import styles from "./index.module.less";

export type IContentProps = {
  children?: React.ReactNode;
};

export default React.memo(function Content({ children }: IContentProps) {
  return <div className={styles.wrapper}>{children}</div>;
});
