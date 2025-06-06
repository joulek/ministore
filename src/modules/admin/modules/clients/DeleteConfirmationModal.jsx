import React from "react";
import { motion } from "framer-motion";

const DeleteConfirmationModal = ({ 
  showDeleteModal, 
  setShowDeleteModal, 
  handleConfirmDelete,
  produitName
}) => {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-4">Confirmer la suppression</h2>
        
        <p className="text-gray-700 mb-6">
          Êtes-vous sûr de vouloir supprimer le produit <span className="font-semibold">"{produitName}"</span> ? Cette action est irréversible.
        </p>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmationModal;
