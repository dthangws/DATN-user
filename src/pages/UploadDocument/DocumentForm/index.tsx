import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Typography,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

import { useMessage } from "@/context/MessageContext";
import { usePostDocumentMutation } from "@/api/document";
import { useGetListSubjectQuery } from "@/api/subject";
import { useGetListUniversityQuery } from "@/api/university";
import { GetListSubjectApiResponse } from "@/api/subject";
import { GetListUniversityApiResponse } from "@/api/university";
import { useGetListCategoryQuery } from "@/api/category";

interface NormFileEvent {
  file: any;
  fileList: any[];
}

const DocumentForm = () => {
  const [form] = Form.useForm();
  const messageApi = useMessage();
  const navigate = useNavigate();

  const { data: subjects } = useGetListSubjectQuery({ status: "active" });
  const { data: universities } = useGetListUniversityQuery({
    status: "active",
  });
  const { data: categories } = useGetListCategoryQuery({
    status: "active",
  });
  const [createDocument, { isLoading: isCreating }] = usePostDocumentMutation();

  const subjectOptions = (
    subjects as GetListSubjectApiResponse
  )?.data?.data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const universityOptions = (
    universities as GetListUniversityApiResponse
  )?.data?.data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const categoryyOptions = (
    categories as GetListUniversityApiResponse
  )?.data?.data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const handleSubmit = (values: {
    title: string;
    price: string;
    subject_id: number;
    university_id: number;
    category_ids: number[];
    file: { originFileObj: string | Blob }[];
    fileImages: any[];
  }) => {
    const formData = new FormData();

    formData.append("title", values?.title || "");
    formData.append("price", values?.price ? String(values.price) : "0");
    formData.append(
      "subject_id",
      values?.subject_id ? String(values.subject_id) : ""
    );
    formData.append(
      "university_id",
      values?.university_id ? String(values.university_id) : ""
    );
    formData.append(
      "category_ids",
      values?.category_ids ? String(values.category_ids) : ""
    );

    if (values?.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    if (values?.fileImages) {
      values.fileImages.forEach((file) => {
        if (file.originFileObj) {
          formData.append("fileImages", file.originFileObj);
        }
      });
    }

    createDocument(formData).then((res: any) => {
      if (res?.error) {
        messageApi.error(res.error.data.message || "Đăng tài liệu thất bại");
      } else {
        messageApi.success("Đăng tài liệu thành công!");
        form.resetFields();
        navigate("/document");
      }
    });
  };

  const normFile = (e: NormFileEvent | NormFileEvent[]): any[] => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography.Title
        level={2}
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        Đăng tài liệu
      </Typography.Title>

      <Spin spinning={isCreating}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <Form.Item
            label="Tên"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên tài liệu!" }]}
          >
            <Input placeholder="Tên tài liệu" />
          </Form.Item>

          <Form.Item
            label="Trường học"
            name="university_id"
            rules={[{ required: true, message: "Vui lòng chọn trường học!" }]}
          >
            <Select
              placeholder="Chọn trường học"
              options={universityOptions}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Môn học"
            name="subject_id"
            rules={[{ required: true, message: "Vui lòng chọn môn học!" }]}
          >
            <Select
              placeholder="Chọn môn học"
              options={subjectOptions}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Chuyên ngành"
            name="category_ids"
            rules={[{ required: true, message: "Vui lòng chọn chuyên ngành!" }]}
          >
            <Select
              placeholder="Chọn chuyên ngành"
              options={categoryyOptions}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Giá bán"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Giá (VNĐ)"
              parser={(value) =>
                parseInt((value || "").replace(/[^\d]/g, ""), 10)
              }
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="fileImages"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="fileImages"
              listType="picture"
              beforeUpload={() => false}
              multiple
              maxCount={10}
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Tài liệu"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng chọn tài liệu!" }]}
          >
            <Upload
              name="file"
              listType="text"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ background: "#860204", borderColor: "#860204" }}
            >
              Đăng tài
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default DocumentForm;
