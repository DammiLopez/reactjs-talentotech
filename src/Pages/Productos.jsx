import { useEffect, useState } from "react";
import CursoCard from "../components/CursoCard";
import Spinner from "../components/Spinner";
import { useProducts } from "../context/ProductsContext";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Productos = () => {
  const { productos, cargando, error } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");

  // --- Estados de Paginación ---
  const [currentPage, setCurrentPage] = useState(1);
  // Opciones iniciales y estado para la cantidad de productos por página
  const itemsPerPageOptions = [3, 6, 9, 12, 24];
  const [productsPerPage, setProductsPerPage] = useState(3);
  // -----------------------------

  // 1. Filtrar productos activos y por término de búsqueda
  const productosActivos = productos.filter((p) => p.estado === "Publicado");

  const productosFiltrados = productosActivos.filter((producto) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const tituloMatch = producto.titulo.toLowerCase().includes(lowerSearchTerm);
    const descripcionMatch = producto.descripcion
      .toLowerCase()
      .includes(lowerSearchTerm);
    return tituloMatch || descripcionMatch;
  });

  // 2. Lógica de Cálculo de Paginación
  const totalProducts = productosFiltrados.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageTitle = "Explorar Cursos de Tecnología | Catálogo CursosTech";
  const pageDescription =
    "Descubre todos nuestros cursos: Desarrollo Web, Data Science, Cloud, y más. Encuentra la formación tecnológica que impulsará tu carrera IT.";

  // 3. Efecto para resetear la página si cambian los filtros
  useEffect(() => {
    setCurrentPage(1); // Siempre vuelve a la primera página si el filtro o la cantidad por página cambian
  }, [searchTerm, productsPerPage]);

  // Manejadores de Paginación
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Siempre vuelve a la primera página
  };

  // Manejar errores y carga
  if (error) return <p className="text-red-500 text-center py-12">{error}</p>;
  if (cargando) return <Spinner />;

  // Manejar el caso de que no haya productos después del filtro
  if (productosFiltrados.length === 0 && !cargando && searchTerm.length > 0) {
    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>
        <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
              <h2 className="text-3xl font-bold text-left mb-4 md:mb-0 text-blue-400">
                Nuestros Cursos
              </h2>
              <div className="relative w-full md:w-80 lg:w-96">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-lg"
                />
              </div>
            </div>
            <p className="text-center text-xl text-gray-400 mt-12">
              No se encontraron cursos que coincidan con{" "}
              <span className="font-extrabold">"{searchTerm}"</span> .
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            {/* Título */}
            <h2 className="text-3xl font-bold text-left mb-4 md:mb-0 text-blue-400">
              Nuestros Cursos
            </h2>

            {/* Input de Búsqueda con Diseño Responsivo */}
            <div className="relative w-full md:w-80 lg:w-96">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-lg"
              />
            </div>
          </div>

          {/* CONTROLES DE PAGINACIÓN SUPERIORES */}
          <div className="flex justify-end mb-6">
            <label
              htmlFor="items-per-page"
              className="text-gray-400 text-sm mr-2 flex items-center"
            >
              Cursos por página:
            </label>
            <select
              id="items-per-page"
              value={productsPerPage}
              onChange={handleProductsPerPageChange}
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* LISTA DE PRODUCTOS (SOLO LOS DE LA PÁGINA ACTUAL) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((curso) => (
              <CursoCard key={curso.id} curso={curso} />
            ))}
          </div>

          {/* CONTROLES DE PAGINACIÓN INFERIORES */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-12 space-y-4 sm:space-y-0">
              {/* Información de la página */}
              <p className="text-sm text-gray-400">
                Mostrando del {indexOfFirstProduct + 1} al{" "}
                {Math.min(indexOfLastProduct, totalProducts)} de {totalProducts}{" "}
                cursos.
              </p>

              {/* Botones de Paginación */}
              <div className="flex items-center space-x-2">
                {/* Botón Anterior */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full transition duration-300 ${
                    currentPage === 1
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  }`}
                  title="Página anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Indicador de página actual/total */}
                <span className="px-4 py-2 bg-gray-800 rounded-lg font-semibold text-blue-400 border border-blue-400/50">
                  Página {currentPage} de {totalPages}
                </span>

                {/* Botón Siguiente */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full transition duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  }`}
                  title="Página siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Productos;
