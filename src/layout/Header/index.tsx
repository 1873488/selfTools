import React from "react";
import styles from "./index.module.less";

export type IHeaderProps = {
  children?: React.ReactNode;
};

export default React.memo(function Header({ children }: IHeaderProps) {
  return <div className={styles.wrapper}>{children}</div>;
});
