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
  const [formVal, setFormVal] = React.useState({});
  const selectedRegionChange = (regionName: string) => {
    console.log("当前选中的行政区划为", regionName);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: IFormItemConfig,
  ) => {
    if (value.key === "'cannot-work-area'") {
      addGeoFence(e.target.files);
    }
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
                <Map selectedRegionChange={selectedRegionChange} />
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
