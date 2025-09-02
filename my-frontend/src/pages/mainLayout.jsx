import { Outlet, Link } from "react-router-dom";

import "../styles/variables.css";
import "../styles/style.css";

function MainLayout() {
  return (
    <div>
      {/* Header */}
      <header className="main-header">
        <div className="logo">
          <span>EasyShift</span>
        </div>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/employee">Employee</Link>
            </li>
            <li>
              <Link to="/roster">Roster</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Conteúdo da página */}
      <main>
        <Outlet /> {/* Aqui será renderizado Employee ou Roster */}
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <p>&copy; 2023 EasyShift. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
