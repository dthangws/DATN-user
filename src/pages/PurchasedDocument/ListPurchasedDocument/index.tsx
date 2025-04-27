import React from "react";
import { Row, Col, Spin } from "antd";
import { useLazyGetPurchasedDocumentQuery } from "@/api/document";
import { GetListDocumentApiResponse } from "@/api/document";
import List from "@/pages/DocumentPage/DocumentList/List";

const ListPurchasedDocument = () => {
  const [getList, { data, isLoading }] = useLazyGetPurchasedDocumentQuery();

  React.useEffect(() => {
    getList({});
  }, []);

  const documentList = data as GetListDocumentApiResponse;

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[40, 32]} className="mt-10">
        <Col span={18}>
          <List documentList={documentList} />
        </Col>
      </Row>
    </Spin>
  );
};

export default ListPurchasedDocument;
