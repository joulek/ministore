import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import { Navbar } from "react-bootstrap";

const Ministore = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14",
      price: 4200,
      image: "https://www.it-tunisie.tn/wp-content/uploads/2022/09/APPLE_iPhone_14_Pro-removebg-preview.png.webp"
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: 3900,
      image: "https://techland.tn/uploads/media/KlTeuJtXLWxthRE3HNbNIgyFR5AYiJwzuAztOQ6E.jpg"
    },
    {
      id: 3,
      name: "Xiaomi Redmi Note 12",
      price: 1300,
      image: "https://www.sstech.tn/wp-content/uploads/2023/04/smartphone-xiaomi-redmi-note-12-pro-5g-8go-256go-bleu.webp"
    },
    {
      id: 4,
      name: "Oppo Reno 8",
      price: 1700,
      image: "https://electrotounes.tn/19875-large_default/smartphone-oppo-reno8-5g-8go256go-noir.jpg"
    },
    {
      id: 5,
      name: "Google Pixel 7",
      price: 3500,
      image: "https://gogizmo.in/wp-content/uploads/2024/11/Google-Pixel-7-Pro-Hazel-1.png"
    },
    {
      id: 6,
      name: "Huawei P50",
      price: 3100,
      image: "https://hmall.tn/wp-content/uploads/2023/02/P50-Pro-2.jpg"
    },
    {
      id: 7,
      name: "Realme 10 Pro",
      price: 1400,
      image: "https://realmestore.tn/wp-content/uploads/2023/01/1669360639984-768x768.png"
    },
    {
      id: 8,
      name: "OnePlus Nord CE 3",
      price: 2100,
      image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/product/larry/specs/product-green.png"
    },
    {
      id: 9,
      name: "Motorola Edge 40",
      price: 2900,
      image: "https://www.01net.com/app/uploads/lab/zboW8ROyaFLtWhLS1ABRcuV8EuOKf0uWjRnw8WHf.jpg"
    },
    {
      id: 10,
      name: "Infinix Zero 5G",
      price: 1200,
      image: "https://www.it-tunisie.tn/wp-content/uploads/2022/02/INFINIX-ZERO-5G-NOIR.png.webp"
    }
  ]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    setCart(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/client/cart");
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-24" style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80)",
      }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Bienvenue sur MiniStore
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-white mb-8 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Votre boutique incontournable pour les gadgets et accessoires tendance
          </motion.p>
          <motion.a href="#products"
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}>
            Magasiner maintenant
          </motion.a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">Nos Produits</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-contain p-4 bg-gray-50"
                  />
                </div>
                <div className="p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h5>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-indigo-600 font-semibold text-lg">{product.price} DT</p>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    Ajouter au Panier
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-indigo-100 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">Ce Que Disent Nos Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "La meilleure boutique tech où j'ai fait mes achats. Livraison rapide et produits excellents !",
                author: "Mohamed Ali",
                rating: 5
              },
              {
                quote: "Sélection impressionnante et excellent service client. Hautement recommandé !",
                author: "Sarah Johnson",
                rating: 4
              },
              {
                quote: "Mon endroit préféré pour tous mes besoins technologiques. Jamais déçu !",
                author: "Carlos Rodriguez",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-indigo-600">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ministore;
