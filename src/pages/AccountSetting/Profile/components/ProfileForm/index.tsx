import React, { useEffect } from "react";
import {
  Form,
  Typography,
  Spin,
  Image,
  Upload,
  Button,
  Input,
  InputNumber,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { UploadOutlined } from "@ant-design/icons";
import { useMessage } from "@/context/MessageContext";
import { TypeUser, usePatchUserMutation, usePutUserMutation } from "@/api/user";
import { ErrorResponse } from "../../../../../type/global";
import { handleGetFile } from "@/utils";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const messageApi = useMessage();

  const user = useSelector((state: RootState) => state.auth.user);
  const levelValue = Form.useWatch("level", form);

  const [updateUser, { isLoading: isUpdating }] = usePutUserMutation();
  const [updateAvatar] = usePatchUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        full_name: user?.full_name || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        balance: user?.balance || "",
        level: user?.level || "Sliver",
        referral_code: user?.referral_code || "",
        status: user?.status || "pending",
      });
    }
  }, [user]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = (values: TypeUser) => {
    const dataSubmit = {
      full_name: values?.full_name || undefined,
      username: values?.username || undefined,
      email: values?.email || undefined,
      phone: values?.phone || undefined,
      balance: values?.balance || undefined,
      referral_code: values?.referral_code || undefined,
      password: values?.password || undefined,
      status: values?.status || undefined,
    };

    const formData = new FormData();
    if (values?.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj || "");
    }

    updateAvatar({ body: formData }).then(() => {
      updateUser({ body: dataSubmit, id: user?.id || 0 }).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          dispatch({
            type: "auth/updateUserProfile",
            payload: (res as any)?.data?.data,
          });
          window.location.reload();

          messageApi.success("Cập nhật người dùng thành công!");
        }
      });
    });
  };

  const getRankTag = (level: string) => {
    switch (level) {
      case "Gold":
        return <Tag color="#faad14">Gold</Tag>;

      case "Platinum":
        return <Tag color="#1890ff">Platinum</Tag>;

      case "Diamond":
        return <Tag color="#722ed1">Diamond</Tag>;

      default:
        return <Tag color="#bfbfbf">Silver</Tag>;
    }
  };

  return (
    <Spin spinning={isUpdating}>
      <Form
        form={form}
        layout="vertical"
        className="[&_.ant-form-item]:mb-3"
        labelCol={{ span: 6 }}
        labelAlign="left"
        onFinish={handleSubmit}
      >
        <div className="flex gap-x-6">
          <div className="w-1/3">
            <Form.Item
              name="file"
              label="Avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="file"
                listType="text"
                maxCount={1}
                accept="image/*"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Image
              className="!h-[200px] !w-[200px] object-cover rounded-full"
              src={handleGetFile(user?.avatar || "")}
            />
          </div>
          <div className="flex-1">
            <Form.Item name="username" label="Tên tài khoản">
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="full_name"
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Mật khẩu">
              <Input.Password />
            </Form.Item>

            <Form.Item name="level" label="Rank">
              {getRankTag(levelValue)}
            </Form.Item>

            <Form.Item name="balance" label="Số dư">
              <InputNumber
                style={{ widows: "100%" }}
                controls={false}
                className="w-full"
                disabled
                parser={(value) =>
                  parseInt((value || "").replace(/[^\d]/g, ""), 10)
                }
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>

            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Spin>
  );
};

export default ProfileForm;
