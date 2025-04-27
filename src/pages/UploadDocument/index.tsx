import React, { createContext, useEffect, useState } from "react";
import { Layout, Typography, Modal, Button, Spin } from "antd";
import { InitialType, useUrlSearchParams } from "use-url-search-params";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

import PageContainer from "@/layouts/PageContainer";
import DocumentForm from "./DocumentForm";
import {
  GetListDocumentApiResponse,
  useGetListDocumentQuery,
} from "@/api/document";
import List from "../DocumentPage/DocumentList/List";

const { Content } = Layout;

interface DocumentContextType {
  parameter?: InitialType;
  // eslint-disable-next-line no-unused-vars
  setParameter?: (nextQuery: InitialType) => void;
}

export const UploadDocumentContext = createContext<DocumentContextType>({});

const UploadDocumentPage = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: documents, isLoading } = useGetListDocumentQuery({
    user_id: user?.id,
    status: "active",
  });
  const documentList = documents as GetListDocumentApiResponse;

  useEffect(() => {
    if (!accessToken) {
      setIsModalVisible(true);
    }
  }, [accessToken]);

  const handleLoginRedirect = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const [parameter, setParameter] = useUrlSearchParams({ page: 1, limit: 10 });
  const data = { parameter, setParameter };

  return (
    <UploadDocumentContext.Provider value={data}>
      <PageContainer>
        <Layout style={{ minHeight: "100vh" }}>
          <Content style={{ padding: "16px" }}>
            <Typography.Title level={5} className="uppercase mb-4">
              Đăng tài liệu
            </Typography.Title>

            <Layout>
              {accessToken ? (
                <Spin spinning={isLoading}>
                  <DocumentForm />

                  <div className="bg-white p-5">
                    <Typography.Title level={5} className="uppercase mb-6">
                      Tài liệu của tôi
                    </Typography.Title>
                    <List documentList={documentList} />
                  </div>
                </Spin>
              ) : (
                <Modal
                  title="Yêu cầu đăng nhập"
                  visible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  footer={[
                    <Button
                      key="cancel"
                      onClick={() => setIsModalVisible(false)}
                    >
                      Hủy
                    </Button>,
                    <Button
                      key="login"
                      type="primary"
                      onClick={handleLoginRedirect}
                    >
                      Đăng nhập
                    </Button>,
                  ]}
                >
                  <Typography.Text>
                    Bạn cần đăng nhập để đăng tài liệu. Vui lòng đăng nhập tài
                    khoản.
                  </Typography.Text>
                </Modal>
              )}
            </Layout>
          </Content>
        </Layout>
      </PageContainer>
    </UploadDocumentContext.Provider>
  );
};

export default UploadDocumentPage;
