import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import {
  Home,
  Productos,
  SignIn,
  Login,
  CartPage,
  ProductDetail,
  AdminProductsDashboard,
  UserRoute,
  AdminRoute,
} from "./Pages";
import { ProductsProvider, CartProvider, AuthProvider } from "./context";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductDetail />} />
              <Route path="/registrar" element={<SignIn />} />
              <Route path="/iniciar-sesion" element={<Login />} />

              {/* // Ruta protegidas para usuarios autenticados */}
              <Route
                path="/cart"
                element={
                  <UserRoute>
                    <CartPage />
                  </UserRoute>
                }
              />

              {/* Rutas protegidas para administradores */}
              <Route
                path="/admin/productos"
                element={
                  <AdminRoute>
                    <AdminProductsDashboard />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Footer />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
