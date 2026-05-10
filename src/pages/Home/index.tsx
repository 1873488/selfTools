import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import { Layout } from "@/layout";

export interface IHomeProps extends IBaseProps {}

export default React.memo(() => {
  return (
    <div className={styles.wrapper}>
      <Layout 
        header={{
          has: true,
          content: <div>header</div>,
        }}
        content={{
          content: <div>content</div>,
        }}
        footer={{
          has: true,
          content: <div>footer</div>,
        }}
      />
    </div>
  );
});
