import React, { createContext, useState, useEffect } from "react";
import { Layout, Button, Modal, Typography } from "antd";
import { InitialType, useUrlSearchParams } from "use-url-search-params";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

import PageContainer from "@/layouts/PageContainer";
import RechargeForm from "./RechargeForm";

const { Content } = Layout;

interface RechargeContextType {
  parameter?: InitialType;
  // eslint-disable-next-line no-unused-vars
  setParameter?: (nextQuery: InitialType) => void;
}

export const RechargeContext = createContext<RechargeContextType>({});

const RechargePage = () => {
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <RechargeContext.Provider value={data}>
      <PageContainer>
        <Layout style={{ minHeight: "100vh" }}>
          <Content style={{ padding: "16px" }}>
            <Layout>
              {accessToken ? (
                <RechargeForm />
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
                    Bạn cần đăng nhập. Vui lòng đăng nhập tài khoản.
                  </Typography.Text>
                </Modal>
              )}
            </Layout>
          </Content>
        </Layout>
      </PageContainer>
    </RechargeContext.Provider>
  );
};

export default RechargePage;
