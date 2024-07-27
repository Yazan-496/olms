import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import { LayoutProvider } from "layout";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
    <LayoutProvider>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </LayoutProvider>
    // </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
