import React, { createContext } from "react";
import { Image, Layout, Typography } from "antd";
import { InitialType, useUrlSearchParams } from "use-url-search-params";

import PageContainer from "@/layouts/PageContainer";
import DocumentList from "./DocumentList";

const { Content } = Layout;

interface DocumentContextType {
  parameter?: InitialType;
  // eslint-disable-next-line no-unused-vars
  setParameter?: (nextQuery: InitialType) => void;
}

export const DocumentContext = createContext<DocumentContextType>({});

const DocumentPage = () => {
  const [parameter, setParameter] = useUrlSearchParams({ page: 1, limit: 10 });
  const data = { parameter, setParameter };

  return (
    <DocumentContext.Provider value={data}>
      <PageContainer>
        <Layout className="bg-[#fff]" style={{ minHeight: "100vh" }}>
          <Content style={{ padding: "16px" }} className="container mx-auto">
            <Image
              src={"@/assets/image/banner.png"}
              alt=""
              className="w-full h-[200px]"
            />
            <Typography.Title level={5} className="uppercase mb-4">
              Danh sách tài liệu
            </Typography.Title>

            <DocumentList />
          </Content>
        </Layout>
      </PageContainer>
    </DocumentContext.Provider>
  );
};

export default DocumentPage;
