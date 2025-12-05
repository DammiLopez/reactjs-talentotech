  // EditableCell.jsx
  import React, { useState, useRef, useEffect } from 'react'; // ¡Importamos useRef y useEffect!
  import { useProducts } from '../context/ProductsContext'; // Asegúrate de la ruta correcta

  const EditableCell = ({ productId, fieldName, initialValue, validation }) => {
    const { editarProducto, validarProducto } = useProducts();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    
    // Referencia para el textarea (necesaria para el auto-ajuste)
    const textareaRef = useRef(null); 

    // Determinar si debemos usar textarea o input (solo 'precio' usa input)
    const isMultiLine = fieldName !== 'precio';

    useEffect(() => {
      if (isEditing && isMultiLine && textareaRef.current) {
        const textarea = textareaRef.current;
        // 1. Resetear la altura para calcular la altura correcta
        textarea.style.height = 'auto'; 
        // 2. Establecer la altura al scrollHeight para que se ajuste al contenido
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [isEditing, value]); // Ejecutar cuando el modo de edición o el valor cambien


    // Muestra el valor inicial de la celda
    const displayValue = fieldName === 'precio' ? `$${value}` : value;
    
    // Función para manejar el guardado de los cambios
    const handleSave = async () => {
      // ... (Tu lógica de handleSave permanece igual)
      // 1. Verificación inicial y Validación
      if (!isEditing || isSaving) return;

      // Crear objeto temporal para validación
      const tempProduct = { [fieldName]: value }; 
      const validationErrors = validarProducto(tempProduct);
      
      // Si hay error de validación, lo muestra y NO guarda.
      if (validationErrors[fieldName]) {
          setError(validationErrors[fieldName]);
          return;
      }
      
      // 2. Si el valor no ha cambiado, no hacemos nada
      if (value === initialValue) {
          setIsEditing(false);
          return;
      }

      // A partir de aquí, el valor es válido y diferente al inicial.
      setIsSaving(true);
      setError(null);
      
      // 3. Conversión del Tipo de Dato (Corrección para 'precio')
      let newValue = value; 

      if (fieldName === 'precio') {
          // Convertir la cadena a número (flotante)
          const numericValue = parseFloat(value); 
          if (!isNaN(numericValue)) {
              newValue = numericValue;
          } 
      }
      
      const dataToUpdate = {
          id: productId,
          [fieldName]: newValue, // Usamos el valor convertido (newValue)
      };

      // 4. Guardar los cambios
      try {
          await editarProducto(dataToUpdate);
          
      } catch (err) {
          console.error("Error al guardar la edición en línea:", err);
          setValue(initialValue); 
          setError("Error al guardar.");
      } finally {
          setIsSaving(false);
          setIsEditing(false); 
      }
  };

    // Manejar el cambio en el input/textarea
    const handleChange = (e) => {
      setValue(e.target.value);
      // Limpiar el error si empieza a escribir
      if (error) setError(null);
    };

  // Manejar la tecla Enter
    const handleKeyDown = (e) => {
      
      if (e.key === 'Enter') {
          // Campo de una línea (Precio): Enter siempre guarda
          if (!isMultiLine) {
              handleSave();
              e.target.blur();
              return;
          } 
          
          else if (e.ctrlKey || e.metaKey) { // metaKey es Cmd en Mac
              e.preventDefault(); // Evita el salto de línea que podría ocurrir
              handleSave();
              e.target.blur();
              return;
          }
          // Si es multilínea y solo se presiona Enter, se permite el salto de línea (comportamiento por defecto)
      }
      
      // Esc para cancelar
      if (e.key === 'Escape') {
          setValue(initialValue);
          setIsEditing(false);
      }
    };

    // Función para renderizar el campo editable (Input o Textarea)
    const renderInput = () => {
      const commonProps = {
          value,
          onChange: handleChange,
          onBlur: handleSave,
          onKeyDown: handleKeyDown,
          className: "bg-gray-700 text-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
          autoFocus: true,
      };

      if (isMultiLine) {
          return (
              <textarea
                  {...commonProps}
                  ref={textareaRef} // Asignamos la referencia
                  rows={1} // Empezar con 1 fila
                  style={{ resize: 'none', overflowY: 'hidden' }} // Deshabilitar el resize manual y el scroll
              />
          );
      }

      // Es campo 'precio' o un campo de texto simple que no necesita multilínea
      return (
          <input
              {...commonProps}
              type={fieldName === 'precio' ? 'number' : 'text'}
          />
      );
    };

    return (
      <div 
        className={`py-4 ${error ? 'border-2 border-red-500 rounded' : ''}`}
        onDoubleClick={() => setIsEditing(true)}
        title="Doble clic para editar"
      >
        {isEditing ? (
          <div className="flex flex-col">
              {renderInput()} {/* Usa la función renderInput (Input o Textarea) */}
              
              {/* 💡 Señalización para guardar en campos multilínea */}
              {isMultiLine && (
                  <span className="text-blue-300 text-xs mt-1 font-semibold">
                    <p><span className='text-l font-extrabold'>Ctrl + Enter o click fuera del area </span> para guardar </p>
                    <p><span className='text-l font-extrabold'>Esc</span> para cancelar</p> 
                  </span>
              )}

              {/* Mensajes de estado/error existentes */}
              {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
              {isSaving && <span className="text-blue-400 text-xs mt-1">Guardando...</span>}
          </div>
        ) : (
          <span className="cursor-pointer hover:bg-gray-700 p-1 rounded transition duration-150 whitespace-normal block">
              {displayValue}
          </span>
        )}
      </div>
    );
  };

  export default EditableCell;