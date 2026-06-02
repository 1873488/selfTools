import React from "react";
import styles from "./Sidebar.module.less";
import IForm from "@/components/IForm";
import type { IFormItemConfig } from "@/components/IForm/components/IFormItem/types";

export interface ISidebarProps {
  configs: IFormItemConfig[][];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: IFormItemConfig) => void;
  filesContent: { fileName: string; content: string }[];
  onFilesContentChange: (files: { fileName: string; content: string }[]) => void;
  onReset?: () => void;
  onSubmit?: () => void;
}

export default React.memo(function Sidebar(
  {
    configs,
    onChange,
    filesContent = [],
    onFilesContentChange,
    onReset,
    onSubmit,
  }: ISidebarProps) {
    const handleDelete = (index: number) => {
      const next = filesContent.filter((_, i) => i !== index);
      onFilesContentChange(next);
    };

    const handleResetClick = () => {
      onFilesContentChange([]);
      onReset?.();
    };

    const handleSubmitClick = () => {
      onSubmit?.();
    };

    return (
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.title}>数据导入与配置</div>
          <div className={styles.subtitle}>支持 GeoJSON 文件拖拽或选择上传</div>
        </div>
        <div className={styles.formWrap}>
          <IForm
            configs={configs}
            onChange={onChange}
            showOperationBtns={false}
            className={styles.iForm}
          />
        </div>
        <div className={styles.fileListWrap}>
          <div className={styles.fileListTitle}>已上传文件</div>
          {filesContent.length === 0 ? (
            <div className={styles.empty}>暂无文件</div>
          ) : (
            <ul className={styles.fileList}>
              {filesContent.map((f, idx) => (
                <li key={`file-${f.fileName}-${idx}`} className={styles.fileItem}>
                  <div className={styles.fileName}>{f.fileName}</div>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(idx)}
                    aria-label={`删除 ${f.fileName}`}
                  >
                    删除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.footer}>
          <button className={styles.submitBtn} onClick={handleSubmitClick}>
            开始生成
          </button>
          <button className={styles.resetBtn} onClick={handleResetClick}>
            重置
          </button>
        </div>
      </div>
    );
  }
);
