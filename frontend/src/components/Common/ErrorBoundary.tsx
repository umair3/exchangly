import { Component, ErrorInfo, ReactNode } from "react";
import ApplicationError from "./ApplicationError";

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent ? (
        this.props.fallbackComponent
      ) : (
        <ApplicationError />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
