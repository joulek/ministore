import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg mb-4">© 2025 MiniStore. Tous les droits sont réservés.</p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="#"
              className="hover:text-indigo-300 transition duration-300"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="bi bi-facebook text-2xl"></i>
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-indigo-300 transition duration-300"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="bi bi-twitter text-2xl"></i>
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-indigo-300 transition duration-300"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="bi bi-instagram text-2xl"></i>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;