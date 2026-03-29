"use client";

import React, { ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorCount: number;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error("[v0] Error caught by boundary:", error);
    console.error("[v0] Error info:", errorInfo);

    // In production, you would send this to an error tracking service (Sentry, etc.)
    if (typeof window !== "undefined" && window.__errorLog) {
      window.__errorLog({
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorCount: 0 });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[#0A2540] px-4">
          <div className="max-w-md w-full space-y-6">
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
                <p className="text-white/60">We encountered an unexpected error. Please try refreshing the page.</p>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-left">
                  <p className="text-xs text-white/40 font-mono break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full px-4 py-3 bg-[#635BFF] hover:bg-[#5244e0] rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>

              <button
                onClick={this.handleRefresh}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-white transition-all border border-white/20"
              >
                Refresh Page
              </button>

              <a
                href="/"
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold text-white transition-all text-center border border-white/10"
              >
                Go Home
              </a>
            </div>

            <p className="text-xs text-white/30 text-center">
              If this problem persists, please contact support at support@checkflow.ai
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Declare global error log function
declare global {
  interface Window {
    __errorLog?: (error: Record<string, unknown>) => void;
  }
}
