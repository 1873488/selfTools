import React from "react";
import styles from "./index.module.less";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
export interface ILayoutProps {
  header: {
    has: boolean;
    content: React.ReactNode;
  };
  content: {
    content: React.ReactNode;
  };
  footer: {
    has: boolean;
    content: React.ReactNode;
  };
}

export const Layout = React.memo(
  ({ header, content, footer }: ILayoutProps) => {
    return (
      <div className={styles.wrapper}>
        {header.has && <Header>{header.content}</Header>}
        <Content>{content.content}</Content>
        {footer.has && <Footer>{footer.content}</Footer>}
      </div>
    );
  },
);
