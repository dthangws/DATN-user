import React from "react";
import { Layout, Typography } from "antd";

import PageContainer from "@/layouts/PageContainer";
import ProfileForm from "./components/ProfileForm";
const { Content } = Layout;

const Profile = () => {
  return (
    <PageContainer>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "16px" }}>
          <Typography.Title level={5} className="uppercase mb-4">
            Cài đặt tài khoản
          </Typography.Title>

          <Layout>
            <ProfileForm />
          </Layout>
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default Profile;
