import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Typography, Divider } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { usePostLoginMutation } from "../../api/auth";
import { useMessage } from "../../context/MessageContext";

const { Title, Text } = Typography;

const LoginPage = () => {
  const messageApi = useMessage();
  const dispatch = useDispatch();

  const [login, { isLoading }] = usePostLoginMutation();

  interface LoginFormValues {
    email: string;
    password: string;
  }

  useEffect(() => {
    localStorage.removeItem("accessToken");
    dispatch({
      type: "auth/logout",
    });
  }, []);

  const onFinish = (values: LoginFormValues) => {
    login(values).then((res: any) => {
      if (res?.error) {
        messageApi.error(res.error.data.message || "");
      } else {
        localStorage.setItem("accessToken", res?.data?.data?.token);
        dispatch({
          type: "auth/updateAccessToken",
          payload: res?.data?.data?.token,
        });
        window.location.href = "/";
      }
    });
  };

  interface FacebookLoginResponse {
    data: {
      data: {
        token: string;
      };
    };
  }

  const handleFacebookLogin = async (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse | any
  ) => {
    if ("accessToken" in response && response.accessToken) {
      const accessToken: string = response.accessToken;
      try {
        // Gọi API backend để xử lý token từ Facebook
        const res: FacebookLoginResponse = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/auth/facebook`,
          {
            access_token: accessToken,
          }
        );

        const { token } = res.data.data;
        localStorage.setItem("accessToken", token);
        dispatch({
          type: "auth/updateAccessToken",
          payload: token,
        });
        window.location.href = "/";
      } catch (error: any) {
        console.error(
          "Facebook login error:",
          error.response?.data || error.message
        );
        messageApi.error(
          `Đăng nhập với Facebook thất bại: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
      messageApi.error("Đăng nhập với Facebook thất bại");
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log("credentialResponse", credentialResponse);
    const accessToken = credentialResponse.access_token;
    if (!accessToken) {
      messageApi.error("Đăng nhập với Google thất bại");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/google`,
        {
          access_token: accessToken,
        }
      );

      const { token } = res.data.data;
      localStorage.setItem("accessToken", token);
      dispatch({
        type: "auth/updateAccessToken",
        payload: token,
      });
      window.location.href = "/";
    } catch (error) {
      messageApi.error("Đăng nhập với Google thất bại");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => messageApi.error("Đăng nhập với Google thất bại"),
    scope: "email profile openid",
  });

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f5f5f5" }}
    >
      <Col span={8}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Lựa chọn đăng nhập
        </Title>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Button
              size="large"
              block
              style={{
                background: "#e5e5e5",
                borderColor: "#e5e5e5",
                color: "#000",
                fontWeight: 500,
              }}
              onClick={() => googleLogin()}
            >
              Google
            </Button>
          </Col>
          <Col span={12}>
            <FacebookLogin
              appId="1012441357492116"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleFacebookLogin}
              cssClass="facebook-login-button"
              textButton="Facebook"
              buttonStyle={{
                width: "100%",
                background: "#e5e5e5",
                borderColor: "#e5e5e5",
                color: "#000",
                fontWeight: 500,
                fontSize: "16px",
                padding: "8px 0",
              }}
            />
          </Col>
        </Row>

        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            name="login_form"
            initialValues={{}}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input size="large" placeholder="admin@gmail.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password size="large" placeholder="*******" />
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
                Sign In
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text>
                <Link to="/forgot-password">Forgot password?</Link>
              </Text>
              <Divider style={{ margin: "12px 0" }} />
              <Text>
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" style={{ color: "#860204" }}>
                  Đăng kí
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
