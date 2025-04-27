import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

import "./index.css";
import {
  GetListCategoryApiResponse,
  useGetListCategoryQuery,
} from "@/api/category";
import {
  GetListUniversityApiResponse,
  useGetListUniversityQuery,
} from "@/api/university";
import {
  GetListSubjectApiResponse,
  useGetListSubjectQuery,
} from "@/api/subject";

const { Header } = Layout;

const HeaderPage = () => {
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);

  const { data: categoryData } = useGetListCategoryQuery({
    status: "active",
  });

  const { data: universityData } = useGetListUniversityQuery({
    status: "active",
  });

  const { data: subjectData } = useGetListSubjectQuery({
    status: "active",
  });

  useEffect(() => {
    const categories =
      (categoryData as GetListCategoryApiResponse)?.data?.data || [];
    const universities =
      (universityData as GetListUniversityApiResponse)?.data?.data || [];
    const subjects =
      (subjectData as GetListSubjectApiResponse)?.data?.data || [];

    const updatedMenuItems = [
      {
        key: "document",
        label: <Link to="/document">Tài liệu</Link>,
      },
      {
        key: "university",
        label: "Trường học",
        children: universities.map((university) => ({
          label: (
            <Link to={`/search?university=${university.id}`}>
              {university.name}
            </Link>
          ),
          key: university.id,
        })),
      },
      {
        key: "subject",
        label: "Môn học",
        children: subjects.map((subject) => ({
          label: (
            <Link to={`/search?subject=${subject.id}`}>{subject.name}</Link>
          ),
          key: subject.id,
        })),
      },
      {
        key: "category",
        label: "Chuyên ngành",
        children: categories.map((category) => ({
          label: (
            <Link to={`/search?category=${category.id}`}>{category.name}</Link>
          ),
          key: category.id,
        })),
      },
      // {
      //   key: "recharge",
      //   label: <Link to="/recharge">Nạp tiền</Link>,
      // },
      // {
      //   key: "upload-document",
      //   label: <Link to="/upload-document">Tải tài liệu</Link>,
      // },
      // {
      //   key: "purchased-document",
      //   label: <Link to="/purchased-document">Tài liệu đã mua</Link>,
      // },
      // {
      //   key: "order",
      //   label: <Link to="/order">Giỏ hàng</Link>,
      // },
    ];

    setMenuItems(updatedMenuItems);
  }, [categoryData, universityData, subjectData]);

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "#fff",
  };

  return (
    <Header style={headerStyle}>
      <div className="demo-logo" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
        className="flex-1 w-fit"
      />
    </Header>
  );
};

export default HeaderPage;
