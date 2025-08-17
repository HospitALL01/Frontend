import { Routes, Route } from "react-router-dom";
import Home from "./AllPages/Home";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path='/' element={<Home />} />

      {/* Fallback route for wrong URLs */}
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
