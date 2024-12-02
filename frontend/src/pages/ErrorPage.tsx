import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "An unexpected error has occurred.";
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusCode = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {statusCode === 404 ? "404" : statusCode}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {statusCode === 404 ? "Page Not Found" : "Error"}
        </h2>
        <p className="text-gray-600 mb-8">{errorMessage}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Home className="h-5 w-5 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
