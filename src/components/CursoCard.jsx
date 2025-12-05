import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const CursoCard = ({ curso }) => {
  const { agregarAlCarrito } = useCartContext();
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Imagen del curso */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={curso.imagen}
          alt={curso.titulo}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Contenido del card */}
      <div className="p-5">
        {/* Título como enlace al detalle */}
        <Link to={`/productos/${curso.id}`}>
          <h3 className="text-xl font-bold text-blue-400 mb-2 hover:text-blue-300 transition-colors">
            {curso.titulo}
          </h3>
        </Link>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {curso.descripcion}
        </p>

        {/* Precio y botón */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">
            ${curso?.precio?.toFixed(2)}
          </span>
          <button
            onClick={ isAuthenticated ? () => agregarAlCarrito(curso) : () => alert("Inicia sesión para comprar!!!")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center transition-colors duration-300"
          >
            <ShoppingCart size={16} className="mr-1" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CursoCard;
