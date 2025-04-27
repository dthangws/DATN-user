import React from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { Link, useSearchParams } from "react-router-dom";

import { usePostResetPasswordMutation } from "../../api/auth";
import { useMessage } from "../../context/MessageContext";

const { Title, Text } = Typography;

const ResetPasswordPage = () => {
  const messageApi = useMessage();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [resetPassword, { isLoading }] = usePostResetPasswordMutation();

  interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
  }

  const onFinish = (values: ResetPasswordFormValues) => {
    if (values.password !== values.confirmPassword) {
      messageApi.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    resetPassword({ token, password: values.password }).then((res: any) => {
      if (res?.error) {
        messageApi.error(res.error.data.message || "Đặt lại mật khẩu thất bại");
      } else {
        messageApi.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    });
  };

  if (!token) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", background: "#f5f5f5" }}
      >
        <Col span={8}>
          <Text type="danger">Liên kết không hợp lệ. Vui lòng thử lại.</Text>
        </Col>
      </Row>
    );
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f5f5f5" }}
    >
      <Col span={8}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Đặt lại mật khẩu
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
            name="reset_password_form"
            initialValues={{}}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password size="large" placeholder="********" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ]}
            >
              <Input.Password size="large" placeholder="********" />
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
                Đặt lại mật khẩu
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

export default ResetPasswordPage;
