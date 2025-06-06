import React, { useEffect, useState } from "react";
import axios from "axios";

const PaiementModal = ({ factureId, onClose }) => {
  const [facture, setFacture] = useState(null);
  const [formData, setFormData] = useState({
    cardHolderName: "",
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8088/api/factures/${factureId}`)
      .then((res) => setFacture(res.data))
      .catch((err) => {
        console.error("Erreur chargement facture :", err);
        alert("Erreur de chargement de la facture.");
        onClose();
      });
  }, [factureId, onClose]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardHolderName.trim())
      newErrors.cardHolderName = "Le nom du titulaire est requis";
    if (!/^\d{16}$/.test(formData.creditCardNumber.replace(/\s/g, "")))
      newErrors.creditCardNumber = "Numéro de carte invalide (16 chiffres)";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate))
      newErrors.expirationDate = "Format MM/YY requis";
    if (!/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = "CVV invalide (3-4 chiffres)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "creditCardNumber") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }
    if (name === "expirationDate") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5);
    }
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (!validateForm() || !facture) return;
    setIsSubmitting(true);

    const paiement = {
      ...formData,
      creditCardNumber: formData.creditCardNumber.replace(/\s/g, ""),
      amount: facture.montantTTC,
      clientId: facture.clientId,
      factureIds: [facture.id],
      paymentDate: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8083/paiements/create", paiement)
      .then(() => axios.put("http://localhost:8088/api/factures/update-payer", [facture.id]))
      .then(() => {
        alert("✅ Paiement effectué avec succès !");
        onClose();
      })
      .catch((err) => {
        console.error("Erreur paiement :", err);
        alert("❌ Échec du paiement.");
        setIsSubmitting(false);
      });
  };

  if (!facture)
    return (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header border-0">
            <h5 className="modal-title text-primary">Paiement Facture {facture.id}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4 p-md-5">
            <p className="text-center text-muted mb-4">
              Montant à payer : <strong>{facture.montantTTC} DT</strong>
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="cardHolderName" className="form-label">
                  👤 Nom du titulaire
                </label>
                <input
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  className={`form-control ${errors.cardHolderName ? "is-invalid" : ""}`}
                  value={formData.cardHolderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  aria-describedby="cardHolderNameError"
                />
                {errors.cardHolderName && (
                  <div id="cardHolderNameError" className="invalid-feedback">
                    {errors.cardHolderName}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="creditCardNumber" className="form-label">
                  💳 Numéro de carte
                </label>
                <input
                  type="text"
                  id="creditCardNumber"
                  name="creditCardNumber"
                  className={`form-control ${errors.creditCardNumber ? "is-invalid" : ""}`}
                  value={formData.creditCardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  aria-describedby="creditCardNumberError"
                />
                {errors.creditCardNumber && (
                  <div id="creditCardNumberError" className="invalid-feedback">
                    {errors.creditCardNumber}
                  </div>
                )}
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="expirationDate" className="form-label">
                    📅 Date d’expiration
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    className={`form-control ${errors.expirationDate ? "is-invalid" : ""}`}
                    value={formData.expirationDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    aria-describedby="expirationDateError"
                  />
                  {errors.expirationDate && (
                    <div id="expirationDateError" className="invalid-feedback">
                      {errors.expirationDate}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="cvv" className="form-label">
                    🔐 CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    aria-describedby="cvvError"
                  />
                  {errors.cvv && (
                    <div id="cvvError" className="invalid-feedback">
                      {errors.cvv}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center rounded-pill"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                )}
                💰 Confirmer Paiement
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaiementModal;