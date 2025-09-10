import ErrorBoundary from "./pages/error"
import MainPage from "./pages/main"

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  )
}

export default App
