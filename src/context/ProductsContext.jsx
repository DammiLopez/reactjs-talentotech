import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://68d1ee76e6c0cbeb39a62062.mockapi.io/productos";

  // Función de validación en el contexto
  const validarProducto = (producto) => {
    const errores = {};
    // imagen
    if (!producto.imagen?.trim()) {
      errores.imagen = 'La URL de la imagen es obligatoria.';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(producto.imagen.trim())) {
      errores.imagen = 'Debe ser una URL válida de imagen (jpg, png, webp, etc.).';
    }
    // titulo
    if (!producto.titulo?.trim()) {
      errores.titulo = 'El titulo es obligatorio.';
    }
    // precio
    if (!producto.precio?.toString().trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);

      if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.';
      }
    }
    // descripción
    if (!producto.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.';
    }
    return errores;
  };

  // Función para validar si el formulario es válido - titulo simplificado
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores,
    };
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
      if (!respuesta.ok) throw new Error('Error al agregar el producto');
      const data = await respuesta.json();
      setProductos(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`${URL}/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });
      if (!respuesta.ok) throw new Error('Error al editar el producto');
      const data = await respuesta.json();
      setProductos(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const respuesta = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar el producto');
      // Actualizar el estado local para remover el producto eliminado
      setProductos(prev => prev.filter(producto => producto.id !== id));
      return { success: true, id };
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  };

  // Función para obtener un producto por su id
  const obtenerProductoById = async  (id) => {
      try {
        const respuesta = await fetch(`${URL}/${id}`);
        if (!respuesta.ok) throw new Error('Error al cargar producto');
        const datos = await respuesta.json();
        setProducto(datos);
      } catch (error) {
        console.error('Error al cargar producto:', error);
        setError("Hubo un problema al cargar el detalle del producto.");
      } finally {
        setCargando(false);
      }
    };
    // fetch(`${URL}/${id}`)
    //   .then((respuesta) => respuesta.json())
    //   .then((datos) => {
    //     setCurso(datos);
    //     setCargando(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error!", error);
    //     setError("Hubo un problema al cargar el detalle del curso.");
    //     setCargando(false);
    //   });
  

  return (
    <ProductsContext.Provider
      value={{
        productos,
        producto,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        validarProducto,
        validar,
        obtenerProductoById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};
