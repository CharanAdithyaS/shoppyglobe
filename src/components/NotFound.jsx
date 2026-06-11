import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

function NotFound() {
  const error = useRouteError();

  let statusCode = 404;
  let title = 'Page Not Found';
  let message = "Sorry, the page you're looking for doesn't exist or has been moved.";
  let details = '';

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    title = error.statusText || title;
    message = error.data?.message || message;
    details = typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2);
  } else if (error instanceof Error) {
    message = error.message;
    details = error.stack || '';
  }

  return (
    <section className="not-found-page">
      <div className="error-card">
        <p className="error-code">{statusCode}</p>
        <h1>{title}</h1>
        <p className="error-message">{message}</p>
        {details && (
          <pre className="error-details" aria-label="Error details">
            {details}
          </pre>
        )}
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
