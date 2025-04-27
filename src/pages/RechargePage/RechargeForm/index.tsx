import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
} from "antd";
import { usePostVnPayMutation } from "@/api/vnpay";

const { Title } = Typography;
const { Option } = Select;

export default function RechargeForm() {
  const [form] = Form.useForm();

  const [postVnPay] = usePostVnPayMutation();

  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const handleSubmit = (values: any) => {
    postVnPay(values).then((res: any) => {
      if (res?.data?.success) {
        window.open(res?.data?.data?.paymentUrl, "_blank");
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng liên hệ với quản trị viên");
      }
    });
  };

  return (
    <Card
      title={<Title level={4}>Nạp tiền</Title>}
      style={{ margin: "0 auto", marginTop: 40 }}
      className="container"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          amount: "",
          orderDescription: `Nạp tiền thời gian: ${now}`,
          language: "vn",
        }}
      >
        <Form.Item
          label="Số tiền"
          name="amount"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền" },
            {
              type: "number",
              min: 9999,
              message: "Số tiền phải lớn hơn hoặc bằng 10.000",
            },
          ]}
        >
          <InputNumber
            min={9999}
            parser={(value) =>
              parseInt((value || "").replace(/[^\d]/g, ""), 10)
            }
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Nhập số tiền"
            controls={false}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label="Nội dung thanh toán"
          name="orderDescription"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung thanh toán" },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Ngôn ngữ" name="language">
          <Select>
            <Option value="vn">Tiếng Việt</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thanh toán
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
