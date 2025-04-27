import React from "react";
import { Empty, Col, Row, Image, Space, Tag, Divider } from "antd";
import { DownloadOutlined, EyeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { handleGetFile } from "@/utils";
import { GetListDocumentApiResponse } from "@/api/document";
import moment from "moment";

interface PropsType {
  documentList: GetListDocumentApiResponse;
}

const List = ({ documentList }: PropsType) => {
  const navigate = useNavigate();

  return (
    <Row gutter={16}>
      {documentList?.data?.data?.length === 0 && (
        <Col span={24}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Col>
      )}
      {documentList?.data?.data?.map((doc) => (
        <Col xs={24} sm={12} md={24} lg={24} key={doc.id}>
          <div className="flex gap-x-5 justify-between items-center h-[250px]">
            <div className="w-1/3 flex items-center justify-center overflow-hidden h-full">
              <Image
                src={
                  doc?.fileImages?.[0]?.image_path
                    ? handleGetFile(doc?.fileImages?.[0]?.image_path || "")
                    : "https://www.testo.com/images/not-available.jpg"
                }
                alt=""
                className="w-full object-cover rounded-md"
              />
            </div>

            <div className="flex-1 h-full flex flex-col justify-between">
              <div
                className="flex flex-col items-start gap-y-2 cursor-pointer"
                onClick={() => navigate(`/document/${doc.id}`)}
              >
                <h3 className="text-xl font-semibold">{doc.title}</h3>

                <div className="text-sm text-gray-300 line-clamp-2">
                  {moment(doc.created_at).format("DD/MM/YYYY")}
                </div>

                <div className="text-sm text-gray-600 line-clamp-2">
                  {doc.description}
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between mt-2 items-center w-full">
                  <div className="flex flex-wrap gap-1">
                    {doc.documentCategories?.map((category) => (
                      <Tag key={category?.category?.id} color="red">
                        #{category?.category?.name}
                      </Tag>
                    ))}
                  </div>

                  <span className="text-red-500 font-semibold">
                    {doc?.price === 0
                      ? "Miễn phí"
                      : `${Number(doc?.price).toLocaleString("vi-VN")} VNĐ`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    Người đăng: {doc?.user?.full_name}
                  </div>
                  <div className="flex items-center justify-end gap-x-2 w-[100px]">
                    <Space>
                      <DownloadOutlined />
                      <span>{doc?.download_count || 0}</span>
                    </Space>
                    <Space>
                      👁
                      <span>{doc?.view_count || 0}</span>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />
        </Col>
      ))}
    </Row>
  );
};

export default List;
