import { HashRouter, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import Reportes from './pages/Reportes'
import Configuracion from './pages/Configuracion'

function App() {
  return (
    <HashRouter>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
         background: 'var(--surface)'
        }}
      >
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Topbar />

          <div style={{ padding: '2rem' }}>
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/usuarios"
                element={<Usuarios />}
              />

              <Route
                path="/reportes"
                element={<Reportes />}
              />

              <Route
                path="/configuracion"
                element={<Configuracion />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </  HashRouter>
  )
}

export default App