
import { Component, type ErrorInfo, type PropsWithChildren } from 'react'

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  componentDidUpdate(_prevProps: PropsWithChildren, prevState: State) {
    if (this.state.hasError && !prevState.hasError) {
      console.log('ErrorBoundary: ', this.state.error)
    }
  }

  render() {

    if (this.state.hasError) {
      return (
        <h1 style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          Something went wrong. Please try again later.
        </h1>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
