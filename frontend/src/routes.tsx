import { Routes, Route } from "react-router-dom";
import { EstimatePage } from "@/pages/EstimatePage";
import { InvestPage } from "@/pages/InvestPage";
// import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/shared/LoadingSpinner";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const PropertyDetailPage = lazy(() =>
  import("./pages/PropertyDetailPage").then((module) => ({
    default: module.PropertyDetailPage,
  }))
);
const SearchPage = lazy(() =>
  import("./pages/SearchPage").then((module) => ({
    default: module.SearchPage,
  }))
);
const ErrorPage = lazy(() =>
  import("./pages/ErrorPage").then((module) => ({ default: module.ErrorPage }))
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);
const CareersPage = lazy(() =>
  import("./pages/CareersPage").then((module) => ({
    default: module.CareersPage,
  }))
);
const SellPage = lazy(() =>
  import("./pages/SellPage").then((module) => ({ default: module.SellPage }))
);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/estimate" element={<EstimatePage />} />

        {/* <Route
          path="/invest"
          element={
            <ProtectedRoute>
              <InvestPage />
            </ProtectedRoute>
          }
        /> */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
