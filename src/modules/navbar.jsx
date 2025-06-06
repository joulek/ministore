import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  Phone,
  ShoppingCart,
  FileText,
  PackageCheck,
  Receipt,
  LayoutDashboard,
  LogIn,
  LogOut,
  User
} from "lucide-react";

const Navbar = () => {
  const role = sessionStorage.getItem("role"); // 'ADMIN', 'CLIENT', ou null
  const username = sessionStorage.getItem("username"); // nom ou email
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/ministore");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-white shadow z-50 w-full">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/ministore" className="text-2xl font-bold text-indigo-600 flex items-center gap-1 no-underline">
          <PackageCheck className="w-6 h-6" />
          <span>MiniStore</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/ministore" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 no-underline">
            <Home className="w-5 h-5" /> <span>Accueil</span>
          </Link>

          <Link to="/about" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 no-underline">
            <Info className="w-5 h-5" /> <span>À propos</span>
          </Link>

          <Link to="/contact" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 no-underline">
            <Phone className="w-5 h-5" /> <span>Contact</span>
          </Link>

          {role === "CLIENT" && (
            <>
              <Link to="/client/cart" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 no-underline">
                <ShoppingCart className="w-5 h-5" /> <span>Mon Panier</span>
              </Link>
              <Link to="/client/factures" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 no-underline">
                <FileText className="w-5 h-5" /> <span>Mes Factures</span>
              </Link>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <Link to="/admin/ProduitsList" className="flex items-center gap-1  no-underline">
                <PackageCheck className="w-5 h-5" /> <span>Produits</span>
              </Link>
              <Link to="/admin/FacturesList" className="flex items-center gap-1  no-underline">
                <Receipt className="w-5 h-5" /> <span>Factures</span>
              </Link>
              <Link to="/admin/Dashboard" className="flex items-center gap-1  no-underline">
                <LayoutDashboard className="w-5 h-5" /> <span>Tableau de Bord</span>
              </Link>
            </>
          )}

          {username && (
            <span className="flex items-center gap-1 text-indigo-600 font-semibold">
              <User className="w-4 h-4" /> {username}
            </span>
          )}

          {!role ? (
            <Link to="/log" className="flex items-center gap-1 px-4 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 text-sm no-underline">
              <LogIn className="w-4 h-4" /> Connexion
            </Link>
          ) : (
            <button onClick={handleLogout} className="flex items-center gap-1 px-4 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 text-sm">
  <LogOut className="w-4 h-4" /> Déconnexion
</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
