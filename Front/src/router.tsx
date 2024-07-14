import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCode from "./views/auth/RequestNewCode";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} index />
        </Route>
        <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginView />}  />
            <Route path="/auth/register" element={<RegisterView />}  />
            <Route path="/auth/confirm-account" element={<ConfirmAccountView />}  />
            <Route path="/auth/request-code" element={<RequestNewCode />}  />
            <Route path="/auth/forgot-password" element={<ForgotPasswordView />}  />
            <Route path="/auth/new-password" element={<NewPasswordView />}  />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
