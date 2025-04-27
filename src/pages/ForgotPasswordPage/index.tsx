import React from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

import { usePostForgotPasswordMutation } from "../../api/auth";
import { useMessage } from "../../context/MessageContext";

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const messageApi = useMessage();

  const [forgotPassword, { isLoading }] = usePostForgotPasswordMutation();

  interface ForgotPasswordFormValues {
    email: string;
  }

  const onFinish = (values: ForgotPasswordFormValues) => {
    forgotPassword(values).then((res: any) => {
      if (res?.error) {
        messageApi.error(res.error.data.message || "Gửi yêu cầu thất bại");
      } else {
        messageApi.success(
          "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!"
        );
      }
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f5f5f5" }}
    >
      <Col span={8}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Quên mật khẩu
        </Title>

        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            name="forgot_password_form"
            initialValues={{}}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input size="large" placeholder="email@gmail.com" />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                htmlType="submit"
                block
                loading={isLoading}
                style={{
                  background: "#1a1a1a",
                  borderColor: "#1a1a1a",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                Gửi liên kết đặt lại
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text>
                <Link to="/login">Quay lại đăng nhập</Link>
              </Text>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;
