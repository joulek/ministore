import React from "react";
import { motion } from "framer-motion";

const EditProduitModal = ({ 
  showEditModal, 
  setShowEditModal, 
  newProduit, 
  handleInputChange, 
  handleUpdateProduit 
}) => {
  if (!showEditModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Modifier le produit</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nom du produit</label>
            <input
              type="text"
              name="name"
              value={newProduit.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Prix (TND)</label>
            <input
              type="number"
              name="price"
              value={newProduit.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={newProduit.quantity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">URL de l'image</label>
            <input
              type="text"
              name="image"
              value={newProduit.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleUpdateProduit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProduitModal;