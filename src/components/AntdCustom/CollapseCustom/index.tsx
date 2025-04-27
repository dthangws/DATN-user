import React from "react";
import type { CSSProperties } from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

interface PropsType {
  // eslint-disable-next-line no-unused-vars
  getItems: (panelStyle: CSSProperties) => CollapseProps["items"];
}

const CollapseCustom = ({ getItems }: PropsType) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
      items={getItems(panelStyle)}
    />
  );
};

export default CollapseCustom;
