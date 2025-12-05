import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useState } from "react";
import { useProducts } from "../context";

const AddProductForm = ({ isVisible, toggleVisibility, onProductAdded }) => {
  const { agregarProducto, validarProducto } = useProducts();

  // Estados para el Nuevo Producto
  const [newProduct, setNewProduct] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    estado: "Publicado", // Default
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejadores para el Nuevo Producto
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
    // Limpiar error para el campo que se está editando
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddProduct = async () => {
    setIsSubmitting(true);
    setFormErrors({});

    // 1. Full Validation
    const errors = validarProducto(newProduct);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    let productToSave = { ...newProduct };

    if (productToSave.precio !== "") {
      const numericPrice = parseFloat(productToSave.precio);

      if (!isNaN(numericPrice)) {
        productToSave.precio = numericPrice;
      }
    }
    try {
      // 2. Add product via context
      await agregarProducto(productToSave);

      // 3. Reset form on success and call callback
      setNewProduct({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: "",
        estado: "Publicado",
      });
      setFormErrors({});
      // Opcional: Ocultar el formulario después de agregar
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (err) {
      console.error("Error al agregar producto:", err);
      setFormErrors({
        general: "Error al guardar el producto. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-inner mb-8 border border-gray-700 transition-all duration-300 overflow-hidden">
      {/* Botón de Despliegue (Siempre visible) */}
      <button
        onClick={toggleVisibility}
        className="w-full text-left p-4 flex justify-between items-center text-xl font-semibold text-white hover:bg-gray-700 transition duration-150"
        aria-expanded={isVisible}
      >
        <div className="flex items-center gap-3">
          <Plus
            size={20}
            className={`transition-transform duration-300  ${
              isVisible ? "rotate-45 text-red-400" : "text-green-400"
            }`}
          />
          Añadir Nuevo Producto
        </div>
        {isVisible ? (
          <ChevronUp size={20} className="text-blue-400" />
        ) : (
          <ChevronDown size={20} className="text-blue-400" />
        )}
      </button>

      {/* Contenido Desplegable (Condicional) */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? "max-h-96 opacity-100 p-4 pt-0" : "max-h-0 opacity-0 p-0"
        }`}
        style={{
          // Esto permite la transición de altura suave sin conocer la altura exacta
          maxHeight: isVisible ? "500px" : "0",
        }}
      >
        {formErrors.general && (
          <p className="text-red-400 mb-3 p-2 bg-red-900/50 rounded-lg">
            {formErrors.general}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
          {/* Imagen URL */}
          <div className="lg:col-span-1">
            <label
              htmlFor="imagen"
              className="block text-sm font-medium text-gray-400"
            >
              Imagen URL
            </label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              value={newProduct.imagen}
              onChange={handleNewProductChange}
              className={`w-full bg-gray-700 text-white border ${
                formErrors.imagen ? "border-red-500" : "border-gray-600"
              } rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition`}
              placeholder="https://example.com/img.png"
            />
            {formErrors.imagen && (
              <p className="text-red-400 text-xs mt-1">{formErrors.imagen}</p>
            )}
          </div>

          {/* Título (Curso) */}
          <div className="lg:col-span-1">
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray-400"
            >
              Título/Curso
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={newProduct.titulo}
              onChange={handleNewProductChange}
              className={`w-full bg-gray-700 text-white border ${
                formErrors.titulo ? "border-red-500" : "border-gray-600"
              } rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition`}
              placeholder="Ej: Curso de React"
            />
            {formErrors.titulo && (
              <p className="text-red-400 text-xs mt-1">{formErrors.titulo}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="lg:col-span-2">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-400"
            >
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={newProduct.descripcion}
              onChange={handleNewProductChange}
              className={`w-full bg-gray-700 text-white border ${
                formErrors.descripcion ? "border-red-500" : "border-gray-600"
              } rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition`}
              placeholder="Descripción breve (mín. 10 caracteres)"
            />
            {formErrors.descripcion && (
              <p className="text-red-400 text-xs mt-1">
                {formErrors.descripcion}
              </p>
            )}
          </div>

          {/* Precio */}
          <div className="lg:col-span-1">
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-400"
            >
              Precio ($)
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={newProduct.precio}
              onChange={handleNewProductChange}
              className={`w-full bg-gray-700 text-white border ${
                formErrors.precio ? "border-red-500" : "border-gray-600"
              } rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition`}
              placeholder="99.99"
              step="0.01"
            />
            {formErrors.precio && (
              <p className="text-red-400 text-xs mt-1">{formErrors.precio}</p>
            )}
          </div>

          {/* Botón Guardar */}
          <div className="lg:col-span-1  items-end">
            <button
              onClick={handleAddProduct}
              disabled={isSubmitting}
              className={`w-full py-2  rounded-lg font-semibold transition duration-150 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                "Guardando..."
              ) : (
                <>
                  <Plus size={18} /> Guardar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
