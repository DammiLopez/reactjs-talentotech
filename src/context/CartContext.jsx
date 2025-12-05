import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
  // Recuperar el carrito del localStorage al cargar la página
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {

    toast.success(`"${producto.titulo}" agregado al carrito!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    setCart((carritoActual) => {
      const productoExistente = carritoActual.find((item) => item.id === producto.id);
      if (productoExistente) {
        // Si el producto ya existe, incrementar la cantidad
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para incrementar la cantidad de un producto
  const incrementarCantidad = (id) => {
    setCart((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Función para decrementar la cantidad de un producto
  const decrementarCantidad = (id) => {
    setCart((carritoActual) => {
      const productoExistente = carritoActual.find((item) => item.id === id);
      if (productoExistente && productoExistente.cantidad > 1) {
        // Si la cantidad es mayor a 1, disminuirla
        return carritoActual.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      } else {
        // Si la cantidad es 1, eliminar el producto
        return carritoActual.filter((item) => item.id !== id);
      }
    });
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCart((carritoActual) => carritoActual.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCart([]);
  };

  // Calcular el total del carrito
  const total = cart.reduce(
    (sum, item) => sum + Number(item.precio) * (item.cantidad || 1),
    0
  );

  // Valor que se provee a todos los componentes
  const value = {
    cart,
    agregarAlCarrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    total,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el contexto del carrito
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}
