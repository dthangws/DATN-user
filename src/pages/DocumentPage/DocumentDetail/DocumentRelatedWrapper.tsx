import React from "react";

import { List, Image, Typography } from "antd";
import { GetListDocumentApiResponse } from "@/api/document";
import { handleGetFile } from "@/utils";
import { Link } from "react-router-dom";

interface PropsType {
  relatedDocuments: GetListDocumentApiResponse["data"]["data"];
}

const DocumentRelatedWrapper = ({ relatedDocuments }: PropsType) => {
  return (
    <>
      {relatedDocuments && relatedDocuments.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 24, sm: 24, md: 24, lg: 24 }}
          dataSource={relatedDocuments}
          renderItem={(doc) => (
            <List.Item>
              <Link to={`/document/${doc?.id}`}>
                <div className="  rounded-lg p-4 shadow-md">
                  <div className="h-[180px] overflow-hidden mb-5">
                    <Image
                      src={
                        doc?.fileImages?.[0]?.image_path
                          ? handleGetFile(
                              doc?.fileImages?.[0]?.image_path || ""
                            )
                          : "https://www.testo.com/images/not-available.jpg"
                      }
                      className="w-full object-cover rounded-md"
                      preview={false}
                    />
                  </div>

                  <div className="font-semibold text-left">
                    {doc?.title || ""}
                  </div>
                  <Typography.Text>
                    Giá:{" "}
                    {doc?.price === 0
                      ? "Miễn phí"
                      : `${Number(doc?.price).toLocaleString("vi-VN")} VNĐ`}
                  </Typography.Text>
                </div>
              </Link>
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text>Không có tài liệu liên quan</Typography.Text>
      )}
    </>
  );
};

export default DocumentRelatedWrapper;
