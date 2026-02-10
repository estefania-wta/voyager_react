// src/App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/layout";
import { HomePage } from "./pages/HomePage";
import Contact from "./pages/Contact";
import Voucher from "./pages/Voucher";

function App() {
  return (
    <BrowserRouter>
      {/* 
        🔥 IMPORTANTE: Layout envuelve las Routes
        Esto hace que Header y Footer aparezcan en TODAS las páginas
      */}
      <Layout>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/yourplan" element={<Voucher />} />
          {/* Ruta 404 - Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// Componente simple para 404
function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1>404</h1>
      <p>Página no encontrada</p>
    </div>
  );
}
