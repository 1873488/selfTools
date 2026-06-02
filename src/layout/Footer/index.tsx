import React from "react";
import styles from "./index.module.less";

export type IFooterProps = {
  children?: React.ReactNode;
};

export default React.memo(function Footer({ children }: IFooterProps) {
  return <div className={styles.wrapper}>{children}</div>;
});
