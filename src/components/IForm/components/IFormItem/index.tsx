import React from "react";
import styles from "./index.module.less";
import type { IFormItemProps } from "./types";

export default React.memo(({}: IFormItemProps) => {
  return <div className={styles.wrapper}></div>;
});
