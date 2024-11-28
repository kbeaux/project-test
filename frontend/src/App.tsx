import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { AppRoutes } from '@/routes';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;