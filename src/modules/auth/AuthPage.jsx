// ✅ Nouveau fichier : AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    prenom: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:9000/login" : "http://localhost:9000/register";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de connexion");

      if (data.id && data.roles?.length) {
        const role = data.roles[0];
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("token", "true");
        navigate(role === "ADMIN" ? "/admin" : "/client");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          {isLogin ? "Se connecter" : "Créer un compte"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input type="text" name="username" onChange={handleChange} required placeholder="Nom d'utilisateur" className="w-full p-3 rounded-lg border border-gray-300" />
              <input type="text" name="prenom" onChange={handleChange} required placeholder="Prénom" className="w-full p-3 rounded-lg border border-gray-300" />
            </>
          )}
          <input type="email" name="email" onChange={handleChange} required placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300" />
          <input type="password" name="password" onChange={handleChange} required placeholder="Mot de passe" className="w-full p-3 rounded-lg border border-gray-300" />
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {isLogin ? "Connexion" : "S'inscrire"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Pas encore inscrit ?" : "Déjà inscrit ?"} {" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-700 hover:underline font-semibold">
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
