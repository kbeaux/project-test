import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }
  public render() {
    if (this.state.hasError) {
      return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">"something went wrong</h1>
            <p className="text-gray-600 mb-8">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button onClick={() => window.location.reload()} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">refresh page</button>
          </div>
        </div>;
    }
    return this.props.children;
  }
}