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
          content: (
            <div className={styles.contentPanel}>
              <div className={styles.leftPanel}>
                <div className="sidebar">
                  <div className="control-group">
                    <label>请选择范围</label>
                    <input
                      type="file"
                      id="mainAreaFile"
                      accept=".geojson,.json"
                    />
                    <div className="status-card" id="mainStatus">
                      未加载范围
                    </div>
                  </div>

                  <div className="control-group">
                    <label>可选-请输入障碍区域-支持多选</label>
                    <input
                      type="file"
                      id="avoidFile"
                      accept=".geojson,.json"
                      multiple
                    />
                  </div>

                  <div className="control-group">
                    <label>需要生成的多边形数量</label>
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value="40"
                      step="1"
                    />
                  </div>

                  <div className="control-group">
                    <button id="generateBtn">随机生成</button>
                    <button id="downloadBtn" className="download" disabled>
                      保存
                    </button>
                  </div>
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
