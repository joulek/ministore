import React from "react";
import { motion } from "framer-motion";
import Footer from "./footer";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">


      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            À propos de MiniStore
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Découvrez le parcours de l'innovation et du style derrière votre destination technologique préférée.
          </motion.p>
          <motion.a
            href="#story"
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            En savoir plus
          </motion.a>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="container mx-auto py-16 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-indigo-600 mb-6">Notre Histoire</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Fondée en 2023, MiniStore est née d'une passion pour rendre la technologie de pointe accessible à tous. Notre mission est de fournir des produits de haute qualité qui allient fonctionnalité et design époustouflant, vous permettant de rester en avance dans le monde de la technologie.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { year: "2023", event: "Fondation de MiniStore avec une vision pour une technologie accessible." },
            { year: "2024", event: "Élargissement de la gamme de produits avec des gadgets haut de gamme." },
            { year: "2025", event: "Introduction de la livraison rapide et gratuite dans le monde entier." },
          ].map((milestone, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{milestone.year}</h3>
              <p className="text-gray-600">{milestone.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Strengths and Offerings Section */}
      <section className="bg-gradient-to-br from-indigo-100 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">Ce Que Nous Offrons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Qualité Premium",
                description: "Gadgets et accessoires de premier ordre conçus pour la durabilité et la performance.",
                icon: "bi bi-star-fill",
              },
              {
                title: "Support 24/7",
                description: "Assistance 24 heures sur 24 et 7 jours sur 7 pour une expérience d'achat sans faille.",
                icon: "bi bi-headset",
              },
              {
                title: "Livraison Gratuite",
                description: "Livraison rapide et gratuite sur toutes les commandes dans le monde entier.",
                icon: "bi bi-truck",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center justify-center p-6"
                style={{ aspectRatio: "1 / 1", minWidth: "200px", minHeight: "200px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <i className={`${feature.icon} text-4xl mb-3`}></i>
                <h3 className="text-lg font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-sm text-center leading-tight">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<Footer></Footer>

    </div>
  );
};

export default About;