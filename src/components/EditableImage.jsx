import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';

const EditableImage = ({ productId, initialImageUrl }) => {
  const { editarProducto, validarProducto } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!isEditing || isSaving) return;

    if (imageUrl === initialImageUrl) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    
    try {
      await editarProducto({
        id: productId,
        imagen: imageUrl,
      });
    } catch (err) {
      console.error("Error al guardar la nueva URL de la imagen:", err);
      setImageUrl(initialImageUrl);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
      e.target.blur();
    }
    if (e.key === 'Escape') {
      setImageUrl(initialImageUrl);
      setIsEditing(false);
    }
  };

  return (
    <div className={` flex justify-center items-center ${error ? 'border-2 border-red-500 rounded' : ''}`}>
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="text"
            value={imageUrl}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="bg-gray-700 text-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            autoFocus
            placeholder="Ingresa la URL de la imagen"
          />
          {isSaving && <span className="text-blue-400 text-xs mt-1">Guardando...</span>}
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Producto"
          className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          onDoubleClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default EditableImage;
