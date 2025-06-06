import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrendingUp, FiDollarSign, FiCreditCard, FiAlertCircle, FiCheckCircle, FiXCircle, FiCalendar, FiFileText } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({
    ht: 0,
    tva: 0,
    ttc: 0,
    totalPaye: 0,
    totalImpaye: 0,
    countPaye: 0,
    countImpaye: 0,
    caParMois: [],
    latestFactures: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ht, tva, ttc, totalPaye, totalImpaye, countPaye, countImpaye, caParMois, latestFactures] = await Promise.all([
          axios.get("http://localhost:8088/api/factures/calculateHT"),
          axios.get("http://localhost:8088/api/factures/calculateTVA"),
          axios.get("http://localhost:8088/api/factures/calculateTTC"),
          axios.get("http://localhost:8088/api/factures/totalPaye"),
          axios.get("http://localhost:8088/api/factures/totalNonPaye"),
          axios.get("http://localhost:8088/api/factures/countTotalPaye"),
          axios.get("http://localhost:8088/api/factures/countTotalImpaye"),
          axios.get("http://localhost:8088/api/factures/chiffreAffaireParMois"),
          axios.get("http://localhost:8088/api/factures/latestFour")
        ]);

        setData({
          ht: ht.data,
          tva: tva.data,
          ttc: ttc.data,
          totalPaye: totalPaye.data,
          totalImpaye: totalImpaye.data,
          countPaye: countPaye.data,
          countImpaye: countImpaye.data,
          caParMois: caParMois.data,
          latestFactures: latestFactures.data
        });
      } catch (err) {
        console.error("Erreur lors du chargement du dashboard:", err);
      }
    };

    fetchData();
  }, []);

  // Préparation des données pour le graphique
  const chartData = {
    labels: data.caParMois.map(item => {
      const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
      return months[item.mois - 1];
    }),
    datasets: [
      {
        label: 'Chiffre d\'affaires (DT)',
        data: data.caParMois.map(item => item.total),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
        borderRadius: 6
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-3 text-indigo-600" />
            Tableau de Bord Financier
          </h1>
          <div className="text-sm text-gray-500 flex items-center">
            <FiCalendar className="mr-2" />
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Cartes Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Carte HT */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Chiffre d'affaire HT</p>
                <h3 className="text-2xl font-bold mt-1">{data.ht.toFixed(2)} DT</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiDollarSign className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Taux de TVA: {data.tva > 0 ? ((data.tva / data.ht) * 100).toFixed(2) : 0}%</p>
            </div>
          </div>

          {/* Carte TTC */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Chiffre d'affaire TTC</p>
                <h3 className="text-2xl font-bold mt-1">{data.ttc.toFixed(2)} DT</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FiCreditCard className="text-indigo-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Dont TVA: {data.tva.toFixed(2)} DT</p>
            </div>
          </div>

          {/* Carte Payé */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Payé</p>
                <h3 className="text-2xl font-bold mt-1">{data.totalPaye.toFixed(2)} DT</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
              <span className="text-xs text-gray-500">{data.countPaye} factures</span>
              {data.countPaye > 0 && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {(data.totalPaye / data.ttc * 100).toFixed(1)}% du CA
                </span>
              )}
            </div>
          </div>

          {/* Carte Impayé */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Impayé</p>
                <h3 className="text-2xl font-bold mt-1">{data.totalImpaye.toFixed(2)} DT</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiAlertCircle className="text-red-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
              <span className="text-xs text-gray-500">{data.countImpaye} factures</span>
              {data.countImpaye > 0 && (
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {(data.totalImpaye / data.ttc * 100).toFixed(1)}% du CA
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Graphique et Dernières Factures */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Graphique CA par mois */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiTrendingUp className="mr-2 text-indigo-600" />
              Chiffre d'affaires par mois
            </h2>
            <div className="h-64">
              <Bar 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return value + ' DT';
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Résumé Factures */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiFileText className="mr-2 text-indigo-600" />
              Résumé Factures
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Total Factures</span>
                <span className="font-bold">{data.countPaye + data.countImpaye}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Factures Payées</span>
                <span className="font-bold text-green-600">{data.countPaye}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Factures Impayées</span>
                <span className="font-bold text-red-600">{data.countImpaye}</span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Taux de paiement: {data.countPaye > 0 ? ((data.countPaye / (data.countPaye + data.countImpaye)) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dernières Factures */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiFileText className="mr-2 text-indigo-600" />
              Dernières Factures
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant TTC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.latestFactures.map((facture) => (
                  <tr key={facture.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{facture.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">yosr </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(facture.dateFacture).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {facture.montantTTC.toFixed(2)} DT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${facture.payer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {facture.payer ? 'Payée' : 'Non payée'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;