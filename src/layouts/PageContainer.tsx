import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Space,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowDownOutlined,
  DownloadOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import SiderPage from "./SiderPage";
import logoPage from "../assets/image/logo_page.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { handleGetFile } from "@/utils";
import { logout } from "@/features/auth/auth.slice";

const { Content, Footer } = Layout;
const { Search } = Input;

interface PropsType {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PropsType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());

    window.location.href = "/login";
  };

  const items: MenuProps["items"] = [
    {
      label: <Link to="/user/profile">Cài đặt tài khoản</Link>,
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: <Link to="/recharge">Nạp tiền</Link>,
      key: "3",
      icon: <MoneyCollectOutlined />,
    },
    {
      label: <Link to="/upload-document">Tải tài liệu</Link>,
      key: "4",
      icon: <UploadOutlined />,
    },
    {
      label: <Link to="/purchased-document">Tài liệu đã mua</Link>,
      key: "5",
      icon: <DownloadOutlined />,
    },
    {
      label: <Link to="/order">Giỏ hàng</Link>,
      key: "6",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Content>
      <div className="h-[80px] pr-8 pl-2 flex items-center justify-between bg-[#fff]">
        <Link to="/">
          <img width="250" height="80" className="logo" src={logoPage} alt="" />
        </Link>

        <div className="w-[300px] mx-4">
          <Search
            placeholder="Tìm kiếm tài liệu..."
            onSearch={(value) => {
              navigate(`/search?title=${value}`);
            }}
            style={{ width: 250 }}
            enterButton
            className="[&_input]:h-8"
          />
        </div>

        <SiderPage />

        {user && accessToken ? (
          <div className="flex flex-end p-[10px] z-[1001] cursor-pointer min-w-[200px]">
            <Dropdown menu={{ items }} placement="bottom">
              <Space>
                <Avatar
                  src={handleGetFile(user?.avatar || "")}
                  icon={!user?.avatar && <UserOutlined />}
                />
                <div
                  className="max-w-[100px] truncate"
                  style={{ cursor: "pointer" }}
                >
                  {user?.full_name || ""}
                </div>
              </Space>
            </Dropdown>
          </div>
        ) : (
          <Button type="link" href="/login">
            Đăng nhập
          </Button>
        )}
      </div>

      <Layout>
        <Content style={{ overflow: "initial" }}>
          <div className="bg-[#eee]">{children}</div>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by SAS
          </Footer>
        </Content>
      </Layout>
    </Content>
  );
};

export default PageContainer;
