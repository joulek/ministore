import React from "react";
import AuthForm from "./AuthForm";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
   

        <AuthForm isLogin={true} />
   
    </div>
  );
};

export default LoginPage;
