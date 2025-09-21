import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    // In a real app, you might use a service like Sentry or LogRocket
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Render a custom fallback UI that matches the site's aesthetic
      return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center font-montserrat p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gold mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We're sorry for the inconvenience. Our team has been notified. Please try refreshing the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              aria-label="Refresh the page"
              className="btn-primary font-bold py-3 px-8 rounded-full text-lg focus-visible-ring"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
