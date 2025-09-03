import { createRoot } from "react-dom/client"; // import from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // import BrowserRouter for routing
import "./index.css"; // Your custom styles
import App from "./App.jsx"; // Your main App component

const root = createRoot(document.getElementById("root")); // Create the root element
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
