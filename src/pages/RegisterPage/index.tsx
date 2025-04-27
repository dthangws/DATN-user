import React from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { usePostRegisterMutation, RegisterApiArg } from "../../api/auth";
import { useMessage } from "../../context/MessageContext";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const messageApi = useMessage();
  const dispatch = useDispatch();

  const [register, { isLoading }] = usePostRegisterMutation();

  const onFinish = (values: RegisterApiArg) => {
    if (values.password !== values.confirmPassword) {
      messageApi.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    const { email, username, password, full_name, phone } = values;
    register({ email, username, password, full_name, phone }).then(
      (res: any) => {
        if (res?.error) {
          messageApi.error(res.error.data.message || "Đăng kí thất bại");
        } else {
          localStorage.setItem("accessToken", res?.data?.data?.token);
          dispatch({
            type: "auth/updateAccessToken",
            payload: res?.data?.data?.token,
          });
          window.location.href = "/";
        }
      }
    );
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f5f5f5" }}
    >
      <Col span={8}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Đăng kí tài khoản
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
            name="register_form"
            initialValues={{}}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Tên đầy đủ"
              name="full_name"
              rules={[{ required: true, message: "Vui lòng nhập tên dầy đủ!" }]}
            >
              <Input size="large" placeholder="Tên đầy đủ" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập username!" }]}
            >
              <Input size="large" placeholder="username" />
            </Form.Item>

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

            <Form.Item label="Số điện thoại" name="phone">
              <Input size="large" placeholder="0987654321" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
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
                Sign Up
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text>
                Bạn đã có tài khoản?{" "}
                <Link to="/login" style={{ color: "#860204" }}>
                  Đăng nhập
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
