import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Image,
  Layout,
  Button,
  Spin,
  message,
  Modal,
  Input,
} from "antd";
import { handleGetFile } from "@/utils";
import PageContainer from "@/layouts/PageContainer";
import { usePaymentMutation } from "@/api/document";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const { Content } = Layout;

const OrderPage = () => {
  const navigate = useNavigate();
  const [handlePayment, { isLoading }] = usePaymentMutation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [cart, setCart] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);

  const handleRemove = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    message.success("Đã xóa khỏi đơn hàng!");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleCheckoutClick = () => {
    if (!accessToken) {
      setIsLoginModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "fileImages",
      key: "image",
      render: (fileImages: any[]) => (
        <Image
          width={60}
          src={
            fileImages?.[0]?.image_path
              ? handleGetFile(fileImages?.[0]?.image_path || "")
              : "https://www.testo.com/images/not-available.jpg"
          }
        />
      ),
    },
    {
      title: "Tên tài liệu",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price === 0
          ? "Miễn phí"
          : `${Number(price).toLocaleString("vi-VN")} VNĐ`,
    },
    {
      title: "Lượt xem",
      dataIndex: "view_count",
      key: "view_count",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => handleRemove(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  // Calculate total price (ignore free documents)
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price > 0 ? Number(item.price) : 0),
    0
  );

  const handleOrder = () => {
    const document_ids = cart.map((item) => item.id);
    handlePayment({
      document_ids,
      referral_code: referralCode || undefined,
    }).then((res: any) => {
      if (res?.error) {
        message.error(
          res?.error?.data?.message || "Thanh toán không thành công!"
        );
      } else {
        localStorage.removeItem("cart");
        setCart([]);
        setIsModalVisible(false);
        setReferralCode("");
        message.success("Thanh toán thành công!");
      }
    });
  };

  return (
    <PageContainer>
      <Layout className="bg-[#fff]" style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "16px" }} className="container mx-auto">
          <Typography.Title level={5} className="uppercase mb-4">
            Giỏ hàng của bạn
          </Typography.Title>
          <Spin spinning={isLoading}>
            <Table
              columns={columns}
              dataSource={cart}
              rowKey="id"
              pagination={false}
              locale={{ emptyText: "Không có tài liệu nào trong đơn hàng." }}
            />
          </Spin>

          {/* Total Price */}
          <div className="mt-4 flex justify-end">
            <Typography.Text strong>
              Tổng tiền:{" "}
              {totalPrice === 0
                ? "Miễn phí"
                : `${Number(totalPrice).toLocaleString("vi-VN")} VNĐ`}
            </Typography.Text>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 flex justify-end">
            <Button
              type="primary"
              disabled={cart.length === 0}
              onClick={handleCheckoutClick}
            >
              Thanh toán
            </Button>
          </div>

          {/* Login Required Modal */}
          <Modal
            title="Yêu cầu đăng nhập"
            open={isLoginModalVisible}
            onCancel={() => setIsLoginModalVisible(false)}
            footer={[
              <Button
                key="cancel"
                onClick={() => setIsLoginModalVisible(false)}
              >
                Hủy
              </Button>,
              <Button key="login" type="primary" onClick={handleLoginRedirect}>
                Đăng nhập
              </Button>,
            ]}
          >
            <Typography.Text>
              Bạn cần đăng nhập để thanh toán. Vui lòng đăng nhập tài khoản.
            </Typography.Text>
          </Modal>

          {/* Modal for referral code */}
          <Modal
            title="Nhập mã giới thiệu (nếu có)"
            open={isModalVisible}
            onOk={handleOrder}
            onCancel={() => setIsModalVisible(false)}
            okText="Xác nhận thanh toán"
            cancelText="Hủy"
            confirmLoading={isLoading}
          >
            <Input
              placeholder="Nhập mã giới thiệu"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              maxLength={32}
            />
          </Modal>
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default OrderPage;
