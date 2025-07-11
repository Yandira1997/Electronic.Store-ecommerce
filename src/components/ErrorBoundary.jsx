import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // guardamos el error
  }

  componentDidCatch(error, info) {
    console.error("Error capturado por ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "red" }}>
          <h1>Algo salió mal.</h1>
          <p>{this.state.error?.message}</p> {/* 👈 Mostrar mensaje de error */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
