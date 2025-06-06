import React from "react";
import { motion } from "framer-motion";
import Footer from "./footer";

const Contact = () => {
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
            Contactez nous
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour toute question, et nous vous répondrons rapidement.
          </motion.p>
          <motion.a
            href="#contact-info"
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Contactez nous
          </motion.a>
        </div>
      </section>

      {/* Contact Info Section */}
      <section id="contact-info" className="container mx-auto py-16 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-indigo-600 mb-6">Information de contact</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Connectez-vous avec nous par le biais de votre méthode préférée. Notre équipe est prête à vous aider pour toute demande.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "bi bi-envelope-fill",
              title: "Email",
              details: "support@ministore.com",
            },
            {
              icon: "bi bi-telephone-fill",
              title: "Phone",
              details: "+1 (800) 123-4567",
            },
            {
              icon: "bi bi-geo-alt-fill",
              title: "Address",
              details: "123 Tech Street, Innovation City, USA",
            },
          ].map((info, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <i className={`${info.icon} text-4xl text-indigo-600 mb-3`}></i>
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.details}</p>
            </motion.div>
          ))}
        </div>
      </section>
<Footer></Footer>
    </div>
  );
};

export default Contact;