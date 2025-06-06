// src/components/FacturesChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const FacturesChart = ({ invoices }) => {
  const paidInvoices = invoices.filter(invoice => invoice.payer).length;
  const unpaidInvoices = invoices.length - paidInvoices;

  const chartData = {
    labels: ["Payées", "Non payées"],
    datasets: [
      {
        data: [paidInvoices, unpaidInvoices],
        backgroundColor: ["#10B981", "#EF4444"],
        hoverBackgroundColor: ["#059669", "#DC2626"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // On cache la légende car nous affichons nos propres stats
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Statut des Factures</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Statistique à gauche */}
        <div className="w-full md:w-1/4 order-1 md:order-1 text-center md:text-right mb-4 md:mb-0">
          <div className="bg-green-50 p-4 rounded-lg inline-block">
            <h3 className="font-medium text-green-800">Factures Payées</h3>
            <p className="text-2xl font-bold text-green-600">{paidInvoices}</p>
            <p className="text-sm text-green-500">
              {invoices.length > 0 ? Math.round((paidInvoices / invoices.length) * 100) : 0}% du total
            </p>
          </div>
        </div>

        {/* Graphique au centre */}
        <div className="w-full md:w-2/4 order-2 md:order-2 px-0 md:px-4">
          <div className="max-w-xs mx-auto">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Statistique à droite */}
        <div className="w-full md:w-1/4 order-3 md:order-3 text-center md:text-left">
          <div className="bg-red-50 p-4 rounded-lg inline-block">
            <h3 className="font-medium text-red-800">Factures Non Payées</h3>
            <p className="text-2xl font-bold text-red-600">{unpaidInvoices}</p>
            <p className="text-sm text-red-500">
              {invoices.length > 0 ? Math.round((unpaidInvoices / invoices.length) * 100) : 0}% du total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturesChart;