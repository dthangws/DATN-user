import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Form,
  Typography,
  Spin,
  Image,
  List,
  Tabs,
  Button,
  message,
} from "antd";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import * as DocxPreview from "docx-preview";

import {
  GetDetailDocumentApiResponse,
  GetListDocumentApiResponse,
  useGetRelatedDocumentsQuery,
  useLazyGetDetailDocumentQuery,
} from "@/api/document";
import { handleGetFile } from "@/utils";
import DocumentRelatedWrapper from "../DocumentRelatedWrapper";

const { TabPane } = Tabs;

const DetailPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [activeTab, setActiveTab] = useState("images");
  const docxContainerRef = useRef<HTMLDivElement>(null);

  const [getDetail, { data, isFetching }] = useLazyGetDetailDocumentQuery();
  const { data: relatedData, isFetching: isFetchingRelated } =
    useGetRelatedDocumentsQuery(
      {
        id: Number(id),
        subject_id:
          (data && "data" in data && data.data?.subject_id) || undefined,
        page: 1,
        limit: 5,
      },
      { skip: !(data && "data" in data && data.data?.subject_id) }
    );

  useEffect(() => {
    if (id) {
      getDetail({ id: Number(id) });
    }
  }, [id]);

  const dataDetail = data as GetDetailDocumentApiResponse;
  const relatedDocuments =
    (relatedData as GetListDocumentApiResponse)?.data?.data || [];

  const isViewDocumentFile = useMemo(() => {
    if (user?.id === dataDetail?.data?.user_id && accessToken) {
      return true;
    }

    if (
      user?.id === dataDetail?.data?.orderItems?.[0]?.order?.user_id &&
      accessToken
    ) {
      return true;
    }

    return false;
  }, [user, dataDetail?.data?.id]);

  useEffect(() => {
    if (dataDetail) {
      form.setFieldsValue({
        title: dataDetail?.data?.title || "",
        price: dataDetail?.data?.price || "",
        subject_id: dataDetail?.data?.subject_id || "",
        university_id: dataDetail?.data?.university_id || "",
        status: dataDetail?.data?.status || "pending",
        description: dataDetail?.data?.description || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (
      activeTab === "preview" &&
      dataDetail?.data?.file_path &&
      docxContainerRef.current
    ) {
      const fetchAndRenderDocx = async () => {
        try {
          const fileUrl = `${process.env.REACT_APP_SEVER_URL}/${dataDetail.data.file_path}`;

          const response = await fetch(fileUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch DOCX file");
          }
          const arrayBuffer = await response.arrayBuffer();

          // Clear previous content
          if (docxContainerRef.current) {
            docxContainerRef.current.innerHTML = "";
          }

          // Render DOCX with docx-preview
          await DocxPreview.renderAsync(
            arrayBuffer,
            docxContainerRef.current!,
            undefined,
            {
              breakPages: true,
            }
          );

          // Hide pages after the 4th page
          if (docxContainerRef.current) {
            const pages = docxContainerRef.current.querySelectorAll(
              ".docx-wrapper > section"
            );
            pages.forEach((page, index) => {
              if (index >= 4) {
                (page as HTMLElement).style.display = "none";
              }
            });
          }
        } catch (error) {
          console.error("Error rendering DOCX:", error);
          message.error("Không thể hiển thị bản xem trước tài liệu!");
        }
      };

      fetchAndRenderDocx();
    }
  }, [activeTab, dataDetail?.data?.file_path]);

  const handleAddToCart = () => {
    if (!dataDetail?.data) {
      message.error("Không thể thêm vào giỏ hàng!");
      return;
    }
    const cartKey = "cart";
    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const exists = cart.some((item: any) => item.id === dataDetail.data.id);
    if (exists) {
      message.info("Tài liệu đã có trong giỏ hàng!");
      return;
    }
    cart.push(dataDetail.data);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    message.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <Spin spinning={isFetching || isFetchingRelated}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex gap-x-6">
          <div className="w-1/5">
            <div className="bg-[#fff] p-5 h-fit mb-4 flex items-start justify-center">
              <Image
                src={
                  dataDetail?.data?.fileImages?.[0]?.image_path
                    ? handleGetFile(
                        dataDetail?.data?.fileImages?.[0]?.image_path || ""
                      )
                    : "https://www.testo.com/images/not-available.jpg"
                }
                className="!w-full object-cover"
                preview
              />
            </div>
            <div className="flex justify-between">
              <Typography.Text>
                Lượt xem: {dataDetail?.data?.view_count || 0}
              </Typography.Text>
              <Typography.Text>
                Lượt tải: {dataDetail?.data?.download_count || 0}
              </Typography.Text>
            </div>
          </div>

          <div className="flex-1 bg-[#fff] p-5 h-full">
            <Typography.Title level={3}>
              Tên tài liệu: {dataDetail?.data?.title || "ABC"}
            </Typography.Title>
            <Typography.Text>
              Trường:{" "}
              {dataDetail?.data?.university?.name ||
                "Đại học Công nghiệp Hà Nội"}
            </Typography.Text>
            <br />
            <Typography.Text>
              Môn: {dataDetail?.data?.subject?.name || "Lập trình kỹ thuật"}
            </Typography.Text>
            <div className="flex justify-between items-center mt-2">
              <Typography.Text>
                Giá:{" "}
                {dataDetail?.data?.price === 0
                  ? "Miễn phí"
                  : `${Number(dataDetail?.data?.price).toLocaleString(
                      "vi-VN"
                    )} VNĐ`}
              </Typography.Text>
              {dataDetail?.data?.file_path && isViewDocumentFile && (
                <Link
                  to={`${process.env.REACT_APP_SEVER_URL}/${dataDetail?.data?.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Link tải
                </Link>
              )}
            </div>

            {!isViewDocumentFile && (
              <div className="mt-4">
                <Button
                  type="primary"
                  onClick={handleAddToCart}
                  disabled={!dataDetail?.data}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            )}

            <div className="mt-4">
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                {isViewDocumentFile && (
                  <TabPane tab="Chi tiết tài liệu" key="document">
                    {dataDetail?.data?.file_path &&
                    /\.(jpe?g|png|gif|bmp|webp)$/i.test(
                      dataDetail?.data?.file_path
                    ) ? (
                      <Image
                        src={handleGetFile(dataDetail?.data?.file_path)}
                        className="!max-h-[300px] !w-full object-cover"
                      />
                    ) : (
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                          `${process.env.REACT_APP_SEVER_URL}/${dataDetail?.data?.file_path}`
                        )}&embedded=true`}
                        width="100%"
                        height="1000px"
                        frameBorder="0"
                        title="Document Preview"
                      />
                    )}
                  </TabPane>
                )}
                <TabPane tab="Hình ảnh" key="images">
                  {dataDetail?.data?.fileImages?.length ? (
                    <List
                      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                      dataSource={dataDetail?.data?.fileImages}
                      renderItem={(image) => (
                        <List.Item>
                          <Image
                            src={handleGetFile(image.image_path || "")}
                            className="!max-h-[150px] !w-full object-cover"
                            preview
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Typography.Text>Không có hình ảnh</Typography.Text>
                  )}
                </TabPane>
                <TabPane tab="Xem trước" key="preview">
                  {dataDetail?.data?.file_path &&
                  /\.docx$/i.test(dataDetail?.data?.file_path) ? (
                    <div
                      ref={docxContainerRef}
                      style={{
                        width: "100%",
                        height: "1000px",
                        overflow: "auto",
                        border: "1px solid #e8e8e8",
                      }}
                    />
                  ) : (
                    <Typography.Text>
                      Tài liệu không hỗ trợ xem trước (yêu cầu file .docx)
                    </Typography.Text>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>

          <div className="bg-[#fff] p-5 w-1/5">
            <h3 className="widget-title mb-5">
              <span>Tài liệu liên quan</span>
            </h3>
            <Spin spinning={isFetchingRelated}>
              <DocumentRelatedWrapper relatedDocuments={relatedDocuments} />
            </Spin>
          </div>
        </div>
      </div>

      <style>{`
        .docx-wrapper > section:nth-child(n + 5) {
          display: none;
        }
      `}</style>
    </Spin>
  );
};

export default DetailPage;
