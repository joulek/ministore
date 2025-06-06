import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiSearch, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/clients");
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des clients:", err);
        setError("Impossible de charger les clients");
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedClients = React.useMemo(() => {
    let sortableClients = [...clients];
    if (sortConfig.key) {
      sortableClients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableClients;
  }, [clients, sortConfig]);

  const filteredClients = sortedClients.filter(client =>
    Object.values(client).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return (
    <div className="bg-gray-50 min-h-screen">
     
      <div className="text-center mt-10 py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Chargement des clients...</p>
      </div>
     
    </div>
  );

  if (error) return (
    <div className="bg-gray-50 min-h-screen">
     
      <div className="text-center mt-10 py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
     

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Liste des Clients
            </motion.h1>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Gestion complète de votre base de clients
            </motion.p>
          </div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un client..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[ 
                      { key: 'id', label: 'ID' },
                      { key: 'nom', label: 'Nom', icon: <FiUser className="text-gray-400" /> },
                      { key: 'email', label: 'Email', icon: <FiMail className="text-gray-400" /> },
                      { key: 'telephone', label: 'Téléphone', icon: <FiPhone className="text-gray-400" /> },
                      { key: 'adresse', label: 'Adresse', icon: <FiMapPin className="text-gray-400" /> }
                    ].map((column) => (
                      <th 
                        key={column.key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort(column.key)}
                      >
                        <div className="flex items-center gap-2">
                          {column.icon}
                          {column.label}
                          {sortConfig.key === column.key && (
                            <span className="text-indigo-600">
                              {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <motion.tr 
                      key={client.id}
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {client.nom.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{client.nom}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <a href={`mailto:${client.email}`} className="hover:text-indigo-600 hover:underline">
                          {client.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <a href={`tel:${client.telephone}`} className="hover:text-indigo-600">
                          {client.telephone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                        {client.adresse}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm ? "Aucun client ne correspond à votre recherche" : "Aucun client disponible pour le moment"}
                </p>
              </div>
            )}

            {/* Table Footer */}
            {filteredClients.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="text-sm text-gray-500">
                  {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} trouvé{filteredClients.length !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>


    </div>
  );
};

export default ClientsList;
