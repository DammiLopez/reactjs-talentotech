import { Trash2, X } from "lucide-react";


const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
        // Fondo Oscuro (Overlay)
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
            
            {/* Contenedor del Modal */}
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-700 transform transition-all duration-300 scale-100">
                
                {/* Cabecera */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-red-400 flex items-center gap-2">
                        <Trash2 size={24} />
                        Confirmar Eliminación
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-100 p-1 rounded-full hover:bg-gray-700 transition"
                        aria-label="Cerrar modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cuerpo del Mensaje */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                    Estás a punto de eliminar el producto: 
                    <strong className="text-white bg-gray-700 p-1 rounded mx-1">{productName}</strong>. 
                    Esta acción es <span className="text-red-400 font-semibold">irreversible</span>. ¿Deseas continuar?
                </p>

                {/* Acciones (Botones) */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 shadow-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={()=>onConfirm()}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 shadow-md flex items-center gap-2"
                    >
                        <Trash2 size={18} />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;