import React from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import { GrVirtualMachine } from "react-icons/gr";
import { FaBarsProgress } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import "./css/style-home.css"; // Assure-toi que le chemin est correct

const Sidebar = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <Link
              to="/admin/clients/Statistiques"
              className="menu-title link-dark rounded"
              style={{ textDecoration: "none" }}
            >
              <IoHome /> HOME
            </Link>
            <ul className="btn-toggle">
              <li>
                <Link
                  to="/admin/clients/magasinier"
                  className="link-dark rounded"
                >
                  <FaUsers /> Magasinier
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/clients/gestionnaire"
                  className="link-dark rounded"
                >
                  <FaUsers /> Gestionnaire
                </Link>
              </li>
              <li>
                <Link to="/admin/clients/client" className="link-dark rounded">
                  <FaUsers /> Clients
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/clients/materiaux"
                  className="link-dark rounded"
                >
                  <FaTools /> Matériaux
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/clients/outillage"
                  className="link-dark rounded"
                >
                  <FaTools /> Outillage
                </Link>
              </li>
              <li>
                <Link to="/admin/clients/Gestion" className="link-dark rounded">
                  <FaUserCog /> Opérateurs
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/clients/machines"
                  className="link-dark rounded"
                >
                  <GrVirtualMachine /> Machine
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/clients/procedes"
                  className="link-dark rounded"
                >
                  <FaBarsProgress /> Profession
                </Link>
              </li>
              <li>
                <Link to="/admin/clients/piecesb" className="link-dark rounded">
                  Stock
                </Link>
              </li>
              <li>
                <Link to="/admin/clients/pieces" className="link-dark rounded">
                  Pièce
                </Link>
              </li>
              <li>
                <Link to="/admin/clients/gamme" className="link-dark rounded">
                  Gamme d'usinage
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
