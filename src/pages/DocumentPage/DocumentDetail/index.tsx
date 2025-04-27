import React, { createContext } from "react";
import { Layout, Typography } from "antd";
import { InitialType, useUrlSearchParams } from "use-url-search-params";

import PageContainer from "@/layouts/PageContainer";
import Detail from "./Detail";

const { Content } = Layout;

interface DocumentContextType {
  parameter?: InitialType;
  // eslint-disable-next-line no-unused-vars
  setParameter?: (nextQuery: InitialType) => void;
}

export const DocumentContext = createContext<DocumentContextType>({});

const DocumentDetailPage = () => {
  const [parameter, setParameter] = useUrlSearchParams({ page: 1, limit: 10 });
  const data = { parameter, setParameter };

  return (
    <DocumentContext.Provider value={data}>
      <PageContainer>
        <Layout style={{ minHeight: "100vh" }}>
          <Content style={{ padding: "16px" }}>
            <Typography.Title level={5} className="uppercase mb-4">
              Thông tin tài liệu
            </Typography.Title>

            <Layout>
              <Detail />
            </Layout>
          </Content>
        </Layout>
      </PageContainer>
    </DocumentContext.Provider>
  );
};

export default DocumentDetailPage;
