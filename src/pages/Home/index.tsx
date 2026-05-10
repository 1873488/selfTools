import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import Map from "@/components/Map";
import { Layout } from "@/layout";

export interface IHomeProps extends IBaseProps {}

export default React.memo(() => {
  return (
    <div className={styles.wrapper}>
      <Layout
        header={{
          has: false,
          content: <div>header</div>,
        }}
        content={{
          content: <Map />,
        }}
        footer={{
          has: false,
          content: <div>footer</div>,
        }}
      />
    </div>
  );
});
