import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./config/PrivateRoute";
import AdminLayout from "./modules/admin/layout";
import ClientLayout from "./modules/client/layout";

import Ministore from "./modules/home";
import Cart from "./modules/client/modules/client/Cart";
import FactureDetail from "./modules/client/modules/client/factureDetails";
import PaiementModal from "./modules/client/modules/client/PaiementModel";

import AuthForm from "./modules/auth/AuthForm";
import LoginPage from "./modules/auth/LoginPage";

import Navbar from "./modules/navbar";
import NotFound from "./config/notfound";

import AddProduitModal from "./modules/admin/modules/clients/AddProductModal";
import EditProduitModal from "./modules/admin/modules/clients/EditProductModal";
import DeleteConfirmationModal from "./modules/admin/modules/clients/DeleteConfirmationModal";


import ProduitsList from "./modules/admin/modules/clients/ProduitsList";

import About from "./modules/about";
import Contact from "./modules/contact";
import FacturesChart from "./modules/admin/modules/clients/FacturesChart";
import Dashboard from "./modules/admin/layout/Dashboard";
import FactureList from "./modules/client/modules/client/FactureList";
import FacturesList from "./modules/admin/modules/clients/FacturesList";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Navigate to="/ministore" />} />
        <Route path="/ministore" element={<Ministore />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/log" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />

        {/* Routes protégées */}
        <Route element={<PrivateRoutes />}>
          {/* Routes ADMIN imbriquées */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="ProduitsList" element={<ProduitsList />} />
            <Route path="AddProduitModal" element={<AddProduitModal />} />
            <Route path="EditProduitModal" element={<EditProduitModal />} />
            <Route path="DeleteConfirmationModal" element={<DeleteConfirmationModal />} />
            <Route path="FacturesChart" element={<FacturesChart />} />
             <Route path="FacturesList" element={<FacturesList />} />
             <Route path="Dashboard" element={<Dashboard />} />
          </Route>

          {/* Routes CLIENT imbriquées */}
          <Route path="/client" element={<ClientLayout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="factures" element={<FactureList />} />
            <Route path="facture/:id" element={<FactureDetail />} />
            <Route path="paiement/:id" element={<PaiementModal />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;