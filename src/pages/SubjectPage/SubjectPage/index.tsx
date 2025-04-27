import React from "react";
import { Input, Spin, List } from "antd";
import {
  GetListSubjectApiResponse,
  useGetListSubjectQuery,
} from "@/api/subject";

const SubjectList = () => {
  const [searchText, setSearchText] = React.useState("");
  const { data: SubjectData, isLoading } = useGetListSubjectQuery({});

  const subjectList = SubjectData as GetListSubjectApiResponse;

  const subjects = subjectList?.data?.data
    ? [...(subjectList?.data?.data || [])]
        .sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
        .filter((sub) =>
          (sub?.name ?? "").toLowerCase().includes(searchText.toLowerCase())
        )
    : [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Input
        placeholder="Tìm kiếm môn học..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4"
        style={{ width: 300 }}
      />

      <Spin spinning={isLoading}>
        <List
          grid={{
            gutter: 16, // Khoảng cách giữa các cột
            xs: 1, // 1 cột trên màn hình rất nhỏ
            sm: 2, // 2 cột trên màn hình nhỏ
            md: 3, // 3 cột trên màn hình trung bình
            lg: 4, // 4 cột trên màn hình lớn
          }}
          dataSource={subjects}
          renderItem={(subject) => (
            <List.Item>
              <div className="p-6 bg-white border rounded-lg shadow-sm cursor-pointer">
                {subject.name}
              </div>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default SubjectList;
