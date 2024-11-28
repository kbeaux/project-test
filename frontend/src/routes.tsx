import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { EstimatePage } from '@/pages/EstimatePage';
import { InvestPage } from '@/pages/InvestPage';
import { SellPage } from '@/pages/SellPage';
import { CareersPage } from '@/pages/CareersPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/sell" element={<SellPage />} />
      
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/properties/:id"
        element={
          <ProtectedRoute>
            <PropertyDetailPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/estimate"
        element={
          <ProtectedRoute>
            <EstimatePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/invest"
        element={
          <ProtectedRoute>
            <InvestPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}