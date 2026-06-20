import { Component } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-red-400 mb-2">Something went wrong</p>
          <p className="text-gray-500 text-sm mb-4">
            {this.state.error?.message}
          </p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
