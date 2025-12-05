import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./CartContext";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    const isAdminGuardado = localStorage.getItem("isAdmin");

    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
        isAdmin: isAdminGuardado === "true",
      });
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (usuario) => {
    const token = `fake-token-${usuario.nombre}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authEmail", usuario.email);
    localStorage.setItem("isAdmin", usuario.isAdmin);

    setUsuario({
      nombre: usuario.nombre,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
    });
    navigate("/");
  };

  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("cart");

    setUsuario(null);
    navigate("/");
  };

  const value = {
    usuario,
    isAuthenticated: !!usuario,
    iniciarSesion,
    cerrarSesion,
    cargando,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}
