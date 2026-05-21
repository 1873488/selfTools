import React, { type ChangeEvent } from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import Map from "@/components/Map";
import { Layout } from "@/layout";
import IForm from "@/components/IForm";
import { formConfig } from "./formConfig";
import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";

export interface IHomeProps extends IBaseProps {}

export default React.memo(() => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: IFormItemConfig,
  ) => {
    console.log(e);
    console.log(value);
  };

  return (
    <div className={styles.wrapper}>
      <Layout
        header={{
          has: false,
          content: <div>header</div>,
        }}
        content={{
          content: (
            <div className={styles.contentPanel}>
              <div className={styles.leftPanel}>
                <div className="sidebar">
                  <IForm configs={formConfig} onChange={handleChange} />
                </div>
              </div>
              <div className={styles.mapPanel}>
                <Map />
              </div>
            </div>
          ),
        }}
        footer={{
          has: false,
          content: <div>footer</div>,
        }}
      />
    </div>
  );
});
