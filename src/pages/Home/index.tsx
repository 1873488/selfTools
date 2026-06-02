import React, { type ChangeEvent } from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import Map from "@/components/Map";
import { Layout } from "@/layout";
import IForm from "@/components/IForm";
import { formConfig } from "./formConfig";
import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";
import { getFilesContent, integration } from "./utils";

export interface IHomeProps extends IBaseProps {}

export default React.memo(() => {
  const selectedRegionChange = (regionName: string) => {
    console.log("当前选中的行政区划为", regionName);
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    value: IFormItemConfig,
  ) => {
    if (value.key === "cannot-work-area") {
      const asyncFilesContent = await getFilesContent(e.target.files);
      const filesContent = await Promise.all(asyncFilesContent);
      const geojson = integration(filesContent);
      console.log("整合后的geojson", geojson);
    }
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
