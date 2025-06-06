import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FiDownload,
  FiFileText,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";

const FactureDetail = () => {
  const { id } = useParams();
  const [facture, setFacture] = useState(null);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:8088/api/factures/${id}`)
      .then((res) => setFacture(res.data))
      .catch((err) => console.error("Erreur chargement facture:", err));
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(`FACTURE N° ${facture.id}`, 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Date : ${new Date(facture.dateFacture).toLocaleDateString("fr-FR")}`, 14, 35);
    doc.text(`Client : ${username}`, 14, 43);
    doc.text(`État : ${facture.payer ? "Payée" : "Non payée"}`, 14, 51);
    doc.text(`Total HT : ${facture.totalHT.toFixed(2)} DT`, 14, 63);
    doc.text(`TVA : ${facture.tva}%`, 14, 71);
    doc.text(`Montant TTC : ${facture.montantTTC.toFixed(2)} DT`, 14, 79);

    doc.setDrawColor(180);
    doc.line(14, 85, 196, 85);

    autoTable(doc, {
      startY: 90,
      head: [["Désignation", "Quantité"]],
      body: facture.produits.map((prod, i) => [prod, facture.qte[i]]),
      styles: { halign: "center", valign: "middle" },
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: 255,
        fontStyle: "bold"
      },
      margin: { left: 14, right: 14 }
    });

    const finalY = doc.lastAutoTable.finalY || 110;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Merci pour votre confiance.", 14, finalY + 20);
    doc.text("Signature client : ____________________", 140, finalY + 20);

    doc.save(`facture_${facture.id}.pdf`);
  };

  if (!facture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Chargement de la facture...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <FiFileText className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Facture {facture.id}</h1>
                  <p className="text-blue-100">Détails de votre commande</p>
                </div>
              </div>

              {/* ✅ Afficher le bouton seulement si facture est payée */}
              {facture.payer && (
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <FiDownload className="h-5 w-5" />
                  <span>Télécharger PDF</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FiCalendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{facture.dateFacture}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FiUser className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{username}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FiDollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Montant TTC</p>
                  <p className="font-medium text-xl">{facture.montantTTC} DT</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${facture.payer ? "bg-green-100" : "bg-amber-100"}`}>
                  {facture.payer ? (
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <FiXCircle className="h-5 w-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p className={`font-medium ${facture.payer ? "text-green-600" : "text-amber-600"}`}>
                    {facture.payer ? "Payée" : "Non payée"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total HT</h3>
            <p className="text-2xl font-semibold">{facture.totalHT} DT</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">TVA</h3>
            <p className="text-2xl font-semibold">{facture.tva}%</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-blue-600 mb-2">Montant TTC</h3>
            <p className="text-2xl font-semibold text-blue-700">{facture.montantTTC} DT</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <FiFileText className="h-5 w-5" />
              </span>
              <span>Produits commandés</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facture.produits.map((prod, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {prod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {facture.qte[i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Merci pour votre confiance. Pour toute question, contactez notre service client.</p>
        </div>
      </div>
    </div>
  );
};

export default FactureDetail;
