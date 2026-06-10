import React, { type ChangeEvent } from "react";
import styles from "./index.module.less";
import Map from "@/components/Map";
import { Layout } from "@/layout";
import { formConfig } from "./formConfig";
import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";
import { getFilesContent, integration } from "./utils";
import Sidebar from "./Sidebar";
import { useMemoizedFn } from "ahooks";

export default React.memo(function HomePage() {
  const selectedRegionChange = useMemoizedFn((regionName: string) => {
    console.log("当前选中的行政区划为", regionName);
  });

  const [filesContent, setFilesContent] = React.useState<
    { fileName: string; content: string }[]
  >([]);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    value: IFormItemConfig,
  ) => {
    if (value.key === "cannot-work-area") {
      const resolved = await getFilesContent(e.target.files);
      setFilesContent(resolved);
      const geojson = integration(resolved);
      console.log("整合后的geojson", geojson);
    }
  };

  const handleFilesContentChange = (
    contents: { fileName: string; content: string }[],
  ) => {
    setFilesContent(contents);
    if (contents.length > 0) {
      const geojson = integration(contents);
      console.log("整合后的geojson（来自侧边栏变更）", geojson);
    }
  };

  const handleReset = () => {
    console.log("重置表单");
    setFilesContent([]);
  };

  const handleSubmit = () => {
    if (filesContent.length === 0) {
      console.warn("请先上传文件");
      return;
    }
    const geojson = integration(filesContent);
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
                <Sidebar
                  configs={formConfig}
                  onChange={handleChange}
                  filesContent={filesContent}
                  onFilesContentChange={handleFilesContentChange}
                  onReset={handleReset}
                  onSubmit={handleSubmit}
                />
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
