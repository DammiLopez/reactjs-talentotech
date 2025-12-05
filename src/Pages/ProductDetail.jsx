import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Spinner from "../components/Spinner";
import { useProducts } from "../context/ProductsContext";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const { producto, cargando, error, obtenerProductoById } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { usuario } = useAuthContext();

  useEffect(() => {
    obtenerProductoById(id);
  }, [id]);

  if (error) return <p className="text-red-500 text-center py-12">{error}</p>;
  if (cargando) return <Spinner />;
  if (!producto)
    return <p className="text-center py-12">Curso no encontrado.</p>;

  const title = `${producto?.titulo} | Cursos Online de Tecnología | CursosTech`;
  const description = `${producto.descripcion}... ¡Aprende ${
    producto.titulo
  } hoy mismo! Precio: $${producto.precio}.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="container mx-auto max-w-4xl">
          {/* Botón para volver */}
          <Link
            to="/productos"
            className="text-blue-400 hover:text-blue-300 mb-6 inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a cursos
          </Link>

          {/* Contenido del curso */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            {/* Imagen del curso */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.titulo}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detalles del curso */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-blue-400 mb-4">
                {producto.titulo}
              </h1>
              <p className="text-gray-300 mb-6 text-lg">
                {producto.descripcion}
              </p>

              {/* Precio y botón */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                <span className="text-2xl font-bold text-white mb-4 sm:mb-0">
                  ${producto.precio}
                </span>
                <button
                  onClick={
                    usuario
                      ? () => agregarAlCarrito(curso)
                      : () => alert("Inicia sesión para comprar!!!")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors w-full sm:w-auto justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
