import React, { useState } from 'react';
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import pink_paw from "../../assets/images/pink-pawprint.svg";
import cat from "../../assets/images/pet-cat-login.svg";

const SignUp = () => {

  return (
    <>  
        <NavBar />
         <div className="container-fluid light-yellow-box rounded">
        <div className="row justify-content-center">
          <div
            className="col-2 d-none d-md-flex justify-content-center align-items-center login-rotate-image-neg-20"
          >
            <img
              src={pink_paw}
              alt="Pink pawprint"
              className="pawprint-image"
            />
          </div>
          <div
            className="col-12 col-md-8 d-flex justify-content-center align-items-center my-3"> 
            <div className="login-container h-100">
              <div
                className="login-title justify-content-center align-items-center"
              >
                <h2>Login</h2>
                <img
                  src={cat}
                  alt="login-cat-image"
                  className="login-cat-image flex-image"
                />
              </div>
              <div
                class="login-subtitle justify-content-center align-items-center"
              >
                Our furry friends have missed you!
              </div>
          <LoginForm />
            </div>
            </div>
          </div>
          <div
            className="col-2 d-none d-md-flex justify-content-center align-items-center login-rotate-image-20"
          >
            <img
              src={pink_paw}
              alt="Pink pawprint"
              className="pawprint-image"
            />
          </div>
        </div>
        <Footer />
    </>
  );
};

export default SignUp;