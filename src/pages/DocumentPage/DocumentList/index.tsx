import React from "react";
import { Layout, Row, Col, Spin } from "antd";
import {
  GetListDocumentApiResponse,
  useGetListDocumentQuery,
  useGetTopViewDocumentQuery,
} from "@/api/document";
import {
  GetListUniversityApiResponse,
  useGetListUniversityQuery,
} from "@/api/university";
import {
  GetListCategoryApiResponse,
  useGetListCategoryQuery,
} from "@/api/category";

import List from "./List";
import { Link, useNavigate } from "react-router-dom";
import DocumentRelatedWrapper from "../DocumentDetail/DocumentRelatedWrapper";

const { Content } = Layout;

const DocumentList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetListDocumentQuery({
    status: "active",
  });

  const { data: dataTopView } = useGetTopViewDocumentQuery({});

  const { data: categoryData } = useGetListCategoryQuery({
    status: "active",
  });

  const { data: universityData } = useGetListUniversityQuery({
    status: "active",
  });

  const categories = categoryData as GetListCategoryApiResponse;
  const universities = universityData as GetListUniversityApiResponse;

  const documentList = data as GetListDocumentApiResponse;
  const documentTopView = dataTopView as GetListDocumentApiResponse;

  return (
    <Content className="min-h-screen">
      <Spin spinning={isLoading}>
        <Row gutter={[40, 32]}>
          <Col span={18}>
            <Row gutter={[16, 16]} className="mb-6">
              {categories?.data?.data?.map((category) => (
                <Col span={4} key={category.id}>
                  <div
                    className="bg-[#8d5050] p-1 cursor-pointer rounded-lg text-center text-[#fff]"
                    onClick={() => {
                      navigate(`/search?category=${category.id}`);
                    }}
                  >
                    #{category.name}
                  </div>
                </Col>
              ))}
            </Row>

            <List documentList={documentList} />
          </Col>
          <Col span={6}>
            <div className="grid grid-cols-1 gap-y-5">
              <div className="">
                <h3 className="widget-title">
                  <span>Danh sách trường học</span>
                </h3>

                <div className="grid grid-cols-1 gap-y-5">
                  {universities?.data?.data?.map((university) => (
                    <Link
                      key={university?.id}
                      to={`/search?university=${university.id}`}
                    >
                      {university.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="">
                <h3 className="widget-title mb-5">
                  <span>Tài liệu phổ biến</span>
                </h3>
                <DocumentRelatedWrapper
                  relatedDocuments={documentTopView?.data?.data}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Spin>
    </Content>
  );
};

export default DocumentList;
