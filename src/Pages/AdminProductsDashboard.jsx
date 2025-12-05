import { useState } from "react";
import { Trash2 } from "lucide-react";
import EditableCell from "../components/EditableCell";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import EditableImage from "../components/EditableImage";
import { useProducts } from "../context/ProductsContext";
import AddProductForm from "../components/AddProductForm";
import { Helmet } from "react-helmet-async";

const AdminProductsDashboard = () => {
  // ... (Toda tu lógica y hooks de estado se mantienen iguales) ...
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { productos, cargando, error, editarProducto, eliminarProducto } =
    useProducts();

  // Estado para el formulario desplegable
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => setIsFormVisible((prev) => !prev);
  const hideForm = () => setIsFormVisible(false);

  // Cambiar estado de un producto
  const handleStatusChange = async (id, newStatus) => {
    try {
      const productToUpdate = productos.find((p) => p.id === id);
      if (!productToUpdate) return;

      const updatedProduct = { ...productToUpdate, estado: newStatus };
      await editarProducto(updatedProduct);
    } catch (err) {
      console.error("Error al actualizar el estado:", err);
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await eliminarProducto(productToDelete.id);
      console.log(`Producto con ID ${productToDelete.id} eliminado.`);
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
    } finally {
      setIsModalOpen(false); // Cerrar modal
      setProductToDelete(null); // Limpiar ID
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p className="text-xl">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-400">Error al cargar catálogo</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel de Administración | CursosTech</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Panel de control administrativo de CursosTech. Gestión de productos, usuarios y pedidos."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pt-24">
        {/* Header */}
        <div className="justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            Catálogo de productos
          </h1>
          <AddProductForm
            isVisible={isFormVisible}
            toggleVisibility={toggleFormVisibility}
            onProductAdded={hideForm}
          />
        </div>

        {/* --- VISTA DE ESCRITORIO (TABLA) --- */}
        <div className="hidden sm:block bg-gray-800 rounded-lg overflow-x-auto">
          <table className="w-full divide-y divide-gray-700 table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-20 py-3 text-center  text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Curso
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Descripcion
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                  Estado
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Borrar
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {productos.map((product) => (
                <tr key={product.id}>
                  {/* <td> IMAGEN */}
                  <td className="">
                    <EditableImage
                      productId={product.id}
                      initialImageUrl={product.imagen}
                    />
                  </td>

                  {/* <td> CURSO */}
                  <td>
                    <EditableCell
                      productId={product.id}
                      fieldName="titulo"
                      initialValue={product.titulo}
                    />
                  </td>

                  {/* <td> DESCRIPCION (Oculto en SM) */}
                  <td>
                    <EditableCell
                      productId={product.id}
                      fieldName="descripcion"
                      initialValue={product.descripcion}
                      className="hidden md:table-cell"
                    />
                  </td>

                  {/* <td> PRECIO */}
                  <td>
                    <EditableCell
                      productId={product.id}
                      fieldName="precio"
                      initialValue={product.precio}
                    />
                  </td>

                  {/* <td> ESTADO (Oculto en SM) */}
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <select
                      value={product.estado}
                      onChange={(e) =>
                        handleStatusChange(product.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded ${
                        product.estado === "Publicado"
                          ? "bg-green-800 text-green-200"
                          : "bg-red-800 text-red-200"
                      }`}
                    >
                      <option value="Publicado">Publicado</option>
                      <option value="Pausado">Pausado</option>
                    </select>
                  </td>

                  {/* <td> BORRAR */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-gray-700 transition duration-150"
                      title="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- VISTA MÓVIL (TARJETAS/LISTA) --- */}
        <div className="sm:hidden space-y-4 overflow-x-hidden">
          {productos.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-lg shadow-xl border-l-4 border-blue-500"
            >
              <div className="flex-col justify-between mb-3">
                {/* Imagen, Titulo */}
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 flex-shrink-0">
                    <EditableImage
                      productId={product.id}
                      initialImageUrl={product.imagen}
                    />
                  </div>
                  <div className="flex-grow min-w-0 font-bold text-lg text-white whitespace-normal break-words">
                    <EditableCell
                      productId={product.id}
                      fieldName="titulo"
                      initialValue={product.titulo}
                    />
                  </div>
                </div>
                {/* Descripcion */}
                <div className="text-sm text-gray-400 whitespace-normal break-words mt-3 ">
                  <EditableCell
                    productId={product.id}
                    fieldName="descripcion"
                    initialValue={product.descripcion}
                  />
                </div>

                {/* Botón Borrar */}
                <div className=" flex justify-end w-full mt-4">
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    className="text-red-white text bg-center bg-red-500 p-2 rounded-full hover:bg-red-700 transition duration-150 "
                    title="Eliminar producto"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Detalles editables (Precio y Estado) */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-3 text-center">
                {/* Precio */}
                <div className="flex justify-evenly items-center">
                  <span className="text-center text-xs uppercase text-gray-400  ">
                    Precio
                  </span>
                  <EditableCell
                    productId={product.id}
                    fieldName="precio"
                    initialValue={product.precio}
                    className="text-white font-semibold"
                  />
                </div>

                {/* Estado */}
                <div>
                  <span className="text-xs uppercase text-gray-400 block mb-1">
                    Estado
                  </span>
                  <select
                    value={product.estado}
                    onChange={(e) =>
                      handleStatusChange(product.id, e.target.value)
                    }
                    className={`px-2 py-1 text-sm rounded w-full ${
                      product.estado === "Publicado"
                        ? "bg-green-800 text-green-200"
                        : "bg-red-800 text-red-200"
                    }`}
                  >
                    <option value="Publicado">Publicado</option>
                    <option value="Pausado">Pausado</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.titulo || "Curso Desconocido"}
        />
      </div>
    </>
  );
};

export default AdminProductsDashboard;
