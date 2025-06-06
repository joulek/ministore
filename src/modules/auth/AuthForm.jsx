import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prenom: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:9000/login"
      : "http://localhost:9000/register";

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
      if (!res.ok) throw new Error(data.error || "Erreur d'authentification");

      if (data.id && data.roles?.length) {
        const role = data.roles[0];
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("token", "true");
        navigate(role === "ADMIN" ? "/admin/dashboard" : "/ministore");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="relative w-full max-w-5xl min-h-[450px] bg-blue-100 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-all duration-1000 ease-in-out">
        {/* Connexion */}
        <div
          className={`p-6 flex flex-col justify-center transition-all duration-1000 ease-in-out transform ${
            isLogin
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full md:flex hidden"
          }`}
        >
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
            Connexion
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-transform duration-300"
            >
              Connexion
            </button>
          </form>
        </div>

        {/* Inscription */}
        <div
          className={`p-6 flex flex-col justify-center transition-all duration-1000 ease-in-out transform ${
            !isLogin
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full md:flex hidden"
          }`}
        >
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
            Créer un compte
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-transform duration-300"
            >
              S'inscrire
            </button>
          </form>
        </div>

        {/* Zone de switch */}
        <div
          className={`absolute top-0 bottom-0 w-full md:w-1/2 flex flex-col items-center justify-center bg-blue-600 text-white p-6 text-center z-10 transition-all duration-1000 ease-in-out ${
            isLogin ? "md:left-1/2" : "md:left-0"
          }`}
        >
          <h2 className="text-2xl font-bold mb-3">
            {isLogin ? "Nouveau ici ?" : "Déjà inscrit ?"}
          </h2>
          <p className="mb-6">
            {isLogin
              ? "Créez un compte pour profiter de nos services."
              : "Connectez-vous à votre compte pour continuer."}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-100 active:scale-95 transition-all duration-300"
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;