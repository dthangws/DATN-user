import React from "react";
import { Layout, Typography, Row, Col, Spin } from "antd";
import PageContainer from "@/layouts/PageContainer";
import { useUrlSearchParams } from "use-url-search-params";
import {
  GetListDocumentApiResponse,
  useGetTopViewDocumentQuery,
  useLazyGetListDocumentQuery,
} from "@/api/document";
import DocumentRelatedWrapper from "../DocumentPage/DocumentDetail/DocumentRelatedWrapper";
import List from "../DocumentPage/DocumentList/List";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const SearchDocumentPage = () => {
  const router = useNavigate();
  const [parameter, setParameter] = useUrlSearchParams({ page: 1, limit: 10 });

  const [getList, { data, isLoading }] = useLazyGetListDocumentQuery();

  React.useEffect(() => {
    getList({
      status: "active",
      category_id: parameter?.category ? Number(parameter.category) : undefined,
      university_id: parameter?.university
        ? Number(parameter.university)
        : undefined,
      subject_id: parameter?.subject ? Number(parameter.subject) : undefined,
      keyword: parameter?.search ? String(parameter.search) : undefined,
      page: Number(parameter?.page),
      limit: Number(parameter?.limit),
    });
  }, [parameter]);

  const { data: dataTopView } = useGetTopViewDocumentQuery({});

  const documentList = data as GetListDocumentApiResponse;

  const documentTopView = dataTopView as GetListDocumentApiResponse;

  return (
    <PageContainer>
      <Layout className="bg-[#fff]" style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "16px" }} className="container mx-auto">
          <Typography.Title level={5} className="uppercase">
            Tìm kiếm tài liệu
          </Typography.Title>

          <Spin spinning={isLoading}>
            <Row gutter={[40, 32]} className="mt-10">
              <Col span={18}>
                <List documentList={documentList} />
              </Col>
              <Col span={6}>
                <div className="grid grid-cols-1 gap-y-5">
                  <div className="">
                    <h3 className="widget-title mb-5">
                      <span>Tài liệu phổ biến</span>
                    </h3>
                    <DocumentRelatedWrapper
                      relatedDocuments={documentTopView?.data?.data}
                    />
                  </div>

                  <div className="">
                    <h3 className="widget-title">
                      <span>Danh sách trường học</span>
                    </h3>
                  </div>
                </div>
              </Col>
            </Row>
          </Spin>
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default SearchDocumentPage;
