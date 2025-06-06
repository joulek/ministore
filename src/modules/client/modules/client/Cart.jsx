import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHoveringEmpty, setIsHoveringEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, parseInt(newQuantity) || 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const clientId = parseInt(sessionStorage.getItem("id"));
      const produits = cart.map(item => item.name);
      const qte = cart.map(item => item.quantity);
      const totalHT = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const facture = {
        clientId,
        produits,
        qte,
        totalHT,
        tva: 19,
        montantTTC: totalHT * (1 + 19 / 100),
        dateFacture: new Date().toISOString()
      };

      const res = await axios.post("http://localhost:8088/api/factures/add", facture);
      const factureId = res.data.id;
      localStorage.removeItem("cart");
      setCart([]);
      navigate(`/client/facture/${factureId}`);
    } catch (err) {
      console.error("Erreur lors de l'ajout de la facture:", err);
      alert("Erreur lors de la création de la facture.");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 center">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <motion.h1
          className="text-4xl font-extrabold text-indigo-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Votre Panier
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Passez en revue et gérez vos articles avant de finaliser votre achat
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : cart.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onHoverStart={() => setIsHoveringEmpty(true)}
            onHoverEnd={() => setIsHoveringEmpty(false)}
          >
            <motion.div
              animate={{
                scale: isHoveringEmpty ? 1.1 : 1,
                rotate: isHoveringEmpty ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-300 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </motion.div>
            <p className="text-lg text-gray-500 mb-8">Votre panier est vide</p>
            <motion.a
              href="/ministore"
              className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer à magasiner
            </motion.a>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image.startsWith("http") ? item.image : `/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-indigo-600 font-medium">{item.price} DT</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      className="px-2 py-1 text-gray-500 hover:bg-gray-50 rounded-l-full"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                      className="w-10 text-center border-0 bg-transparent focus:ring-0"
                    />
                    <button
                      className="px-2 py-1 text-gray-500 hover:bg-gray-50 rounded-r-full"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="w-16 text-right font-semibold">
                    {(item.price * item.quantity).toFixed(2)} DT
                  </p>

                  <button
                    className="p-1 text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(index)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="text-xl font-bold text-indigo-600">{total.toFixed(2)} DT</span>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <a
                  href="/ministore"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Continuer vos achats
                </a>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Payer Maintenant
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
