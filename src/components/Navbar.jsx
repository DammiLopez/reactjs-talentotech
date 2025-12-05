import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";

import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu, // Icono para el menú móvil
  X, // Icono para cerrar el menú
  Home,
  Package,
} from "lucide-react";

const Navbar = () => {
  const { usuario, cerrarSesion } = useAuthContext();
  const { cart, vaciarCarrito } = useCartContext();
  // 💡 1. Estado para controlar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clase base para los enlaces (reutilizable)
  const linkClasses =
    "flex items-center p-3 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition duration-300 ease-in-out";
  
  // Clase base para botones de acción
  const buttonBaseClasses = "py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out w-full sm:w-auto justify-center";

  return (
    <header className="fixed top-0 left-0 w-screen bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-2xl z-40 transition-all duration-300 border-b border-blue-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-400 tracking-wider hover:text-blue-300 transition"
            onClick={() => setIsMenuOpen(false)} // Cerrar menú al navegar
          >
            CursosTech
          </Link>

          {/* BOTÓN DE MENÚ (Móvil) */}
          <button
            className="sm:hidden text-white p-2 rounded-md hover:bg-gray-700 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* MENÚ DE NAVEGACIÓN (Desktop y Móvil) */}
          <nav
            // 💡 2. Clases condicionales para el responsivo
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } absolute top-full left-0 w-full sm:static sm:w-auto sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:gap-4 p-4 sm:p-0 bg-gray-900 sm:bg-transparent shadow-xl sm:shadow-none border-t border-gray-700 sm:border-none`}
          >
            {/* Links públicos */}
            <Link to={"/"} className={linkClasses} onClick={() => setIsMenuOpen(false)}>
              <Home size={18} className="mr-2 sm:hidden" />
              Inicio
            </Link>
            <Link
              to={"/productos"}
              className={linkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Package size={18} className="mr-2 sm:hidden" />
              Productos
            </Link>

            {/* Ítem de Usuario Autenticado y Carrito */}
            {usuario && (
              <>
                <div className="flex items-center space-x-2 border-t sm:border-t-0 border-gray-700 pt-2 sm:pt-0">
                  <span className="font-bold text-white text-sm bg-gray-700 py-1 px-3 rounded-full hidden sm:block">
                    {usuario.nombre}
                  </span>
                  
                  {/* Carrito */}
                  <Link
                    to={"/cart"}
                    className={`${linkClasses} relative group `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    <span className="ml-2">Carrito</span>
                    {cart.length > 0 && (
                      <span
                      className="absolute -top-0.5 -left-0.5 bg-blue-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-blue-400 transition duration-300 ease-in-out"
                    >
                      {cart.length}
                    </span>
                    )}
                  </Link>
                </div>
              </>
            )}

            {/* Dashboard Admin */}
            {usuario?.isAdmin && (
              <Link
                to={"/admin/productos"}
                className={`${buttonBaseClasses} bg-cyan-600 hover:bg-cyan-500 text-white`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock className="mr-2" size={16} />
                Dashboard Admin
              </Link>
            )}

            {/* Botones de Autenticación */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 border-t sm:border-t-0 border-gray-700">
              {usuario ? (
                <button
                  className={`${buttonBaseClasses} bg-red-600 hover:bg-red-500 text-white `}
                  onClick={() => {
                    cerrarSesion();
                    vaciarCarrito();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={18} className="sm:mr-2" />
                  <span className="ml-2 sm:ml-0">Salir</span>
                </button>
              ) : (
                <>
                  <Link
                    to={"/registrar"}
                    className={`${buttonBaseClasses} bg-blue-600 hover:bg-blue-700 text-white`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="mr-2" size={18} />
                    Registrarse
                  </Link>
                  <Link
                    to={"/iniciar-sesion"}
                    className={`${buttonBaseClasses} bg-gray-700 hover:bg-gray-600 text-white`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="mr-2" size={18} />
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;