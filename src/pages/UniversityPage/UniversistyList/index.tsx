import React from "react";
import { Input, Spin, List } from "antd";
import {
  GetListUniversityApiResponse,
  useGetListUniversityQuery,
} from "@/api/university";

const UniversityList = () => {
  const [searchText, setSearchText] = React.useState("");
  const { data: universityData, isLoading } = useGetListUniversityQuery({});

  const universityList = universityData as GetListUniversityApiResponse;

  const universities = universityList?.data?.data
    ? [...(universityList?.data?.data || [])]
        .sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
        .filter((uni) =>
          (uni?.name ?? "").toLowerCase().includes(searchText.toLowerCase())
        )
    : [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Input
        placeholder="Tìm kiếm trường đại học..."
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
          dataSource={universities}
          renderItem={(university) => (
            <List.Item>
              <div className="p-6 bg-white border rounded-lg shadow-sm cursor-pointer">
                {university.name}
              </div>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default UniversityList;
