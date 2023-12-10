import React from "react";
import "./style.css";
import logo from "../../assets/images/petpal-logo.svg"
import { useEffect } from 'react';

export default function NavBar() {

    useEffect(() => {
        // Run script on component mount
        const script = document.createElement('script');
      
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
        script.async = true;
        script.integrity = "sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+";
        script.crossOrigin = "anonymous";
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    return (
        <header>
        <nav class="navbar navbar-expand-lg bg-body-light shadow-sm">
            <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img id="header-logo" src={logo} alt="PetPal Logo"/>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#navbarOffcanvasLg"
                aria-controls="navbarOffcanvasLg"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="navbarOffcanvasLg"
                aria-labelledby="navbarOffcanvasLgLabel"
            >
                <div class="offcanvas-header">
                <img
                    class="offcanvas-title"
                    id="header-logo"
                    src={logo}
                    alt="PetPal Logo"
                />
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                </div>
                <ul
                class="navbar-nav ps-3 ps-lg-0 justify-content-lg-end align-items-lg-center"
                >
                <li class="nav-item px-lg-3">
                    <a
                    class="nav-link nav-signup"
                    aria-current="page"
                    href="sign-up-general.html"
                    >Sign Up</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-login" href="./login/">Login</a>
                </li>
                <li class="nav-item"></li>
                </ul>
            </div>
            </div>
        </nav>
        </header>
    )
}