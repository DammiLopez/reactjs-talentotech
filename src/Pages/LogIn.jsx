import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { iniciarSesion } = useAuthContext();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    isAdmin: false, // Valor inicial del checkbox
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar el contexto con los datos del usuario
    iniciarSesion(formData);
    // Redirigir al Home
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | Acceso a CursosTech</title>
        <meta
          name="description"
          content="Ingresa a tu cuenta de CursosTech para continuar con tus cursos, ver tu progreso y gestionar tu perfil."
        />
        <meta name="robots" content="noindex, follow" />{" "}
      </Helmet>

      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center pt-20">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400 flex items-center justify-center">
            <LogIn className="mr-2" /> Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-300 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Mati Campos"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: mati.campos@example.com"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <label htmlFor="isAdmin" className="block text-gray-300">
                ¿Es administrador?
              </label>
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              <LogIn className="mr-2" size={18} />
              Iniciar Sesión
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
