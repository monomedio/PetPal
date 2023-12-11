import React from "react";
import logo from "../../assets/images/petpal-logo.svg";
import "./style.css";

export default function Footer() {
    return (
        <nav class="navbar footer-nav">
            <div class="container-fluid justify-content-center">
            <div
                class="row justify-content-center justify-content-lg-between container-fluid mx-0 px-0"
            >
                <div
                class="container-fluid col-lg-6 px-0 pt-2 pt-lg-0 d-flex align-items-center justify-content-center justify-content-lg-start"
                >
                <a href="./index.html" class="navbar-brand"
                    ><img id="footer-logo" src={logo} alt="logo"/></a>
                </div>
                <div
                class="col-lg-6 d-flex justify-content-center justify-content-lg-end px-0"
                >
                <nav class="d-flex align-items-center flex-lg-row flex-column">
                    <a
                    class="nav-link footer-nav-item px-lg-5 py-2 py-lg-0"
                    href="./search-page.html"
                    >Adopt A Pet</a>
                    <a
                    class="nav-link footer-nav-item pb-2 pb-lg-0"
                    href="./applications.html"
                    >View Applications</a>
                </nav>
                </div>
            </div>
            <div class="row mt-lg-2">
                <div class="col">
                <p id="copyright">
                    Copyright &copy; 2023 by Anisha, Anne, Celina, Sam
                </p>
                </div>
            </div>
            </div>
        </nav>
    )

}