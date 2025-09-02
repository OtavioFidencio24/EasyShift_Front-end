import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/mainLayout";
import Employee from "./pages/employee";
import Roster from "./pages/roster";
import Login from "./pages/login";


function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login fora do layout */}
        <Route path="/login" element={<Login />} />

        {/* Layout principal para Employee e Roster */}
        <Route element={<MainLayout />}>
          <Route path="/employee" element={<Employee />} />
          <Route path="/roster" element={<Roster />} />
        </Route>
          <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
