import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/components/AuthProvider";
import { MessageProvider } from "@/context/MessageContext";
import PublicRoute from "@/components/PublicRoute";

import Profile from "@/pages/AccountSetting/Profile";

import LoginPage from "@/pages/LoginPage";
import DocumentPage from "./pages/DocumentPage";
import { useGetMeQuery } from "./api/auth";
import { useDispatch } from "react-redux";
import UniversityPage from "./pages/UniversityPage/index";
import SubjectPage from "./pages/SubjectPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DocumentDetailPage from "./pages/DocumentPage/DocumentDetail";
import UploadDocumentPage from "./pages/UploadDocument";
import VnPayPage from "./pages/VnPayPage";

import { ConfigProvider } from "antd";
import { themeConfig } from "./theme/themeConfig";
import OrderPage from "./pages/OrderPage";
import SearchDocumentPage from "./pages/SearchDocument";
import PurchasedDocumentPage from "./pages/PurchasedDocument";
import RechargePage from "./pages/RechargePage";

const App = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetMeQuery();

  useEffect(() => {
    if (user?.data) {
      dispatch({
        type: "auth/updateUserProfile",
        payload: user?.data,
      });
    }
  }, [user]);

  return (
    <AuthProvider>
      <ConfigProvider theme={themeConfig}>
        <MessageProvider>
          <Router>
            <Routes>
              {/* Login Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Route>

              {/* Private Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<DocumentPage />} />
              </Route>

              {/* Profile Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/user/profile" element={<Profile />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/document/:id" element={<DocumentDetailPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route
                  path="/upload-document"
                  element={<UploadDocumentPage />}
                />
              </Route>
              {/* Document Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/document" element={<DocumentPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/recharge" element={<RechargePage />} />
              </Route>

              {/* University Page Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/subject" element={<SubjectPage />} />
              </Route>

              {/* University Page Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/university" element={<UniversityPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/order" element={<OrderPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route
                  path="/purchased-document"
                  element={<PurchasedDocumentPage />}
                />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/search" element={<SearchDocumentPage />} />
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="/vnpay" element={<VnPayPage />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Router>{" "}
        </MessageProvider>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
