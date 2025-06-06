import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import FacturesChart from "./FacturesChart";

const FacturesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState({});

  const API_URL = "http://localhost:8088/api/factures";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Charger toutes les factures
        const invoicesResponse = await axios.get(API_URL);
        const invoicesData = invoicesResponse.data;
        setInvoices(invoicesData);

        // Extraire les IDs uniques des clients
        const clientIds = [...new Set(invoicesData.map(invoice => invoice.clientId))];

        const clientsMap = {};

        // Récupérer les clients via /api/clients/{clientId}
        for (const clientId of clientIds) {
          try {
            const response = await axios.get(
              `http://localhost:8088/api/clients/${clientId}`
            );
            const clientData = response.data;
            if (clientData) {
              clientsMap[clientId] = clientData;
            }
          } catch (err) {
            console.error(`Erreur lors du chargement du client ${clientId}:`, err);
          }
        }

        setClients(clientsMap);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les factures");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="text-center mt-10 py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement des factures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="text-center mt-10 py-20">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

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
              Liste des Factures
            </h1>
            <div className="text-indigo-600 font-medium">
              Total: {invoices.length} factures
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      ID Facture
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <motion.tr
                      key={invoice.id}
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(invoice.dateFacture).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {clients[invoice.clientId] ? (
                          <div>
                            <p className="font-medium">
                              {clients[invoice.clientId].nom}
                              {clients[invoice.clientId].prenom}
                            </p>
                            <p className="text-xs text-gray-500">
                              {clients[invoice.clientId].email}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-400">yosr</p>
                          
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            invoice.payer
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {invoice.payer ? "Payée" : "Non payée"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucune facture disponible pour le moment.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-indigo-800 mb-6">
                Statistiques des Paiements
              </h2>
              <FacturesChart invoices={invoices} />
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default FacturesList;
