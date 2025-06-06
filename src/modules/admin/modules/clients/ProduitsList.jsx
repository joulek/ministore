import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AddProduitModal from "./AddProductModal";
import EditProduitModal from "./EditProductModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ProduitsList = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduit, setCurrentProduit] = useState(null);
  const [produitToDelete, setProduitToDelete] = useState(null);
  const [newProduit, setNewProduit] = useState({
    name: "",
    price: "",
    quantity: "",
    image: ""
  });

  useEffect(() => {
    loadProduits();
  }, []);

  const loadProduits = () => {
    setLoading(true);
    axios
      .get("http://localhost:8084/produits")
      .then((response) => {
        setProduits(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits :", error);
        setLoading(false);
      });
  };

  const handleEdit = (produit) => {
    setCurrentProduit(produit);
    setNewProduit({
      name: produit.name,
      price: produit.price,
      quantity: produit.quantity,
      image: produit.image
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (produit) => {
    setProduitToDelete(produit);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (produitToDelete) {
      axios.delete(`http://localhost:8084/produits/delete/${produitToDelete.id}`)
        .then(() => {
          loadProduits();
          setShowDeleteModal(false);
        })
        .catch(error => {
          console.error("Erreur lors de la suppression:", error);
          setShowDeleteModal(false);
        });
    }
  };

  const handleUpdateProduit = () => {
    axios.put(`http://localhost:8084/produits/update/${currentProduit.id}`, newProduit)
      .then(() => {
        loadProduits();
        setShowEditModal(false);
        setNewProduit({
          name: "",
          price: "",
          quantity: "",
          image: ""
        });
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };

  const handleAddProduit = () => {
    axios.post("http://localhost:8084/produits/add-produits", newProduit)
      .then(() => {
        loadProduits();
        setShowAddModal(false);
        setNewProduit({
          name: "",
          price: "",
          quantity: "",
          image: ""
        });
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-center mt-10 py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-lg">Chargement des produits...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800">
              Liste des Produits
            </h1>
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bi bi-plus-circle mr-2"></i>
              Ajouter Produit
            </motion.button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Quantité</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produits.map((produit) => (
                    <motion.tr 
                      key={produit.id}
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={produit.image}
                          alt={produit.name}
                          className="w-16 h-16 object-cover rounded-md border border-gray-200"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {produit.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">
                        {produit.price} TND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {produit.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <motion.button
                          onClick={() => handleEdit(produit)}
                          className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md border border-indigo-600 hover:bg-indigo-50 transition duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Éditer
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteClick(produit)}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md border border-red-600 hover:bg-red-50 transition duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Supprimer
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {produits.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun produit disponible pour le moment.</p>
            </div>
          )}
        </motion.div>
      </main>

      <AddProduitModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newProduit={newProduit}
        handleInputChange={handleInputChange}
        handleAddProduit={handleAddProduit}
      />

      <EditProduitModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        newProduit={newProduit}
        handleInputChange={handleInputChange}
        handleUpdateProduit={handleUpdateProduit}
      />

      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
        produitName={produitToDelete?.name || ""}
      />
    </div>
  );
};

export default ProduitsList;