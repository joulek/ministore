import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import PaiementModal from "./PaiementModel";

const FactureList = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFactureId, setSelectedFactureId] = useState(null);

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = () => {
    const clientId = parseInt(sessionStorage.getItem("id"));
    axios
      .get(`http://localhost:8088/api/factures/client/${clientId}`)
      .then((res) => {
        setFactures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement factures:", err);
        setLoading(false);
      });
  };

  const handlePaiement = (id) => {
    setSelectedFactureId(id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette facture ?")) return;
    axios
      .delete(`http://localhost:8088/api/factures/${id}`)
      .then(() => {
        setFactures((prev) => prev.filter((f) => f.id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression :", err);
        alert("Échec de suppression !");
      });
  };

  const closeModal = () => {
    setSelectedFactureId(null);
    fetchFactures();
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-3 flex items-center justify-center gap-3">
            <span>📁</span> Mes Factures
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium">
            Consultez l'historique de toutes vos factures et effectuez vos paiements en toute simplicité
          </p>
        </motion.div>

        {factures.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
              <h3 className="text-lg font-medium text-gray-500">Total Factures</h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600">{factures.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <h3 className="text-lg font-medium text-gray-500">Factures Payées</h3>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                {factures.filter((f) => f.payer).length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <h3 className="text-lg font-medium text-gray-500">Montant Total</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-700">
                {factures.reduce((sum, f) => sum + (f.montantTTC || 0), 0).toFixed(2)} DT
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl overflow-hidden"
        >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
            </div>
          ) : factures.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucune facture disponible</p>
              <Link
                to="/ministore"
                className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Faire des achats
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {factures.map((f) => (
                    <motion.tr
                      key={f.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{f.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {f.dateFacture ? new Date(f.dateFacture).toLocaleDateString("fr-FR") : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                        {f.montantTTC?.toFixed(2) ?? "0.00"} DT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            f.payer ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {f.payer ? "Payée" : "En attente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          to={`/client/facture/${f.id}`}
                          className="text-indigo-600 hover:text-indigo-900 hover:underline"
                        >
                          Détails
                        </Link>
                        {!f.payer && (
                          <button
                            onClick={() => handlePaiement(f.id)}
                            className="text-green-600 hover:text-green-900 hover:underline"
                          >
                            Payer
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="text-red-600 hover:text-red-900 hover:underline"
                        >
                          Supprimer
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {selectedFactureId && <PaiementModal factureId={selectedFactureId} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default FactureList;